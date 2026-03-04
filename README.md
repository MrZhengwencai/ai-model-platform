# AI大模型接入平台 - 企业级响应式网站

一个现代化的企业级网站，专注于提供市面上流行AI大模型的接入方法和AI组件库展示。

## 项目特点

- 🎨 **科技暗黑风格** - 现代化的深色主题设计
- 📱 **完全响应式** - 支持桌面、平板和移动设备
- 🤖 **AI大模型集成** - 支持多种主流AI模型的接入方法
- 🧩 **AI组件库** - 丰富的AI应用组件展示
- ⚡ **React + Vite** - 快速开发和构建
- 🚀 **GitHub Pages自动部署** - 使用CI/CD自动部署

## 支持的AI模型

- GPT (OpenAI)
- Claude (Anthropic)
- Gemini (Google)
- 文心一言 (百度)
- 通义千问 (阿里云)
- 混元大模型 (腾讯)
- OpenClaw

## AI组件库

包含以下AI应用组件：

1. **聊天组件** (ChatComponent) - 智能对话界面
2. **流式输出** (StreamOutput) - 实时流式文本输出
3. **提示词编辑器** (PromptEditor) - AI提示词编辑和管理
4. **语音识别** (VoiceRecognition) - 语音转文字功能
5. **图像生成** (ImageGeneration) - AI图像生成界面
6. **代码补全** (CodeCompletion) - 智能代码补全
7. **情感分析** (SentimentAnalysis) - 文本情感分析
8. **多模态输入** (MultimodalInput) - 多模态输入界面
9. **文档问答** (DocumentQA) - 文档智能问答
10. **智能推荐** (SmartRecommendation) - AI智能推荐系统
11. **思维链** (ChainOfThought) - AI思维链展示
12. **知识图谱** (KnowledgeGraph) - 可视化知识图谱编辑器

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由**: React Router
- **样式**: CSS3 (Flexbox, Grid, Animations)
- **部署**: GitHub Pages

## 本地开发

### 环境要求

- Node.js >= 20.19.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5174 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
big-project/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── ai-components/ # AI组件库
│   │   ├── Features.jsx   # 功能展示
│   │   ├── Header.jsx    # 导航栏
│   │   ├── Hero.jsx      # 首页横幅
│   │   └── Footer.jsx    # 页脚
│   ├── pages/            # 页面组件
│   │   ├── ComponentLibrary.jsx  # 组件库页面
│   │   └── ModelDetail.jsx      # 模型详情页
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 应用入口
│   └── index.css        # 全局样式
├── .github/workflows/    # CI/CD配置
├── .gitignore          # Git忽略文件
├── package.json        # 项目配置
├── vite.config.js     # Vite配置
└── README.md         # 项目文档
```

## CI/CD部署

项目使用GitHub Actions自动部署到GitHub Pages：

- 推送到`main`分支时自动触发部署
- 使用GitHub Pages托管静态网站
- 自动构建和部署流程

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 贡献指南

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过GitHub Issues联系我们。
