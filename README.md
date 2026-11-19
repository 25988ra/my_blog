# Richard Research Blog

个人博客，记录科研笔记、计算流体力学（CFD）与数值模拟相关的内容。

## 技术栈

- [Astro](https://docs.astro.build) 7（纯静态输出）
- Markdown / MDX 内容集合
- `@astrojs/rss` 生成 RSS，`@astrojs/sitemap` 生成站点地图
- 本地字体（Atkinson），无第三方 CDN 依赖

## 本地开发

```sh
npm install
npm run dev      # 开发服务器 http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

需要在后台常驻运行开发服务器时（例如由 AI 助手操作），使用：

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## 写文章

在 `src/content/blog/` 下新建 `.md` 或 `.mdx` 文件，文件名即 URL 路径，例如
`src/content/blog/hello-cfd.md` 对应 `/blog/hello-cfd/`。

必需的 frontmatter：

```yaml
---
title: '文章标题'
description: '一句话摘要，用于列表、RSS 和 SEO'
pubDate: 'Nov 19 2026'
---
```

可选字段：

- `updatedDate`：最后更新日期
- `heroImage`：头图，使用相对路径，如 `'../../assets/example.jpg'`

## 目录结构

```text
src/
├── assets/            图片与字体
├── components/        Header、Footer、BaseHead、日期等组件
├── content/blog/      博客文章（Markdown / MDX）
├── layouts/           BlogPost 布局
└── pages/             路由：首页、/blog、/about、/rss.xml
```

站点标题和描述在 `src/consts.ts` 中修改。

## 部署

通过 Cloudflare Workers 部署，公开地址为 <https://my-blog.2598857560.workers.dev/>。
Workers Builds 连接 GitHub `25988ra/my_blog` 的 `main` 分支后，推送即可触发构建和部署。

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node 版本：见 `.nvmrc`（24）

Workers 的静态资源设置在 `wrangler.jsonc` 中。无效链接会显示 `src/pages/404.astro` 生成的提示页，HTTP 状态仍为 404。

## 分享预览

默认分享图位于 `src/assets/social-cover.png`。设置了 `heroImage` 的文章会使用各自的头图。
