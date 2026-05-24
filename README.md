# Markdown Resume Builder

基于 Markdown 的个人简历生成工具 — 左侧编辑、右侧实时预览、一键导出 PDF。

## 功能

- **Markdown 编辑器** — 集成 CodeMirror 6，语法高亮、代码折叠、自动补全
- **实时预览** — Markdown → HTML 实时渲染，A4 纸张比例预览
- **PDF 导出** — Puppeteer 驱动 Headless Chrome，输出 A4 矢量 PDF
- **照片上传** — 点击上传照片，自动嵌入简历头部
- **标签式技能** — 技能以标签组件展示，分类清晰
- **本地运行** — 完全离线，无需数据库，数据由 Git 管理

## 技术栈

| 层面 | 选型 |
|------|------|
| 框架 | Next.js 16 + TypeScript |
| 样式 | TailwindCSS v4 |
| 编辑器 | CodeMirror 6 (`@uiw/react-codemirror`) |
| Markdown 解析 | unified + remark-parse + remark-html |
| PDF 导出 | Puppeteer |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 http://localhost:3000 即可使用。

## 使用方式

1. 在左侧编辑器中编写 Markdown 简历
2. 右侧实时预览渲染效果
3. 点击「上传照片」选择个人照片（照片保存在 `public/photo.jpg`，默认已加入 `.gitignore`）
4. 点击「导出 PDF」下载 A4 格式简历

### 简历结构

```md
## 教育经历
## 个人荣誉
## 项目经历
## 技能
```

技能使用 HTML 标签式布局，支持自定义分类和标签。

## 项目结构

```
autoresume/
├── app/
│   ├── api/
│   │   ├── export-pdf/route.ts   # PDF 导出 API
│   │   └── upload-photo/route.ts # 照片上传 API
│   ├── globals.css               # 全局样式 + 简历排版
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面（分栏布局）
├── components/
│   ├── Editor.tsx                # CodeMirror 编辑器
│   ├── Preview.tsx               # 简历预览（A4 尺寸）
│   └── Toolbar.tsx               # 工具栏（上传照片/导出 PDF）
├── content/
│   └── resume.md                 # 简历模板（源文件）
├── lib/
│   ├── markdown.ts               # Markdown → HTML 转换
│   └── pdf.ts                    # Puppeteer PDF 生成
└── public/
    └── content/resume.md         # 简历模板（HTTP 访问）
```

## PDF 导出

首次使用需安装 Chromium：

```bash
npx puppeteer browsers install chrome
```

## License

MIT
