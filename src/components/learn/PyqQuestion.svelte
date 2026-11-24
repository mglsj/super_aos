<script lang="ts">
  // A past-quiz or predicted question for quick revision: no answer box, the answer stays hidden
  // until "Show answer", and a button tracks incomplete / completed / revisit.
  import { onMount } from 'svelte';
  import { Badge } from '../starwind-svelte/badge';
  import { Button } from '../starwind-svelte/button';
  import { Card, CardContent } from '../starwind-svelte/card';
  import Icon from '../Icon.svelte';
  import type { Question } from '../../lib/questions';
  import type { PyqItem } from '../../lib/pyq';
  import { answerCommand, cycleStatus, isFilteredOut, loadPyqStatus, loadPyqView, pyqStatus, pyqView, type PyqStatus } from '../../lib/pyq-status';

  type CardItem = Omit<PyqItem, 'excerpt' | 'unitId' | 'lessonId'>;
  let { item }: { item: CardItem } = $props();
  const q = $derived(item.q);
  const predicted = $derived(item.kind === 'predicted');

  // Render the default state until mounted so hydration matches the server HTML.
  let mounted = $state(false);
  onMount(() => {
    loadPyqStatus();
    loadPyqView();
    mounted = true;
  });

  let shown = $state(false);
  $effect(() => {
    const c = $answerCommand;
    if (c.n > 0) shown = c.open;
  });

  const status = $derived<PyqStatus>((mounted && $pyqStatus[item.id]) || 'incomplete');
  // Predicted questions are hidden until the Predicted button is on, also before mount.
  const hidden = $derived(mounted ? isFilteredOut($pyqView, status, predicted) : predicted);
  const done = $derived(status === 'completed');

  const letter = (i: number) => String.fromCharCode(65 + i);
  const isRight = (i: number) => (q.type === 'mcq' ? q.answer === i : q.type === 'multi' ? q.answers.includes(i) : false);
  const FORMAT = { tf: 'True or false', numeric: 'Numerical', mcq: 'Multiple choice', written: 'Written' } as const;

  const STATUS = {
    incomplete: { text: 'Mark as completed', icon: 'circleDashed', cls: 'border-input text-muted-foreground hover:bg-muted', title: 'Not done yet. Click to mark as completed.' },
    completed: { text: 'Completed', icon: 'circleCheck', cls: 'border-success bg-success text-success-foreground hover:bg-success/90', title: 'Completed. Click to mark for revisiting.' },
    revisit: { text: 'Revisit', icon: 'refresh', cls: 'border-warning bg-warning text-warning-foreground hover:bg-warning/90', title: 'Marked to revisit. Click to reset to incomplete.' },
  } as const;
  const st = $derived(STATUS[status]);

  // Rich answers from the export carry tables, lists and code.
  const RICH =
    'text-sm leading-relaxed [&_b]:font-semibold [&_strong]:font-semibold [&_p+p]:mt-2 [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:mt-1 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_table]:mt-2 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:text-xs [&_th]:border-b [&_th]:py-1 [&_th]:pr-3 [&_th]:text-left [&_th]:align-bottom [&_td]:border-b [&_td]:py-1 [&_td]:pr-3 [&_td]:align-top [&_pre]:bg-background [&_pre]:mt-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:p-2 [&_pre]:text-xs [&_code]:font-mono';
  const sourceLabel = (s: string) => (/professor/i.test(s) ? "Professor's key" : /student/i.test(s) ? 'From student answers' : 'Written by Claude (no key)');
</script>

