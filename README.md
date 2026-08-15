# 熊奕辉 · 个人博客

华北理工大学采矿工程（双碳方向）本科生熊奕辉的个人博客网站。
暗色科技风 · 玻璃拟态 · 粒子动效，纯静态页面，无需任何框架即可上线。

## 📁 文件结构

```
个人博客/
├── index.html            # 主页（关于/简历/技能/荣誉/经历/博客/联系）
├── css/style.css         # 全部样式
├── js/main.js            # 粒子背景、打字机、滚动动画等交互
├── assets/
│   ├── id-photo.jpg      # 证件照（已压缩 263KB）
│   └── resume.jpg        # 简历（已压缩 296KB）
├── posts/                # 博客文章（新增文章照着抄一份改内容即可）
│   ├── hello-world.html
│   ├── first-place.html
│   └── competition.html
└── README.md
```

> 原始高清图 `a72a1983-....png`（证件照原图）和 `图片1.png`（简历原图）保留在本文件夹，
> 但已通过 `.gitignore` 排除，不会上传到线上。

## 🔧 本地预览

双击 `index.html` 即可在浏览器中打开（推荐用 Chrome / Edge）。

## ✏️ 如何修改

| 想改什么 | 去哪里改 |
| --- | --- |
| 姓名、介绍、奖项、技能、联系方式 | `index.html` 对应版块 |
| 颜色主题 | `css/style.css` 顶部的 `:root { --cyan / --emerald ... }` |
| 新增博客文章 | 复制 `posts/hello-world.html` 改内容，并在 `index.html` 的博客版块加一个卡片 |
| 替换照片/简历 | 覆盖 `assets/id-photo.jpg` / `assets/resume.jpg` |

## 🚀 上线步骤（GitHub Pages，免费）

1. **注册 GitHub**：打开 <https://github.com> 注册账号（记住你的用户名）。
2. **新建仓库**：登录后点右上角 `+` → `New repository`，仓库名填 `blog`（或任意英文名），选 Public，不要勾选任何初始化选项。
3. **上传代码**：仓库页面点 `uploading an existing file`，把下面的文件拖进去（**保持文件夹结构**）：
   - `index.html`
   - `css/` 文件夹
   - `js/` 文件夹
   - `assets/` 文件夹
   - `posts/` 文件夹
   - `README.md`
   然后点 Commit changes。
   > 文件多的话，用 Git 命令行推送更快：装好 Git 后在 `个人博客` 文件夹里执行
   > `git init && git add . && git commit -m "init"`，再按仓库页面提示 `git remote add origin ... && git push -u origin main`。
4. **开启 Pages**：仓库页 → `Settings` → 左侧 `Pages` → `Branch` 选 `main`、目录选 `/ (root)` → Save。
5. **访问网站**：等待 1–2 分钟后，打开
   `https://<你的用户名>.github.io/blog/`
   发给任何人即可访问。

## 🌐 绑定自己的域名（可选）

在域名服务商处添加一条 CNAME 记录指向 `<你的用户名>.github.io`，
并在仓库 `Settings → Pages → Custom domain` 里填入域名即可。

## 📄 其他部署方式

- **Netlify**：注册后直接拖 `个人博客` 文件夹到 Netlify 页面即可上线，获得 `xxx.netlify.app` 域名。
- **Vercel**：注册后导入 GitHub 仓库或直接部署文件夹。
- **Gitee Pages**：国内访问更快，流程与 GitHub Pages 类似。

---

© 2024 – 2026 熊奕辉 · 用代码与热爱记录成长
