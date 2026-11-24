<script lang="ts">
  // Floating progress panel for the past-quiz page: completed / total and a percentage,
  // per unit and overall. Reads the same store the question cards write to.
  import { onMount } from 'svelte';
  import Icon from '../Icon.svelte';
  import { countedIds, DEFAULT_VIEW, loadPyqStatus, loadPyqView, pyqStatus, pyqView, type Counted } from '../../lib/pyq-status';
  import { goTo, nextIncomplete } from '../../lib/pyq-nav';

  let { units }: { units: { id: number | string; title: string; items: Counted[] }[] } = $props();

  const OPEN_KEY = 'super-aos-pyq-tracker-open';
  let open = $state(true);
  let mounted = $state(false);
  const statuses = $derived(mounted ? $pyqStatus : {});
  const view = $derived(mounted ? $pyqView : DEFAULT_VIEW);
  const label = (id: number | string) => (typeof id === 'number' ? `Unit ${id}` : 'Other');
  const short = (id: number | string) => (typeof id === 'number' ? `U${id}` : 'Other');

  /** Id of the unit section at the top of the screen, or null above the first unit. */
  let current = $state<string | null>(null);

  function findCurrent() {
    const line = (document.querySelector('.pyq-bar')?.getBoundingClientRect().bottom ?? 120) + 40;
    let cur: string | null = null;
    for (const s of document.querySelectorAll<HTMLElement>('section.pyq-group[id^="unit-"]')) {
      if (s.offsetParent !== null && s.getBoundingClientRect().top <= line) cur = s.id.slice(5);
    }
    current = cur;
  }

  const STOW_KEY = 'super-aos-pyq-tracker-stowed';
  /** Phones only: panel hidden away behind a small tab. */
  let stowed = $state(false);
  function setStowed(v: boolean) {
    stowed = v;
    try {
      localStorage.setItem(STOW_KEY, v ? '1' : '0');
    } catch {
      // ignore
    }
  }

  onMount(() => {
    loadPyqStatus();
    loadPyqView();
    mounted = true;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(findCurrent);
    };
    findCurrent();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    try {
      const saved = localStorage.getItem(OPEN_KEY);
      if (saved !== null) open = saved === '1';
      else if (window.matchMedia('(max-width: 640px)').matches) open = false;
      stowed = localStorage.getItem(STOW_KEY) === '1';
    } catch {
      // storage blocked: keep the default
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });

  function toggle() {
    open = !open;
    try {
      localStorage.setItem(OPEN_KEY, open ? '1' : '0');
    } catch {
      // ignore
    }
  }

  let allDone = $state(false);
  $effect(() => {
    void $pyqStatus;
    allDone = false;
  });
  async function next() {
    const card = nextIncomplete();
    allDone = !card;
    if (!card) return;
    // A "Revisit only" filter hides incomplete questions: drop it so the jump lands.
    if (card.hidden) {
      pyqView.update((v) => ({ ...v, revisitOnly: false }));
      await new Promise((r) => requestAnimationFrame(r));
    }
    goTo(card);
  }

  const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0);

  const rows = $derived(
    units.map((u) => {
      let done = 0;
      let revisit = 0;
      const ids = countedIds(u.items, view);
      for (const id of ids) {
        const s = statuses[id];
        if (s === 'completed') done++;
        else if (s === 'revisit') revisit++;
      }
      const total = ids.length;
      return { ...u, done, revisit, total, left: total - done, pct: pct(done, total) };
    }).filter((r) => r.total > 0), // e.g. "Other" while predicted questions are hidden
  );
  const total = $derived(rows.reduce((n, r) => n + r.total, 0));
  const done = $derived(rows.reduce((n, r) => n + r.done, 0));
  const revisit = $derived(rows.reduce((n, r) => n + r.revisit, 0));
  const overall = $derived(pct(done, total));
  const here = $derived(rows.find((r) => String(r.id) === current) ?? null);
</script>

