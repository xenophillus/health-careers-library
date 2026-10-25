// Keep card excerpts readable without shortening the full article introduction.
export function summarizeIntroduction(text, limit = 190) {
  const full = text.trim();
  if (full.length <= limit) return full;
  const available = full.slice(0, limit - 1);
  const sentences = [...available.matchAll(/[.!?](?=\s|$)/g)];
  const end = sentences.at(-1)?.index;
  if (end !== undefined && end >= limit / 2) return available.slice(0, end + 1).replace(/\.$/, '') + '…';
  const boundary = available.lastIndexOf(' ');
  return available.slice(0, boundary > 0 ? boundary : available.length).replace(/[\s,;:]+$/, '') + '…';
}
