import assert from 'node:assert/strict';
import test from 'node:test';

test('LaTeX Lab unwraps pasted delimiters and exports a Markdown math fence', async () => {
  let utilities;
  try { utilities = await import('../src/lib/math.ts'); }
  catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }
  assert.ok(utilities, 'LaTeX Lab utilities are available');
  assert.equal(utilities.formulaSource('  \\[x^2\\]  '), 'x^2');
  assert.equal(utilities.formulaSource('$$\na+b\n$$'), 'a+b');
  assert.equal(utilities.formulaSource('$x^2$'), 'x^2');
  assert.equal(utilities.formulaSource('\\(x^2\\)'), 'x^2');
  assert.equal(utilities.formulaSource('\\begin{aligned}x&=1\\end{aligned}'), '\\begin{aligned}x&=1\\end{aligned}');
  assert.equal(utilities.markdownFormula('x^2'), '$$\nx^2\n$$');
  assert.equal(utilities.markdownFormula('  '), '');
});

test('Markdown preview renders GFM and math while stripping executable HTML and URLs', async () => {
  let utilities;
  try { utilities = await import('../src/lib/markdown-preview.ts'); }
  catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }
  assert.ok(utilities, 'Markdown preview utilities are available');
  const source = ['| A |', '| --- |', '| 1 |', '', 'Inline $x^2$.', '', '$$', '\\sum_{i=1}^n i', '$$', '',
    '<img src="x" onerror="alert(1)">', '', '[bad](javascript:alert%281%29)', '', '<script>alert(2)</script>'].join('\n');
  const html = utilities.previewMarkdown(source);
  assert.match(html, /<table>/);
  assert.match(html, /class="katex"/);
  assert.match(html, /class="katex-display"/);
  assert.doesNotMatch(html, /onerror|javascript:|<script/i);
});
