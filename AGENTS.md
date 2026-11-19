## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project conventions

- Use Node.js 24 and npm. Keep this Astro 7 project static and retain the existing article URLs.
- The existing Cloudflare Workers service is `my-blog` and deploys GitHub `main`. Keep Wrangler's name and assets directory aligned with that service. Use a feature branch for changes and obtain confirmation before deploying to production.
- Markdown and MDX use the Unified processor with KaTeX. Keep both formats working when changing the Markdown pipeline.
- Keep drafts out of all public outputs using the shared published-post query. Pages CMS editing is configured in `.pages.yml`; repository authentication is managed by its GitHub App.
- Run `npm run check` and `npm test` before delivery.
