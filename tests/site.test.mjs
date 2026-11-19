import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function read(path) {
  try {
    return readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

test('homepage and existing article expose the expanded site navigation', () => {
  for (const file of ['index.html', 'blog/blog-management-guide/index.html']) {
    const html = read(file);
    for (const route of ['projects', 'archives', 'latex-lab']) {
      assert.match(html, new RegExp(`href="/${route}/"`), `${file} links to ${route}`);
      assert.ok(read(`${route}/index.html`), `${route} is generated`);
    }
  }
});

test('Markdown and MDX both produce accessible inline and display math', () => {
  for (const slug of ['navier-stokes-notes', 'hopf-normal-form']) {
    const html = read(`blog/${slug}/index.html`);
    assert.match(html, /class="katex"/, `${slug} renders inline math`);
    assert.match(html, /class="katex-display"/, `${slug} renders display math`);
    assert.match(html, /<math[^>]*>/, `${slug} includes MathML`);
    assert.doesNotMatch(html, /katex-error/);
  }
});

test('published notes appear in the archive and RSS with their canonical URLs', () => {
  for (const slug of ['blog-management-guide', 'navier-stokes-notes', 'hopf-normal-form']) {
    assert.ok(read('archives/index.html').includes(`/blog/${slug}/`));
    assert.ok(read('rss.xml').includes(`https://my-blog.2598857560.workers.dev/blog/${slug}/`));
  }
});

test('editor provides distinct preview and authenticated publishing entry points', () => {
  const html = read('writing/index.html');
  assert.match(html, /https:\/\/app\.pagescms\.org/);
  assert.match(html, /<textarea[^>]*id="markdown-source"/);
});
