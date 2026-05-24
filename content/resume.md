<div class="resume-header">
  <div class="resume-photo">
    <div class="resume-photo-placeholder">照片</div>
  </div>
  <div class="resume-info">
    <h1>张三</h1>
    <table class="resume-info-table">
      <tr><td class="label">性　　别</td><td>男</td><td class="label">出生日期</td><td>1996.06</td></tr>
      <tr><td class="label">政治面貌</td><td>中共党员</td><td class="label">民　　族</td><td>汉族</td></tr>
      <tr><td class="label">联系电话</td><td>138-0000-0000</td><td class="label">电子邮箱</td><td>zhangsan@example.com</td></tr>
      <tr><td class="label">求职意向</td><td>Agent 工程师</td><td class="label">GitHub</td><td>github.com/zhangsan</td></tr>
    </table>
  </div>
</div>

---

## 教育经历

### 清华大学

> 2018.09 - 2021.06 | 硕士 · 计算机科学与技术

**主修课程：** 算法设计与分析、数据结构、操作系统、计算机网络、数据库系统、软件工程、编译原理、人工智能、机器学习、分布式系统

## 个人荣誉

- **ACM-ICPC 亚洲区域赛** 银牌 · 2019
- **国家奖学金** · 2020
- **校级优秀硕士学位论文** · 2021
- **开源项目 GitHub 500+ Star** · AgentHub · 2026

## 项目经历

### AIFriends — AI 虚拟角色创作分享平台

> 2025.06 - 至今 | 独立开发

- 基于大语言模型的虚拟角色平台，用户可创建多个虚拟角色并自定义音色、性格与简介
- 后端使用 **Django + Django REST Framework**，前端采用 **Vue 3 + Composition API**
- 大模型层基于 **LangChain** 构建对话链，集成 Prompt 模板、记忆管理与多轮对话上下文
- 集成 **语音识别 (ASR)** 与 **语音合成 (TTS)**，实现用户语音输入 → LLM 生成 → 语音输出的全链路通话
- 支持**语音复刻**：上传少量音频样本生成个性化音色，实现角色声音定制
- 采用 **前后端分离 + RESTful API** 架构，JWT 认证，WebSocket 实时推送消息

### Resume Builder — 个人简历生成系统

> 2024.01 - 至今 | 独立开发

- 基于 Markdown 的简历生成工具，支持实时预览、多模板切换、PDF 导出
- 前端使用 **Next.js 16 + TypeScript + TailwindCSS v4**，采用 App Router 架构
- 编辑器集成 **CodeMirror 6**，配置 Markdown 语法高亮、代码折叠与自动补全
- Markdown 解析使用 **unified + remark-parse + remark-html** 管道，AST → 结构化 HTML
- PDF 导出基于 **Puppeteer** 启动 Headless Chrome，渲染 A4 页面并输出矢量 PDF

### AgentHub — 轻量级 Multi-Agent 调度系统

> 2026.05 | 独立开发

- 自研 Multi-Agent 框架，不依赖 LangChain，从底层实现 LLM 调用、流式响应、上下文管理与 Agent 路由
- 后端使用 **Node.js + Express + TypeScript**，前端采用 **Vue 3 (Composition API) + Element Plus + Pinia**
- 集成 **DeepSeek API** 流式输出（SSE），滑动窗口上下文截断 + Token 估算，单汉字 1.3/token
- 实现 **WebSocket** 实时消息推送，Agent 回复 Token 逐字显示，支持 API 3 次指数退避重试（1s/2s/4s + jitter）
- 自研 Agent 热加载机制：Prompt 配置从 **SQLite** 动态加载，60s TTL 缓存，零重启切换
- 内置三大 Agent：知识问答（RAG 思路）、任务管理（AI 自动拆分 + Kanban 看板）、代码审查（Monaco Editor + diff2html 差异对比）
- 前端 **50+ CSS 自定义属性**实现 Glass Morphism 毛玻璃风格，Grid 双列自适应，暗色代码审阅面板

## 技能

<div class="skill-section">
<div class="skill-group">
<b class="skill-label">语言</b>
<span class="skill-tag">TypeScript</span>
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">Python</span>
<span class="skill-tag">HTML/CSS</span>
</div>
<div class="skill-group">
<b class="skill-label">后端</b>
<span class="skill-tag">Node.js</span>
<span class="skill-tag">Express</span>
<span class="skill-tag">Django</span>
<span class="skill-tag">RESTful API</span>
<span class="skill-tag">JWT</span>
</div>
<div class="skill-group">
<b class="skill-label">前端</b>
<span class="skill-tag">Vue 3</span>
<span class="skill-tag">React</span>
<span class="skill-tag">Next.js</span>
<span class="skill-tag">TailwindCSS</span>
<span class="skill-tag">Pinia</span>
</div>
<div class="skill-group">
<b class="skill-label">AI/LLM</b>
<span class="skill-tag">LangChain</span>
<span class="skill-tag">Multi-Agent</span>
<span class="skill-tag">Prompt Engineering</span>
<span class="skill-tag">RAG</span>
<span class="skill-tag">ASR/TTS</span>
<span class="skill-tag">SSE</span>
</div>
<div class="skill-group">
<b class="skill-label">数据/通信</b>
<span class="skill-tag">SQLite</span>
<span class="skill-tag">WebSocket</span>
<span class="skill-tag">Redis</span>
</div>
<div class="skill-group">
<b class="skill-label">工具</b>
<span class="skill-tag">Git</span>
<span class="skill-tag">Docker</span>
<span class="skill-tag">Puppeteer</span>
<span class="skill-tag">Vite</span>
</div>
</div>
