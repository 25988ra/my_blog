# Richard Research Blog

以枫丹舞台与水波为主题的科研博客，记录计算流体力学、非线性动力学和数值计算。[公开站点](https://my-blog.2598857560.workers.dev/)

## 本地预览和验证

项目使用 Node.js 24、npm 和 Astro 7，产物为静态文件。

```sh
nvm use
npm ci
npm run astro -- dev --background
npm run check
npm test
```

从终端显示的本地地址打开首页。使用 `npm run astro -- dev status`、`npm run astro -- dev logs` 和 `npm run astro -- dev stop` 管理开发服务器。 `npm test` 会执行 `npm run build` 并检查编译产物和预览工具。

## 写科研文章

在 `src/content/blog/` 创建 `.md` 或 `.mdx`。文件名 `my-note.md` 对应 `/blog/my-note/`。已发布文章改标题时，保留文件名可继续使用原链接。

```yaml
---
title: '算例笔记'
description: '简要说明研究问题和结果'
pubDate: '2026-11-19'
updatedDate: '2026-11-20'
category: '流体力学'
tags: ['CFD', '数值计算']
featured: false
draft: true
cover: '/images/example.webp'
---
```

- `title`、`description`、`pubDate` 必填，其余字段按需添加。没有分类时显示「随笔」。
- `featured: true` 会加入首页精选。`draft: true` 会让文章退出页面、列表、搜索、RSS 和站点地图。未来日期不会自动安排发布。
- 正文用 `$...$` 写行内公式。块级数学用独占行的 `$$` 包围，支持 `aligned`、`pmatrix`、积分、求和等 KaTeX 语法。
- 三个反引号后写 `python`、`matlab`、`cpp` 或 `bash` 可获得对应语法高亮。
- 公开图片放在 `public/images/`，正文用 `![图注](/images/example.svg)` 引用，支持 SVG、PNG 和 WebP。现有用 `heroImage` 引用 `src/assets/` 的方式也可继续使用。
- `/latex-lab/` 用于公式预览与复制，`/writing/` 用于查看 Markdown 正文和公式。

## 跨设备编辑与发布

### 首次授权

1. 确认要使用的 GitHub 分支已经包含根目录的 `.pages.yml`。
2. 打开 [Pages CMS](https://app.pagescms.org/)，用有仓库写权限的 GitHub 账号登录。安装官方 GitHub App 时选择 **Only select repositories**，只选 `25988ra/my_blog`。
3. 在 Pages CMS 打开该仓库和目标分支。若提示没有配置，检查当前分支是否已有 `.pages.yml`。授权可在 GitHub 的 **Settings → Applications → Installed GitHub Apps** 管理。

### 日常写作

1. 在本站的「在线写作」编写正文并预览 KaTeX。可以保存到当前浏览器，或复制 Markdown 到下一步。
2. 在 Pages CMS 的「科研文章」中新建或打开文章，填写标题、摘要、日期、分类和标签。新建时可提供英文文件名。
3. 头图可在文章表单中选择或上传。正文图在「科研配图」中上传，再在源码里引用得到的 `/images/…` 链接。
4. **跨设备草稿**可在写作分支开启「草稿」并保存，GitHub 会记录这次提交。准备发布时关闭开关，发起 PR 并合入 `main`。在 `main` 保存也会触发生产构建。本站仓库是公开的，草稿提交和已上传的素材可能在 GitHub 上可见。需要保密的源码或素材请留在本机或私有存储。
5. 推送或合并到 `main` 后，在 Cloudflare Workers 的 `my-blog` 查看对应提交的生产构建。上线后检查文章、RSS 和站点地图。

Pages CMS 是托管的 Git-based CMS，支持结构化表单和图片上传，Markdown 字段保留原始公式语法。实时公式预览由本站提供，所以要将正文复制到 CMS 再保存。[Pages CMS 授权说明](https://pagescms.org/docs/quick-start/)

[GitHub 网页编辑器](https://github.dev/25988ra/my_blog)可直接改原始 Markdown、MDX 和 Git 分支，适合维护组件或处理 PR。它使用 GitHub 自己的登录和权限，配图亦可通过 GitHub 仓库页面上传。这个方案作为 CMS 不便使用时的备用路径。

## 主题和内容维护

| 修改目标 | 文件或目录 |
| --- | --- |
| 站点名称、介绍、研究方向、头像和 Banner | `src/consts.ts` |
| 首页内容和舞台装饰 | `src/pages/index.astro`、`src/components/HomeHero.astro` |
| 明暗配色、排版、编辑器样式 | `src/styles/global.css` |
| 公用导航、页脚和元数据 | `src/components/`、`src/layouts/SiteLayout.astro` |
| 文章字段与发布筛选 | `src/content.config.ts`、`src/lib/posts.ts` |
| Markdown 和 MDX 数学、代码高亮 | `astro.config.mjs` |
| 编辑表单和配图目录 | `.pages.yml` |

如有获准使用的头像或 Banner，将文件放入 `public/images/`，并把 `profile.avatar` 或 `profile.banner` 改为相应的 `/images/…` 路径。当前 Banner 的拱门和水波由 CSS 绘制。

## Cloudflare Workers 与回滚

- GitHub 仓库为 `25988ra/my_blog`，生产分支为 `main`，Worker 为 `my-blog`。
- Workers Builds 执行 `npm run build`，使用 Wrangler 发布 `dist/`。根目录 `wrangler.jsonc` 显式声明了 Worker 名称及静态目录。
- Astro `site` 指向现有 `workers.dev` 域名。更新地址时，构建并检查 canonical、RSS 与站点地图。
- 发布后如需撤销，使用 GitHub 的 **Revert** 创建回滚 PR，或在 `main` 对目标提交运行 `git revert <提交号>`，再推送触发部署。需要先恢复服务时，可在 Cloudflare 的 **Versions & Deployments** 选择前一个可用部署，再用 Git 回滚同步源码。

[原博客管理指南](https://my-blog.2598857560.workers.dev/blog/blog-management-guide/)
