# 打工摸鱼指北 🦦 (Today Tips)

面向年轻打工人的“今日安排助手”，帮助用户减少“今天到底该怎么过”的小决策疲劳。
打开即用，无需登录，给你一个不那么费脑子的今天。

## 🌟 核心特色

- **零门槛体验**：无账号系统，无前置问卷，打开直接看建议。
- **四大情境模式**：
  - 💼 正常上班日
  - 👥 会很多的一天
  - 🔋 状态很差的一天
  - ☕️ 周末
- **轻梗建议引擎**：基于场景随机生成“总判断 + 避坑指南 + 动作建议”，不仅具体可执行，还自带轻量级吐槽与情绪价值。
- **隐私友好**：仅使用浏览器本地 `localStorage` 记录最近的状态和防抖刷新，不会向服务器上传任何个人数据。

## 🛠 技术栈

- **框架**: Next.js 16 (App Router)
- **UI/样式**: Tailwind CSS v4
- **图标**: Lucide React
- **语言**: TypeScript

## 🚀 本地运行

1. 克隆项目并进入目录：
   ```bash
   git clone <repository-url>
   cd today-tips
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中打开：
   访问 [http://localhost:3000](http://localhost:3000) (或者终端提示的端口) 即可预览。

## 📦 项目结构

- `src/app/` - Next.js 页面与全局样式 (含 `page.tsx` 和 `layout.tsx`)
- `src/components/` - 可复用的 UI 组件 (`Header`, `SituationSelector`, `SuggestionCard`)
- `src/data/` - 建议引擎的核心文案库 (`suggestions.ts`)

## 💡 设计初衷

首版核心目标不是留存或付费，而是验证“这种日常建议站有没有记忆点和分享意愿”。我们不做毒鸡汤、不做强攻击性吐槽、不做玄学包装，而是走“有趣但克制”的路线。
