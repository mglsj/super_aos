<script lang="ts">
  // Sticky bar on the /pyq page: open/close every answer, filters, and keyboard shortcuts
  // (J/K next/previous question, Space show/hide answer, C cycle status).
  import { onMount } from 'svelte';
  import Icon from '../Icon.svelte';
  import { answerCommand, clearFilters, DEFAULT_VIEW, isFilteredOut, loadPyqStatus, loadPyqView, pyqStatus, pyqView, setAllAnswers, type Counted } from '../../lib/pyq-status';
  import { currentCard, move, setActive } from '../../lib/pyq-nav';

  let { items }: { items: Counted[] } = $props();

  let mounted = $state(false);
  const statuses = $derived(mounted ? $pyqStatus : {});
  const view = $derived(mounted ? $pyqView : DEFAULT_VIEW);
  const shownItems = $derived(items.filter((x) => !x.predicted || view.showPredicted));
  const revisitCount = $derived(shownItems.filter((x) => statuses[x.id] === 'revisit').length);
  const visibleCount = $derived(shownItems.filter((x) => !isFilteredOut(view, statuses[x.id] ?? 'incomplete', x.predicted)).length);
  const predictedCount = items.filter((x) => x.predicted).length;
  const filtering = $derived(view.revisitOnly || view.hideCompleted);

  function typing(t: EventTarget | null) {
    const el = t as HTMLElement | null;
    return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  }

  function act(which: 'toggle' | 'status') {
    const card = currentCard();
    if (!card) return;
    setActive(card);
    card.querySelector<HTMLElement>(`[data-act="${which}"]`)?.click();
  }

  onMount(() => {
    loadPyqStatus();
    loadPyqView();
    mounted = true;

    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || typing(e.target)) return;
      const onControl = (e.target as HTMLElement | null)?.closest?.('button, a, summary');
      const k = e.key.toLowerCase();
      if (k === 'j') move(1);
      else if (k === 'k') move(-1);
      else if (k === 'c') act('status');
      else if (e.key === ' ' && !onControl) act('toggle');
      else return;
      e.preventDefault();
    }
    function onPointer(e: PointerEvent) {
      const card = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.pyq-card');
      if (card) setActive(card);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  });

  /** Last bulk action, highlighted until another is chosen. */
  const lastAll = $derived($answerCommand.n === 0 ? null : $answerCommand.open ? 'open' : 'close');

  // Labels show only when the bar is wide enough for them. On narrow phones the buttons
  // become four equal icon-only boxes (container query on .pyq-bar).
  const BTN =
    'inline-flex h-8 min-w-0 items-center justify-center gap-1 rounded-full border px-2 text-xs font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-outline/50 @min-[30rem]:h-7 @min-[30rem]:shrink-0 sm:h-8 sm:gap-1.5 sm:px-3 sm:text-sm';
  const LABEL = 'hidden @min-[30rem]:inline';
  const off = 'border-input bg-background hover:bg-muted dark:bg-input/30';
  const picked = 'border-primary-accent bg-primary-accent/10 text-primary-accent';
</script>

<div class="pyq-bar @container bg-card/95 sticky top-[57px] z-30 -mx-4 mt-10 border-y px-3 py-1.5 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-4 sm:py-2">
  <div class="grid grid-cols-5 items-center gap-1.5 @min-[30rem]:flex @min-[30rem]:gap-1 sm:gap-2">
    <button type="button" class="{BTN} {lastAll === 'open' ? picked : off}" aria-label="Open all answers" title="Open all answers" onclick={() => setAllAnswers(true)}>
      <Icon name="eye" class="size-4" /><span class={LABEL}>Open all<span class="hidden sm:inline">{' '}answers</span></span>
    </button>
    <button type="button" class="{BTN} {lastAll === 'close' ? picked : off}" aria-label="Close all answers" title="Close all answers" onclick={() => setAllAnswers(false)}>
      <Icon name="eyeOff" class="size-4" /><span class={LABEL}>Close all</span>
    </button>
    <span class="bg-border mx-1 hidden h-5 w-px shrink-0 sm:block"></span>
    <button
      type="button"
      class="{BTN} {view.revisitOnly ? 'border-warning bg-warning text-warning-foreground' : off}"
      aria-pressed={view.revisitOnly}
      aria-label="Show only questions marked Revisit ({revisitCount})"
      title="Revisit only"
      onclick={() => pyqView.update((v) => ({ ...v, revisitOnly: !v.revisitOnly }))}
    >
      <Icon name="refresh" class="size-4" /><span class={LABEL}>Revisit<span class="hidden sm:inline">{' '}only</span></span>
      <span class="rounded-full px-1 font-mono text-[10px] tabular-nums sm:px-1.5 sm:text-xs {view.revisitOnly ? 'bg-warning-foreground/15' : 'bg-muted'}">{revisitCount}</span>
    </button>
    <button
      type="button"
      class="{BTN} {view.hideCompleted ? 'border-success bg-success text-success-foreground' : off}"
      aria-pressed={view.hideCompleted}
      aria-label="Hide completed questions"
      title="Hide completed"
      onclick={() => pyqView.update((v) => ({ ...v, hideCompleted: !v.hideCompleted }))}
    >
      <Icon name="circleCheck" class="size-4" /><span class={LABEL}>Hide{' '}<span class="sm:hidden">done</span><span class="hidden sm:inline">completed</span></span>
    </button>
    <button
      type="button"
      class="{BTN} {view.showPredicted ? 'border-success bg-success text-success-foreground' : off}"
      aria-pressed={view.showPredicted}
      aria-label="{view.showPredicted ? 'Hide' : 'Show'} the {predictedCount} predicted questions"
      title="{view.showPredicted ? 'Hide' : 'Show'} predicted questions"
      onclick={() => pyqView.update((v) => ({ ...v, showPredicted: !v.showPredicted }))}
    >
      <Icon name="bulb" class="size-4" /><span class={LABEL}>Predicted</span>
    </button>
  </div>
  {#if filtering}
    <p class="text-muted-foreground mt-1 text-xs" role="status">
      Showing {visibleCount} of {shownItems.length} questions.
      {#if visibleCount === 0}
        {view.revisitOnly ? 'Nothing is marked Revisit yet.' : 'Everything here is completed.'}
      {/if}
      <button type="button" class="text-primary-accent underline underline-offset-2" onclick={clearFilters}>Show all</button>
    </p>
  {/if}
</div>
