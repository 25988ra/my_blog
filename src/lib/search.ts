export function searchable(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/[‐‑‒–—−]/g, '-');
}
