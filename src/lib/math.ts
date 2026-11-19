export function formulaSource(value: string) {
  const source = value.trim();
  const pairs = [['$$', '$$'], ['\\[', '\\]'], ['\\(', '\\)'], ['$', '$']];
  for (const [open, close] of pairs) {
    if (source.length >= open.length + close.length && source.startsWith(open) && source.endsWith(close)) {
      return source.slice(open.length, -close.length).trim();
    }
  }
  return source;
}

export function markdownFormula(source: string) {
  const value = formulaSource(source);
  return value ? '$$\n' + value + '\n$$' : '';
}
