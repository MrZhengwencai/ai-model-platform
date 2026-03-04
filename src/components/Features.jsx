import { Link } from 'react-router-dom';
import './Features.css';

function Features() {
  const features = [
    {
      id: 'gpt',
      icon: '🤖',
      title: 'GPT 系列',
      description: 'OpenAI 的 GPT-4 和 GPT-3.5，最强大的通用大语言模型，支持多种任务。'
    },
    {
      id: 'claude',
      icon: '🧠',
      title: 'Claude 系列',
      description: 'Anthropic 的 Claude 3，具有强大推理能力和安全性，擅长长文本处理。'
    },
    {
      id: 'gemini',
      icon: '💎',
      title: 'Gemini 系列',
      description: 'Google 的 Gemini Pro，多模态大模型，支持文本、图像、视频等输入。'
    },
    {
      id: 'ernie',
      icon: '🌟',
      title: '文心一言',
      description: '百度的知识增强大语言模型，中文理解能力强，适合国内应用场景。'
    },
    {
      id: 'qwen',
      icon: '🚀',
      title: '通义千问',
      description: '阿里云的大语言模型，支持多轮对话、文本生成等功能，性能优异。'
    },
    {
      id: 'hunyuan',
      icon: '🎯',
      title: '混元大模型',
      description: '腾讯的多模态大模型，支持文本、图像等多种任务，应用场景广泛。'
    },
    {
      id: 'openclaw',
      icon: '🦾',
      title: 'OpenClaw',
      description: 'OpenClaw 是一个新兴的开源大语言模型，具有强大的多语言理解和生成能力。'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">支持的大模型</h2>
          <p className="features-subtitle">汇集全球主流大语言模型，提供统一的接入方案</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <Link to={`/model/${feature.id}`} className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="feature-link">查看详情 →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
