import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const emptyToUndefined = (value: unknown) => value === '' || value === null ? undefined : value;

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
    category: z.preprocess(emptyToUndefined, z.string().trim().min(1).default('随笔')),
    tags: z.array(z.string().trim().min(1)).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.preprocess(emptyToUndefined, z.string().regex(/^\/images\/.+/).optional()),
    heroImage: image().optional(),
  }),
});

export const collections = { blog };
