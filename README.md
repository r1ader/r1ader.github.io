# 雷鸣游戏

雷鸣游戏官方网站，展示首款 3D 空间解谜游戏《春现 Spring Up》。

- 官网：<https://r1ader.github.io/>
- 春现 TapTap：<https://www.taptap.cn/app/956572>
- 技术：原生 HTML、CSS 和 JavaScript，无需安装依赖或构建。

## 本地预览

在仓库目录启动静态服务器，例如：

```sh
python -m http.server 4173 --bind 127.0.0.1
```

访问 <http://127.0.0.1:4173>。页面支持移动端、键盘导航、减少动态效果、截图切换与放大。关闭 JavaScript 后，介绍和 TapTap 链接仍可访问，截图可以直接打开。

## 发布与维护

GitHub Pages 从 `main` 分支根目录发布，`.nojekyll` 禁用 Jekyll 处理。更新静态文件后提交并推送即可。

内容在 `index.html`，样式在 `styles.css`，截图交互在 `script.js`。`assets/brand/` 保存厂商标志，`assets/games/spring-up/` 保存处理后的 TapTap 宣传素材。所有素材均在仓库内，不依赖外部图床。

设计方法、素材来源与备份记录见 [docs/design.md](docs/design.md) 和 [docs/assets.json](docs/assets.json)。

## 旧站备份

原个人主页及完整提交历史保留在 [`backup/personal-homepage-20261016`](https://github.com/r1ader/r1ader.github.io/tree/backup/personal-homepage-20261016)。原主分支提交：`8bfb79fcb0f6f5c98ec5cc627a6ed87cd87bfef8`。新的 main 从独立根提交开始。