{#snippet answer(a: Question)}
  {#if a.type === 'tf'}
    <p class="mt-1 text-base font-semibold">{a.answer ? 'True' : 'False'}</p>
  {:else if a.type === 'numeric'}
    <p class="mt-1 font-mono text-base font-semibold">{a.answer}{a.unit ? ` ${a.unit}` : ''}</p>
  {:else if a.type === 'mcq'}
    <p class="mt-1 text-base font-semibold">{letter(a.answer)}. {@html a.options[a.answer]}</p>
  {:else if a.type === 'multi'}
    <p class="mt-1 text-base font-semibold">{a.answers.map(letter).join(', ')}</p>
  {:else}
    <div class="mt-1 {RICH}">{@html a.modelAnswer}</div>
    {#if a.points.length}
      <p class="text-muted-foreground mt-4 text-xs font-medium tracking-wider uppercase">Marking points</p>
      <ul class="mt-2 grid list-disc gap-1 pl-5 text-sm">
        {#each a.points as pt}<li>{@html pt}</li>{/each}
      </ul>
    {/if}
  {/if}
  {#if a.explanation}<div class="text-muted-foreground mt-3 {RICH}">{@html a.explanation}</div>{/if}
{/snippet}

<div id="q-{item.id}" class="pyq-card scroll-mt-44 sm:scroll-mt-32" data-qid={item.id} data-status={status} data-predicted={predicted ? '' : undefined} {hidden}>
  <Card size="sm" class="q not-sw-prose my-6 text-base transition-colors {done ? 'border-success/60' : status === 'revisit' ? 'border-warning' : predicted ? 'border-dashed' : ''}">
    <CardContent>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-muted-foreground font-mono text-xs tabular-nums">{predicted ? 'P' : 'Q'}{item.number}</span>
        {#if predicted}
          <span class="bg-success text-success-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"><Icon name="bulb" class="size-3.5" />Predicted</span>
        {:else}
          <Badge tone="primary" appearance="soft" size="sm" eyebrow>Past quiz</Badge>
        {/if}
        {#if item.times > 1}
          <span class="bg-warning text-warning-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold" title="Asked {item.times} times across past papers">
            <Icon name="flame" class="size-3.5" />High-yield ×{item.times}
          </span>
        {/if}
        {#each item.sources as s}<Badge variant="outline" size="sm">{s}</Badge>{/each}
        <Badge variant="outline" size="sm">{FORMAT[item.format]}{item.marks ? ` · ${item.marks} marks` : ''}</Badge>
        {#if !item.inSyllabus}
          <span class="border-error/50 text-error rounded-full border px-2 py-0.5 text-xs font-medium" title={item.outReason ?? 'Outside the end-sem syllabus'}>Out of syllabus</span>
        {/if}
        {#if item.weak && item.inSyllabus}
          <span class="text-muted-foreground rounded-full border border-dashed px-2 py-0.5 text-xs font-medium" title={item.weakReason ?? ''}>Low priority</span>
        {/if}
      </div>

      <div class="mt-3 text-base leading-relaxed font-medium {done ? 'text-muted-foreground line-through decoration-1' : ''} [&_ol]:mt-1 [&_ol]:list-[lower-alpha] [&_ol]:pl-6 [&_p+p]:mt-2 [&_table]:mt-2 [&_table]:block [&_table]:overflow-x-auto [&_table]:text-sm [&_td]:border [&_td]:px-2 [&_th]:border [&_th]:px-2 [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:pl-6">
        {@html q.prompt}
      </div>

      {#if q.type === 'mcq' || q.type === 'multi'}
        <ol class="mt-3 grid gap-2">
          {#each q.options as opt, i}
            {@const right = shown && isRight(i)}
            <li class="flex items-center gap-3 rounded-md border px-3 py-2 {right ? 'border-success bg-success/10' : 'border-input'}">
              <span class="grid size-5 shrink-0 place-items-center rounded-full border text-xs {right ? 'border-success bg-success text-success-foreground' : 'border-input text-muted-foreground'}">
                {#if right}<Icon name="check" class="size-3.5" />{:else}{letter(i)}{/if}
              </span>
              <span>{@html opt}</span>
            </li>
          {/each}
        </ol>
      {:else if item.options.length}
        <ol class="mt-3 grid gap-2">
          {#each item.options as opt, i}
            <li class="border-input flex items-center gap-3 rounded-md border px-3 py-2">
              <span class="border-input text-muted-foreground grid size-5 shrink-0 place-items-center rounded-full border text-xs">{letter(i)}</span>
              <span>{@html opt}</span>
            </li>
          {/each}
        </ol>
      {/if}

      {#each item.variants as v}
        <div class="bg-note-lilac/50 dark:bg-accent mt-3 rounded-lg border border-dashed p-3 text-sm">
          <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">Also asked as</p>
          <div class="mt-1 leading-relaxed {done ? 'text-muted-foreground line-through decoration-1' : ''}">{@html v.prompt}</div>
        </div>
      {/each}
      {#if item.reworded}
        <div class="bg-note-lilac/50 dark:bg-accent mt-3 rounded-lg border border-dashed p-3 text-sm">
          <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">Also asked as</p>
          <div class="mt-1 leading-relaxed">{@html item.reworded}</div>
        </div>
      {/if}

      {#if shown}
        <div class="bg-muted/50 mt-4 rounded-lg border p-4">
          <p class="text-muted-foreground flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase">
            Answer
            {#if item.answerSource}<span class="bg-background rounded-full border px-2 py-0.5 tracking-normal normal-case">{sourceLabel(item.answerSource)}</span>{/if}
          </p>
          {@render answer(q)}
          {#each item.variants as v}
            <p class="text-muted-foreground mt-5 border-t pt-4 text-xs font-medium tracking-wider uppercase">Answer to the reworded version</p>
            {@render answer(v)}
          {/each}
          {#if item.sittings.length || item.basedOn || item.outReason || item.weakReason}
            <div class="text-muted-foreground mt-4 grid gap-1 border-t pt-3 text-xs">
              {#if item.sittings.length}
                <p><span class="font-medium">Asked in:</span> {item.sittings.map((s) => `${s.paper}${s.ref ? ` ${s.ref}` : ''}${s.marks ? ` (${s.marks})` : ''}`).join('; ')}</p>
              {/if}
              {#if item.basedOn}<p><span class="font-medium">Based on:</span> {item.basedOn}</p>{/if}
              {#if item.outReason}<p><span class="font-medium">Out of syllabus:</span> {item.outReason}</p>{/if}
              {#if item.weakReason}<p><span class="font-medium">Low priority:</span> {item.weakReason}</p>{/if}
            </div>
          {/if}
        </div>
      {/if}

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <Button variant={shown ? 'outline' : 'primary'} size="sm" aria-expanded={shown} data-act="toggle" onclick={() => (shown = !shown)}>
          <Icon name={shown ? 'eyeOff' : 'eye'} class="size-4" />
          {shown ? 'Hide answer' : 'Show answer'}
        </Button>
        <button
          type="button"
          data-act="status"
          class="focus-visible:ring-outline/50 ml-auto inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-3 {st.cls}"
          title={st.title}
          aria-label="{st.text}. {st.title}"
          onclick={() => cycleStatus(item.id)}
        >
          <Icon name={st.icon} class="size-4" />
          {st.text}
        </button>
      </div>
    </CardContent>
  </Card>
</div>
