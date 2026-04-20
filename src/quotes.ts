export interface Quote {
  quote: string;
  author: string | null;
}

const ALL_QUOTES: Quote[] = require('../quotes.json');

export function pickQuote(seenIndices: number[]): {
  quote: Quote;
  newSeenIndices: number[];
} {
  const total = ALL_QUOTES.length;
  const effectiveSeen = seenIndices.length >= total ? [] : seenIndices;
  const available = Array.from({ length: total }, (_, i) => i)
    .filter(i => !effectiveSeen.includes(i));
  const chosenIndex = available[Math.floor(Math.random() * available.length)];
  return {
    quote: ALL_QUOTES[chosenIndex],
    newSeenIndices: [...effectiveSeen, chosenIndex],
  };
}

export function formatQuote(q: Quote): string {
  const base = `😈 "${q.quote}"`;
  return q.author ? `${base} — ${q.author}` : base;
}
