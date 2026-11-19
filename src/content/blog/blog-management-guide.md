---
title: '博客管理指南：从写作、发布到更新'
description: '记录如何用 Markdown 写文章，在本地预览，通过 GitHub 和 Cloudflare Workers 发布，以及更新文章、管理图片和排查部署问题。'
pubDate: '2026-11-19'
category: '站点维护'
tags: ['Astro', 'Cloudflare', '博客管理']
draft: false
---

这个博客的文章源文件保存在 GitHub 仓库 `25988ra/my_blog`。每次发布时，Astro 把 Markdown、页面和素材构建成 `dist/` 里的静态站点，Cloudflare Workers 再把构建结果发布到公开网址。日常写文章和改文章都可以在本地完成，提交到 `main` 后由 Workers Builds 接手。

## 新建一篇文章

在 `src/content/blog/` 创建一个 `.md` 文件。建议文件名用小写英文和连字符，例如 `cfd-mesh-study.md`。发布后，它对应 `/blog/cfd-mesh-study/`。页面上显示的标题可以用中文。

把下面的模板复制到新文件里，替换标题、摘要、日期和正文。

```markdown
---
title: '网格无关性检验笔记'
description: '记录三套网格的计算设置、对比指标和结果。'
pubDate: '2026-11-19'
---

用一段话说明算例、要回答的问题和主要结论。

## 计算设置

记录几何、网格、边界条件和计算参数。

## 结果与局限

给出对比结果，并说明哪些条件会影响结论。
```

文件开头两个 `---` 之间是文章元数据。`title`、`description` 和 `pubDate` 是必填项，日期可用带引号的 `YYYY-MM-DD`。文章布局会显示标题，正文小节可以从 `##` 开始。

## 添加图片和附件

- **文章头图**可以放在 `src/assets/`。例如，把图片存为 `src/assets/cfd-mesh-study.jpg`，在文章的元数据里加上 `heroImage: '../../assets/cfd-mesh-study.jpg'`。这个相对路径适用于直接放在 `src/content/blog/` 的文章。
- **正文图片**可以放在 `public/images/`。例如，用 `![三套网格的局部对比](/images/mesh-comparison.png)` 引用 `public/images/mesh-comparison.png`。括号前的文字用于描述图片内容。
- **公开附件**可以放在 `public/files/`。例如，用 `[下载网格对比表](/files/mesh-comparison.csv)` 链接到 `public/files/mesh-comparison.csv`。`public/` 下的文件会随站点发布，先确认素材可以公开。

## 在本地预览

在仓库根目录运行以下命令。Node.js 版本以 `.nvmrc` 为准，目前是 24。首次克隆仓库或依赖发生变化时，先执行 `npm ci`。

```sh
npm ci
npm run astro -- dev --background
```

打开终端显示的地址，通常是 `http://localhost:4321`。从 `/blog/` 进入新文章，检查标题、日期、图片、链接和窄屏下的排版。可以用 `npm run astro -- dev status` 检查服务器状态，用 `npm run astro -- dev logs` 查看日志，预览结束后用 `npm run astro -- dev stop` 停止服务器。

发布前再运行一次正式构建：

```sh
npm run build
```

构建成功后，`dist/blog/` 会包含文章页面，`dist/rss.xml` 和站点地图也会重新生成。

## 上传并发布

在 `main` 分支上检查并提交文章。下面用 `cfd-mesh-study.md` 举例，实际发布时把路径换成自己的文件。如果文章新增了图片或附件，也要把对应文件加入同一个提交。

```sh
git status --short --branch
git add src/content/blog/cfd-mesh-study.md
git diff --cached
git commit -m "发布：网格无关性检验笔记"
git push origin main
```

提交源文件即可，`dist/` 由 Cloudflare 根据源码重新构建。也可以在 GitHub 网页打开仓库，在 `src/content/blog/` 使用 **Add file** 创建或上传 Markdown。网页上的修改合入 `main` 后会走同样的发布流程。下次回到本地编辑前，在工作区干净时运行 `git pull --ff-only` 同步。

