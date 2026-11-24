<script lang="ts">
  // Lists of links to question cards on the /pyq page.
  // mode "revisit": "Come back to these", every question marked Revisit (live).
  // mode "highYield": the most-asked questions, with each one's status.
  import { onMount } from 'svelte';
  import Icon from '../Icon.svelte';
  import { clearFilters, DEFAULT_VIEW, loadPyqStatus, loadPyqView, pyqStatus, pyqView } from '../../lib/pyq-status';

  interface Link {
    id: string;
    number: number;
    unitId: number | string;
    predicted: boolean;
    excerpt: string;
    times: number;
    sources: string[];
  }
  let { items, mode }: { items: Link[]; mode: 'revisit' | 'highYield' } = $props();

  let mounted = $state(false);
  onMount(() => {
    loadPyqStatus();
    loadPyqView();
    mounted = true;
  });
  const statuses = $derived(mounted ? $pyqStatus : {});
  const view = $derived(mounted ? $pyqView : DEFAULT_VIEW);

  const list = $derived(mode === 'revisit' ? items.filter((x) => statuses[x.id] === 'revisit' && (!x.predicted || view.showPredicted)) : items);
  const doneCount = $derived(items.filter((x) => statuses[x.id] === 'completed').length);

  /** A link to a card that a filter hides first clears the filter, so the jump lands. */
  function open(e: MouseEvent, id: string) {
    const card = document.getElementById(`q-${id}`);
    if (card?.hidden) {
      e.preventDefault();
      clearFilters();
      if ('predicted' in card.dataset) pyqView.update((v) => ({ ...v, showPredicted: true }));
      requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
    }
  }
</script>

<section class="bg-card mt-6 rounded-xl border p-4 sm:p-5" aria-labelledby="pyq-list-{mode}">
  <h2 id="pyq-list-{mode}" class="flex items-center gap-2 text-lg font-semibold tracking-tight">
    {#if mode === 'revisit'}
      <span class="bg-warning text-warning-foreground grid size-7 place-items-center rounded-full"><Icon name="refresh" class="size-4" /></span>
      Come back to these
      <span class="text-muted-foreground ml-auto font-mono text-sm font-normal tabular-nums">{list.length}</span>
    {:else}
      <span class="bg-warning text-warning-foreground grid size-7 place-items-center rounded-full"><Icon name="flame" class="size-4" /></span>
      Highest-yield questions
      <span class="text-muted-foreground ml-auto font-mono text-sm font-normal tabular-nums">{doneCount}/{items.length} done</span>
    {/if}
  </h2>

  {#if mode === 'highYield'}
    <p class="text-muted-foreground mt-1 text-sm">Asked in more than one paper, most-asked first. Start here.</p>
  {/if}

  {#if list.length === 0}
    <p class="text-muted-foreground mt-2 text-sm">
      {mode === 'revisit' ? 'Nothing flagged yet. Click a question’s status button twice to mark it Revisit and it will show up here.' : 'No question was asked more than once.'}
    </p>
  {:else}
    <ol class="mt-3 grid gap-1.5 text-sm {list.length > 8 ? 'max-h-80 overflow-y-auto pr-1' : ''}">
      {#each list as x (x.id)}
        {@const s = statuses[x.id] ?? 'incomplete'}
        <li class="flex items-start gap-2">
          <Icon
            name={s === 'completed' ? 'circleCheck' : s === 'revisit' ? 'refresh' : 'circleDashed'}
            class="mt-0.5 size-4 {s === 'completed' ? 'text-chart-3' : s === 'revisit' ? 'text-chart-4' : 'text-muted-foreground'}"
          />
          <a
            href="#q-{x.id}"
            class="hover:decoration-primary-accent min-w-0 flex-1 underline decoration-[var(--border)] underline-offset-3 {s === 'completed' ? 'text-muted-foreground line-through' : ''}"
            onclick={(e) => open(e, x.id)}
          >
            <span class="text-muted-foreground font-mono text-xs tabular-nums">{typeof x.unitId === 'number' ? `U${x.unitId}` : 'Other'}·{x.predicted ? 'P' : 'Q'}{x.number}</span>
            {x.excerpt}
          </a>
          {#if mode === 'highYield'}
            <span class="bg-warning text-warning-foreground shrink-0 rounded-full px-1.5 font-mono text-xs font-semibold tabular-nums" title={x.sources.join(', ')}>×{x.times}</span>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}
</section>
