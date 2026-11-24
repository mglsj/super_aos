// Moving between question cards on the /pyq page (keyboard shortcuts, "Next incomplete").
// Cards are `.pyq-card` elements carrying data-qid and data-status; filtered-out cards are [hidden].

/** Bottom of the sticky header and control bar: a card above this line counts as scrolled past. */
const top = () => document.querySelector('.pyq-bar')?.getBoundingClientRect().bottom ?? 130;

const all = () => [...document.querySelectorAll<HTMLElement>('.pyq-card')];
export const visibleCards = () => all().filter((c) => !c.hidden);

export function activeCard(): HTMLElement | null {
  const el = document.querySelector<HTMLElement>('.pyq-card[data-active]');
  return el && !el.hidden ? el : null;
}

export function setActive(el: HTMLElement) {
  for (const c of document.querySelectorAll('.pyq-card[data-active]')) c.removeAttribute('data-active');
  el.setAttribute('data-active', '');
}

/** The active card, or else the first card on screen. */
export function currentCard(): HTMLElement | null {
  return activeCard() ?? visibleCards().find((c) => c.getBoundingClientRect().bottom > top() + 10) ?? null;
}

export function goTo(el: HTMLElement) {
  setActive(el);
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = el.getBoundingClientRect().top + window.scrollY - top() - 12;
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
}

/** Next (+1) or previous (-1) visible card. Without an active card, starts from what is on screen. */
export function move(step: 1 | -1) {
  const list = visibleCards();
  if (!list.length) return;
  const act = activeCard();
  let i: number;
  if (act) i = list.indexOf(act) + step;
  else {
    const firstBelow = list.findIndex((c) => c.getBoundingClientRect().top >= top() - 10);
    const at = firstBelow < 0 ? list.length : firstBelow;
    i = step > 0 ? at : at - 1;
  }
  goTo(list[Math.max(0, Math.min(list.length - 1, i))]);
}

/** Next card whose status is 'incomplete', after the current one, wrapping round. Returns it, or null. */
export function nextIncomplete(): HTMLElement | null {
  const cards = all();
  const cur = currentCard();
  const start = cur ? cards.indexOf(cur) + (cur.dataset.status === 'incomplete' && !activeCard() ? 0 : 1) : 0;
  for (let k = 0; k < cards.length; k++) {
    const c = cards[(start + k) % cards.length];
    if (c.dataset.status === 'incomplete' && !(c.hidden && 'predicted' in c.dataset)) return c;
  }
  return null;
}