推送后，到 Cloudflare 的 **Workers & Pages** 打开 `my-blog`，查看生产构建和部署是否成功。部署完成后，从[公开首页](/)打开[文章列表](/blog/)，点进新文章并检查图片。也可以打开 [RSS](/rss.xml) 和[站点地图](/sitemap-index.xml)，确认新文章的地址已经收录。

## 修改、撤下和恢复文章

1. **修改正文或标题**时，打开原 Markdown 文件编辑。保留文件名可让原有链接继续有效。保留原始 `pubDate`，需要显式记录修改日期时可加上 `updatedDate: '2026-11-19'`，并换成实际更新日期。
2. **发布修改**时，重新预览并运行 `npm run build`，然后提交改动并推送到 `main`。部署成功后打开原文章地址验证。
3. **撤下文章**时，从 `src/content/blog/` 移出或删除源文件，提交这个变更并重新部署。新构建会把文章从列表、RSS 和站点地图中移除。如果移动或改名只是为了调整网址，先考虑为旧链接配置重定向。
4. **恢复误改**时，先用 `git log -- src/content/blog/cfd-mesh-study.md` 找到相关提交。如果该提交的所有改动都要撤销，可以用 `git revert <提交号>` 生成一次反向提交，再推送。如果只需要恢复文章中的一部分，修改原文件并提交即可。

可以在文章头部设置 `draft: true`，构建时会跳过这篇文章。未来的 `pubDate` 不会自动延迟发布。仓库是公开的，保密草稿和素材应保存在本机或有权限限制的位置。

## 在线写作与发布

1. 从[在线写作](/writing/)打开双栏编辑器，输入正文并预览 Markdown 和 KaTeX 公式。可以把正文保存到当前浏览器，或复制到 Pages CMS。
2. 首次使用 [Pages CMS](https://app.pagescms.org/) 时，用 GitHub 登录，并只为 `25988ra/my_blog` 安装官方 GitHub App。选择已包含 `.pages.yml` 的分支。
3. 在「科研文章」中新建或编辑文章，填写标题、摘要、日期、分类、标签和正文。新建时用小写英文文件名。头图可直接上传，正文配图可在「科研配图」中上传后引用 `/images/文件名`。
4. 保留「草稿」开关可保存到 GitHub 而暂不生成公开页面。若希望审阅后发布，在写作分支编辑，确认后将 `draft` 关闭，发起 PR 并合并到 `main`。也可直接在 `main` 关闭草稿后保存，提交会触发 Cloudflare。

CMS 使用 Markdown 源码编辑器，公式预览在本站完成。需要直接改 MDX 组件时，可使用 [github.dev](https://github.dev/25988ra/my_blog)。

## 修改站点和排查部署

| 要修改的内容 | 文件位置 |
| --- | --- |
| 网站名称、全站描述 | `src/consts.ts` |
| 首页和关于页 | `src/pages/index.astro`、`src/pages/about.astro` |
| 导航和页脚 | `src/components/Header.astro`、`src/components/Footer.astro` |
| 公开域名 | `astro.config.mjs` 中的 `site` |

- **本地构建报错**时，先按终端给出的文件和行号检查元数据、日期及图片相对路径。如果日志显示找不到依赖，再核对 Node.js 版本和依赖是否已安装。
- **推送后没有生产构建**时，确认提交已出现在 GitHub 的 `main`，再到 Worker 的 **Settings → Build** 核对连接的仓库、生产分支和构建设置。
- **构建成功但线上仍是旧版**时，查看部署步骤是否成功、线上是否使用新部署，以及生产构建对应的提交号是否和 GitHub 一致。可以用 `git rev-parse --short HEAD` 查看本地提交号。
- **构建成功但部署失败**时，查看部署日志，确认 Worker 发布的是 Astro 生成的 `./dist`。如果使用 Wrangler 配置文件，检查静态资源目录 `assets.directory`。

参考文档见 [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)和 [Cloudflare Workers Builds 配置](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)。
