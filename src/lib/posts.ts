import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id));
}

export function postUrl(post: Post) {
  return '/blog/' + post.id.split('/').map(encodeURIComponent).join('/') + '/';
}

export function filterUrl(field: 'tag' | 'category', value: string) {
  return '/blog/?' + new URLSearchParams({ [field]: value }) + '#article-search';
}
