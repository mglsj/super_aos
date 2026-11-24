<script lang="ts">
  // Concentric progress rings on the /pyq page: one ring per unit (Unit 1 outermost),
  // blue while partly done and green once the unit is complete, with a legend and the total.
  import { onMount } from 'svelte';
  import { countedIds, DEFAULT_VIEW, loadPyqStatus, loadPyqView, pyqStatus, pyqView, type Counted } from '../../lib/pyq-status';

  let { units }: { units: { id: number | string; title: string; items: Counted[] }[] } = $props();

  let mounted = $state(false);
  onMount(() => {
    loadPyqStatus();
    loadPyqView();
    mounted = true;
  });
  const statuses = $derived(mounted ? $pyqStatus : {});
  const view = $derived(mounted ? $pyqView : DEFAULT_VIEW);
  const label = (id: number | string) => (typeof id === 'number' ? `Unit ${id}` : 'Other');

  const SIZE = 200;
  const STROKE = 9;
  const GAP = 3;
  const C = SIZE / 2;

  const pct = (d: number, t: number) => (t ? Math.round((d / t) * 100) : 0);
  const rows = $derived(
    units
      .map((u) => ({ ...u, ids: countedIds(u.items, view) }))
      .filter((u) => u.ids.length > 0) // e.g. "Other" while predicted questions are hidden
      .map((u, i) => {
        const done = u.ids.filter((id) => statuses[id] === 'completed').length;
        const r = C - STROKE / 2 - i * (STROKE + GAP);
        return { ...u, done, total: u.ids.length, pct: pct(done, u.ids.length), r, len: 2 * Math.PI * r };
      }),
  );
  const done = $derived(rows.reduce((n, r) => n + r.done, 0));
  const total = $derived(rows.reduce((n, r) => n + r.total, 0));
  const overall = $derived(pct(done, total));
  const tone = (p: number) => (p >= 100 ? 'var(--success)' : 'var(--primary-accent)');
</script>

<section class="bg-card mt-8 flex flex-col items-center gap-5 rounded-xl border p-4 sm:flex-row sm:items-center sm:gap-8 sm:p-5" aria-label="Progress by unit">
  <svg viewBox="0 0 {SIZE} {SIZE}" class="size-40 shrink-0 sm:size-44" role="img" aria-label="{done} of {total} questions completed, {overall} percent">
    {#each rows as r}
      <circle cx={C} cy={C} r={r.r} fill="none" stroke="var(--muted)" stroke-width={STROKE} />
      {#if r.done > 0}
        <circle
          cx={C}
          cy={C}
          r={r.r}
          fill="none"
          stroke={tone(r.pct)}
          stroke-width={STROKE}
          stroke-linecap="round"
          stroke-dasharray="{r.total ? (r.len * r.done) / r.total : 0} {r.len}"
          transform="rotate(-90 {C} {C})"
          class="transition-[stroke-dasharray] duration-500"
        />
      {/if}
    {/each}
    <text x={C} y={C - 2} text-anchor="middle" class="fill-foreground text-[22px] font-semibold tabular-nums">{overall}%</text>
    <text x={C} y={C + 15} text-anchor="middle" class="fill-muted-foreground font-mono text-[10px] tabular-nums">{done}/{total}</text>
  </svg>

  <div class="w-full min-w-0 flex-1">
    <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">Your progress · outer ring is Unit 1{view.showPredicted ? ' · predicted included' : ''}</p>
    <ul class="mt-2 flex flex-col gap-1.5 text-sm">
      {#each rows as r}
        <li class="flex items-center gap-2">
          <span class="size-2.5 shrink-0 rounded-full" style="background: {r.done ? tone(r.pct) : 'var(--muted)'}"></span>
          <a class="hover:text-primary-accent min-w-0 flex-1 truncate" href="#unit-{r.id}"><span class="text-muted-foreground">{label(r.id)}</span> {r.title}</a>
          <span class="font-mono text-xs tabular-nums">{r.done}/{r.total}</span>
          <span class="w-10 text-right font-mono text-xs tabular-nums">{r.pct}%</span>
        </li>
      {/each}
      <li class="mt-1 flex items-center gap-2 border-t pt-2 font-semibold">
        <span class="flex-1">All units</span>
        <span class="font-mono text-xs tabular-nums">{done}/{total}</span>
        <span class="w-10 text-right font-mono text-xs tabular-nums">{overall}%</span>
      </li>
    </ul>
  </div>
</section>
