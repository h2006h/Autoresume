# Markdown Resume Builder 开发路线（个人版）

> 目标：
>
> 开发一个：
>
> - 基于 Markdown 编写
> - 可实时预览
> - 可导出 PDF
> - 支持多模板
> - 本地运行
> - Git 管理
>
> 的个人简历系统。

---

# 一、项目目标

最终实现：

```text
resume.md
    ↓
Parser
    ↓
Resume Schema
    ↓
React Template
    ↓
HTML
    ↓
PDF
```

支持输出：

- PDF 简历
- HTML 在线简历
- 多主题样式

---

# 二、技术栈推荐

## 前端框架

- Next.js
- React
- TypeScript

---

## UI

- TailwindCSS
- shadcn/ui

---

## Markdown 解析

- remark
- rehype

---

## PDF 导出

- Puppeteer

---

## 编辑器

- Monaco Editor

---

# 三、项目结构

```text
resume-builder/
├── app/
├── components/
├── content/
│   └── resume.md
├── lib/
│   ├── parser/
│   ├── schema/
│   └── exporter/
├── templates/
├── public/
├── output/
└── scripts/
```

---

# 四、第一阶段：基础环境搭建

## 目标

完成：

- Next.js 初始化
- Tailwind 配置
- Markdown 读取
- 页面显示

---

## Step 1：初始化项目

```bash
npx create-next-app@latest resume-builder
```

推荐：

```text
TypeScript: Yes
Tailwind: Yes
App Router: Yes
ESLint: Yes
```

---

## Step 2：安装依赖

```bash
npm install remark remark-html
npm install gray-matter
npm install rehype
npm install rehype-stringify
npm install unified
```

---

## Step 3：创建 Markdown 文件

```text
content/resume.md
```

示例：

```md
# 张三

## Experience

### OpenAI

- Built AI workflow system
- Improved latency by 40%
```

---

## Step 4：读取 Markdown

创建：

```text
lib/parser/readMarkdown.ts
```

功能：

- 读取 markdown 文件
- 转 HTML
- 返回字符串

---

## Step 5：页面渲染

在：

```text
app/page.tsx
```

实现：

```tsx
<div dangerouslySetInnerHTML={{ __html: html }} />
```

---

# 五、第二阶段：设计 Resume Schema

## 目标

不要直接依赖 HTML。

建立：

```ts
type Resume = {
  basics: Basics
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: string[]
}
```

---

## 为什么重要

后续：

- 多模板
- AI 修改
- PDF 导出
- 多语言

都依赖 Schema。

---

# 六、第三阶段：Markdown Parser

## 目标

实现：

```text
Markdown
→ AST
→ Resume Schema
```

---

## 推荐方式

使用：

```text
remark AST
```

不要自己 regex 硬解析。

---

## Parser 示例

```md
## Experience

### OpenAI

- Built AI workflow system
```

转换：

```json
{
  "experience": [
    {
      "company": "OpenAI",
      "items": [
        "Built AI workflow system"
      ]
    }
  ]
}
```

---

# 七、第四阶段：React 模板系统

## 目标

实现：

```text
Resume Schema
→ React Resume Template
```

---

## 模板目录

```text
templates/
├── modern/
├── minimal/
└── classic/
```

---

## 模板组件

```tsx
<ResumeTemplate resume={resume} />
```

内部：

```tsx
<Header />
<Experience />
<Projects />
<Skills />
```

---

# 八、第五阶段：PDF 导出

## 推荐方案（重点）

使用：

- Puppeteer

---

## 原理

```text
React 页面
→ Headless Chrome
→ PDF
```

---

## 安装

```bash
npm install puppeteer
```

---

## 创建导出脚本

```text
scripts/export-pdf.ts
```

---

## 导出流程

```ts
1. 启动本地页面
2. Puppeteer 打开页面
3. page.pdf()
4. 输出到 output/
```

---

## PDF 配置

```ts
await page.pdf({
  format: "A4",
  printBackground: true,
})
```

---

# 九、第六阶段：实时编辑器

## 目标

实现：

```text
左侧 Markdown
右侧 Resume Preview
```

---

## 推荐

使用：

- Monaco Editor

---

## 安装

```bash
npm install @monaco-editor/react
```

---

## 功能

支持：

- 实时编辑
- 自动刷新
- Markdown 高亮

---

# 十、第七阶段：主题系统

## 目标

支持：

```text
resume build --theme modern
```

---

## 建议结构

```ts
type Theme = {
  colors: {}
  typography: {}
  spacing: {}
}
```

---

## 可支持

- 极简风
- 苹果风
- 黑白 ATS 风
- 科技风

---

# 十一、第八阶段：多语言支持

## 目标

支持：

```text
resume.zh.md
resume.en.md
```

---

## 或者

统一 Schema：

```json
{
  "title": {
    "zh": "后端工程师",
    "en": "Backend Engineer"
  }
}
```

---

# 十二、第九阶段：CLI 工具

## 目标

实现：

```bash
resume dev
resume build
resume export
```

---

## 推荐

使用：

- commander

---

## 示例

```bash
npm install commander
```

---

# 十三、第十阶段：本地数据管理

## 推荐方式

直接：

```text
Git
```

---

## 优势

你可以：

```bash
git diff
```

查看简历修改记录。

---

# 十四、推荐的 Markdown DSL

## 不建议

自由 Markdown：

```md
### OpenAI
```

难解析。

---

## 推荐

结构化 Markdown：

````md
# Basics

name: 张三
title: Backend Engineer

# Experience

## OpenAI

role: Software Engineer
duration: 2023-2025

- Built AI workflow system
- Improved latency by 40%