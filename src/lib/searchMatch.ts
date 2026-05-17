/** Query letters occur in order in text (e.g. "wach" → "Apple Watch"). */
function isOrderedSubsequence(query: string, text: string): boolean {
  let qi = 0;
  for (let i = 0; i < text.length && qi < query.length; i++) {
    if (text[i] === query[qi]) {
      qi++;
    }
  }
  return qi === query.length;
}

/**
 * Match product name: substring (case-insensitive), or ordered subsequence for queries ≥3 chars.
 */
export function nameMatchesQuery(name: string, q: string | undefined | null): boolean {
  const normalized = q?.trim().toLowerCase() ?? "";
  if (!normalized) {
    return true;
  }
  const lower = name.toLowerCase();
  if (lower.includes(normalized)) {
    return true;
  }
  if (normalized.length < 3) {
    return false;
  }
  return isOrderedSubsequence(normalized, lower);
}
