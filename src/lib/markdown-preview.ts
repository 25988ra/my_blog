import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      code: [['className', /^language-./, 'math-inline', 'math-display']],
    },
  })
  .use(rehypeKatex, { trust: false, maxSize: 20, maxExpand: 1000 })
  .use(rehypeStringify);

export function previewMarkdown(source: string) {
  return String(processor.processSync(source));
}