<!-- Phones: tucked away, only a small tab is left to bring the panel back. -->
{#if stowed}
  <button
    type="button"
    class="bg-card/95 fixed right-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-medium shadow-lg backdrop-blur outline-none focus-visible:ring-3 focus-visible:ring-outline/50 sm:hidden"
    aria-label="Show progress panel"
    onclick={() => setStowed(false)}
  >
    <Icon name="chartPie" class="text-primary-accent size-4" />
    <span class="font-mono text-xs tabular-nums">{here ? `${short(here.id)} ${here.pct}%` : `${overall}%`}</span>
    <Icon name="chevronDown" class="size-4 rotate-180" />
  </button>
{/if}

<!-- Phones: docked full width to the bottom edge. Larger screens: a floating card. -->
<div
  class="fixed inset-x-0 bottom-0 z-50 text-sm sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[18rem] {stowed ? 'hidden sm:block' : ''}"
>
  <div class="bg-card/95 overflow-hidden rounded-t-xl border-t pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(0_0_0/0.08)] backdrop-blur sm:rounded-xl sm:border sm:pb-0 sm:shadow-lg">
    <div class="flex items-center">
      <button
        type="button"
        class="hover:bg-muted/60 flex min-w-0 flex-1 items-center gap-2 py-2.5 pr-2 pl-4 text-left outline-none focus-visible:ring-3 focus-visible:ring-outline/50 sm:py-3"
        aria-expanded={open}
        aria-controls="pyq-tracker-body"
        aria-label="{open ? 'Hide' : 'Show'} progress by unit"
        onclick={toggle}
      >
        <Icon name="chartPie" class="text-primary-accent size-4.5 shrink-0" />
        <span class="min-w-0 flex-1">
          {#if here}
            <span class="block truncate font-semibold"><span class="text-muted-foreground font-normal">{label(here.id)}</span> {here.title}</span>
            <span class="text-muted-foreground block font-mono text-xs tabular-nums">All {done}/{total} · {overall}%</span>
          {:else}
            <span class="font-semibold">Progress</span>
          {/if}
        </span>
        <span class="font-mono tabular-nums">{here ? here.done : done}/{here ? here.total : total}</span>
        <span class="bg-primary/10 text-primary-accent rounded-full px-2 py-0.5 font-mono text-xs font-semibold tabular-nums">{here ? here.pct : overall}%</span>
        <Icon name="chevronDown" class="size-4 shrink-0 transition-transform {open ? '' : 'rotate-180'}" />
      </button>
      <!-- Phones: next and hide sit in the same row to save height. -->
      <button
        type="button"
        class="bg-primary text-primary-foreground hover:bg-primary/90 grid size-8 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-primary/50 sm:hidden"
        aria-label="Next incomplete question"
        title="Next incomplete"
        onclick={next}
      >
        <Icon name="arrowRight" class="size-4" />
      </button>
      <button
        type="button"
        class="text-muted-foreground hover:bg-muted mx-1.5 grid size-8 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-outline/50 sm:hidden"
        aria-label="Hide progress panel"
        title="Hide"
        onclick={() => setStowed(true)}
      >
        <Icon name="x" class="size-4" />
      </button>
    </div>

    <div class="hidden border-t px-3 py-2 sm:block">
      <button
        type="button"
        class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full text-sm font-medium outline-none focus-visible:ring-3"
        onclick={next}
      >
        Next incomplete <Icon name="arrowRight" class="size-4" />
      </button>
    </div>
    {#if allDone}<p class="text-muted-foreground px-3 pb-2 text-center text-xs" role="status">Nothing left: every question is completed or marked Revisit.</p>{/if}

    {#if open}
      <div id="pyq-tracker-body" class="max-h-[50vh] overflow-y-auto border-t sm:max-h-[60vh] px-4 pt-2 pb-3">
        <ul class="flex flex-col gap-2.5">
          {#each rows as r}
            <li class="-mx-2 rounded-md px-2 py-1 {String(r.id) === current ? 'bg-primary/8 ring-primary-accent/40 ring-1' : ''}">
              <a class="hover:text-primary-accent flex items-baseline gap-2" href={`#unit-${r.id}`}>
                <span class="min-w-0 flex-1 truncate"><span class="text-muted-foreground">{short(r.id)}</span> {r.title}</span>
                <span class="font-mono text-xs tabular-nums">{r.done}/{r.total}</span>
                <span class="w-10 text-right font-mono text-xs font-semibold tabular-nums">{r.pct}%</span>
              </a>
              <div class="bg-muted mt-1 h-1.5 overflow-hidden rounded-full" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={r.pct} aria-label="{label(r.id)} progress">
                <div class="bg-success h-full rounded-full transition-[width]" style="width: {r.pct}%"></div>
              </div>
              <p class="text-muted-foreground mt-0.5 text-xs">
                {r.left} left{#if r.revisit}{' · '}{r.revisit} to revisit{/if}
              </p>
            </li>
          {/each}
        </ul>

        <div class="mt-3 border-t pt-3">
          <div class="flex items-baseline gap-2 font-semibold">
            <span class="flex-1">All units</span>
            <span class="font-mono text-xs tabular-nums">{done}/{total}</span>
            <span class="w-10 text-right font-mono text-xs tabular-nums">{overall}%</span>
          </div>
          <div class="bg-muted mt-1 h-2 overflow-hidden rounded-full" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={overall} aria-label="Overall progress">
            <div class="bg-success h-full rounded-full transition-[width]" style="width: {overall}%"></div>
          </div>
          <p class="text-muted-foreground mt-1 text-xs">
            {done} completed · {total - done} left{#if revisit}{' · '}{revisit} to revisit{/if}
          </p>
        </div>
      </div>
    {/if}
  </div>
</div>
