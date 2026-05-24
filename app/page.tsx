'use client';

import { useState, useEffect } from 'react';
import { markdownToHtml } from '@/lib/markdown';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import Toolbar from '@/components/Toolbar';

const DEFAULT_MD = `<div class="resume-header">
  <div class="resume-photo">
    <div class="resume-photo-placeholder">照片</div>
  </div>
  <div class="resume-info">
    <h1>你的姓名</h1>
    <table class="resume-info-table">
      <tr><td class="label">性　　别</td><td>—</td><td class="label">出生日期</td><td>—</td></tr>
      <tr><td class="label">政治面貌</td><td>—</td><td class="label">民　　族</td><td>—</td></tr>
      <tr><td class="label">联系电话</td><td>—</td><td class="label">电子邮箱</td><td>—</td></tr>
      <tr><td class="label">求职意向</td><td>Agent 工程师</td><td class="label">GitHub</td><td>—</td></tr>
    </table>
  </div>
</div>

---

## 教育经历

### 学校名称

> 20XX.09 - 20XX.06 | 硕士 · 专业名称

**主修课程：** 课程一、课程二、课程三、课程四、课程五

## 个人荣誉

- **奖项名称** · 时间
- **奖项名称** · 时间

## 项目经历

### 项目名称

> 20XX.XX - 至今 | 角色

- 项目概述与核心功能简介
- 详细说明技术实现：框架选型、架构设计、性能优化等
- 列出关键技术栈和工具链

## 技能

<div class="skill-section">
<div class="skill-group">
<b class="skill-label">语言</b>
<span class="skill-tag">TypeScript</span>
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">Python</span>
</div>
<div class="skill-group">
<b class="skill-label">后端</b>
<span class="skill-tag">Node.js</span>
<span class="skill-tag">Express</span>
<span class="skill-tag">Django</span>
</div>
<div class="skill-group">
<b class="skill-label">前端</b>
<span class="skill-tag">Vue 3</span>
<span class="skill-tag">React</span>
<span class="skill-tag">Next.js</span>
</div>
<div class="skill-group">
<b class="skill-label">AI/LLM</b>
<span class="skill-tag">LangChain</span>
<span class="skill-tag">Multi-Agent</span>
<span class="skill-tag">Prompt Engineering</span>
</div>
</div>
`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载默认简历内容
    fetch('/content/resume.md')
      .then((res) => {
        if (res.ok) return res.text();
        throw new Error('Failed to load');
      })
      .then((md) => {
        setMarkdown(md);
      })
      .catch(() => {
        // 使用内置默认内容
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    markdownToHtml(markdown).then(setHtml);
  }, [markdown]);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar markdown={markdown} onMarkdownChange={setMarkdown} />
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧编辑器 */}
        <div className="w-1/2 border-r border-zinc-700">
          {loading ? (
            <div className="flex items-center justify-center h-full text-zinc-400">
              Loading...
            </div>
          ) : (
            <Editor value={markdown} onChange={setMarkdown} />
          )}
        </div>
        {/* 右侧预览 */}
        <div className="w-1/2 bg-zinc-100">
          <Preview html={html} />
        </div>
      </div>
    </div>
  );
}
