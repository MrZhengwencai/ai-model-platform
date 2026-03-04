import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ModelIntegrations.css';

function ModelIntegrations() {
  const [activeTab, setActiveTab] = useState('gpt');

  const models = [
    {
      id: 'gpt',
      name: 'GPT-4 / GPT-3.5',
      icon: '🤖',
      provider: 'OpenAI',
      description: '最强大的通用大语言模型，支持文本生成、对话、代码编写等多种任务。',
      code: `import openai

client = openai.OpenAI(api_key="your-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`,
      language: 'python',
      docs: 'https://platform.openai.com/docs'
    },
    {
      id: 'claude',
      name: 'Claude 3',
      icon: '🧠',
      provider: 'Anthropic',
      description: '具有强大推理能力和安全性的大语言模型，擅长长文本处理。',
      code: `import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(message.content[0].text)`,
      language: 'python',
      docs: 'https://docs.anthropic.com'
    },
    {
      id: 'gemini',
      name: 'Gemini Pro',
      icon: '💎',
      provider: 'Google',
      description: 'Google最新推出的多模态大模型，支持文本、图像、视频等多种输入。',
      code: `import google.generativeai as genai

genai.configure(api_key="your-api-key")

model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("Hello!")

print(response.text)`,
      language: 'python',
      docs: 'https://ai.google.dev/docs'
    },
    {
      id: 'ernie',
      name: '文心一言',
      icon: '🌟',
      provider: '百度',
      description: '百度自主研发的知识增强大语言模型，中文理解能力强。',
      code: `import requests

url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions"
headers = {"Content-Type": "application/json"}
params = {"access_token": "your-access-token"}

data = {
    "messages": [{"role": "user", "content": "你好！"}]
}

response = requests.post(url, headers=headers, params=params, json=data)
print(response.json())`,
      language: 'python',
      docs: 'https://cloud.baidu.com/doc/WENXINWORKSHOP'
    },
    {
      id: 'qwen',
      name: '通义千问',
      icon: '🚀',
      provider: '阿里云',
      description: '阿里云推出的大语言模型，支持多轮对话、文本生成等功能。',
      code: `import dashscope

dashscope.api_key = "your-api-key"

response = dashscope.Generation.call(
    model='qwen-turbo',
    prompt='你好！'
)

print(response.output.text)`,
      language: 'python',
      docs: 'https://help.aliyun.com/zh/dashscope'
    },
    {
      id: 'hunyuan',
      name: '混元大模型',
      icon: '🎯',
      provider: '腾讯',
      description: '腾讯推出的多模态大模型，支持文本、图像等多种任务。',
      code: `import tencentcloud.hunyuan.v20230901 as hunyuan

cred = tencentcloud.common.Credential("your-secret-id", "your-secret-key")
client = hunyuan.Client(cred, "ap-guangzhou")

req = hunyuan.ChatCompletionsRequest()
req.Model = "hunyuan-lite"
req.Messages = [{"Role": "user", "Content": "你好！"}]

resp = client.ChatCompletions(req)
print(resp.Response.Choices[0].Message.Content)`,
      language: 'python',
      docs: 'https://cloud.tencent.com/document/product/1729'
    },
    {
      id: 'openclaw',
      name: 'OpenClaw',
      icon: '🦾',
      provider: 'OpenClaw',
      description: '新兴的开源大语言模型，具有强大的多语言理解和生成能力，支持多种部署方式。',
      code: `from openclaw import OpenClawClient

client = OpenClawClient(api_key="your-api-key")

response = client.chat(
    model="openclaw-7b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`,
      language: 'python',
      docs: 'https://docs.openclaw.ai'
    }
  ];

  const activeModel = models.find(m => m.id === activeTab);

  return (
    <section className="model-integrations" id="integrations">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">大模型接入方法</h2>
          <p className="section-subtitle">支持主流大语言模型，提供详细的接入文档和代码示例</p>
        </div>

        <div className="integrations-layout">
          <div className="model-tabs">
            {models.map(model => (
              <button
                key={model.id}
                className={`model-tab ${activeTab === model.id ? 'active' : ''}`}
                onClick={() => setActiveTab(model.id)}
              >
                <span className="tab-icon">{model.icon}</span>
                <div className="tab-info">
                  <span className="tab-name">{model.name}</span>
                  <span className="tab-provider">{model.provider}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="model-content">
            {activeModel && (
              <div className="content-card">
                <div className="content-header">
                  <div className="model-badge">
                    <span className="badge-icon">{activeModel.icon}</span>
                    <div className="badge-info">
                      <h3 className="badge-title">{activeModel.name}</h3>
                      <span className="badge-provider">{activeModel.provider}</span>
                    </div>
                  </div>
                  <div className="header-actions">
                    <Link to={`/model/${activeModel.id}`} className="detail-link">
                      查看详情 →
                    </Link>
                    <a href={activeModel.docs} target="_blank" rel="noopener noreferrer" className="docs-link">
                      官方文档 →
                    </a>
                  </div>
                </div>

                <p className="model-description">{activeModel.description}</p>

                <div className="code-section">
                  <div className="code-header">
                    <span className="code-language">{activeModel.language}</span>
                    <button className="copy-button" onClick={() => navigator.clipboard.writeText(activeModel.code)}>
                      复制代码
                    </button>
                  </div>
                  <pre className="code-block">
                    <code>{activeModel.code}</code>
                  </pre>
                </div>

                <div className="steps-section">
                  <h4 className="steps-title">接入步骤</h4>
                  <ol className="steps-list">
                    <li>在 {activeModel.provider} 注册账号并获取 API Key</li>
                    <li>安装对应的 SDK 或使用 REST API</li>
                    <li>配置 API Key 和相关参数</li>
                    <li>调用 API 并处理返回结果</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModelIntegrations;
