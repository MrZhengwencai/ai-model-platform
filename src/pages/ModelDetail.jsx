import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ModelDetail.css';

function ModelDetail() {
  const { modelId } = useParams();
  const [activeLanguage, setActiveLanguage] = useState('python');

  const modelData = {
    gpt: {
      name: 'GPT-4 / GPT-3.5',
      icon: '🤖',
      provider: 'OpenAI',
      description: 'OpenAI 的 GPT 系列是目前最强大的通用大语言模型。GPT-4 具有强大的推理、理解和生成能力，而 GPT-3.5 则提供了更快的响应速度和更低的成本。',
      features: [
        '强大的文本生成和理解能力',
        '支持多轮对话和上下文理解',
        '代码生成和调试能力',
        '多语言支持',
        'Function Calling 功能',
        '流式响应支持'
      ],
      pricing: {
        gpt4: '输入: $0.03/1K tokens, 输出: $0.06/1K tokens',
        gpt35: '输入: $0.0015/1K tokens, 输出: $0.002/1K tokens'
      },
      docs: 'https://platform.openai.com/docs',
      quickStart: [
        {
          title: '1. 注册 OpenAI 账号',
          content: '访问 https://platform.openai.com/signup 注册账号，使用邮箱或 Google 账号登录。'
        },
        {
          title: '2. 创建 API Key',
          content: '登录后进入 https://platform.openai.com/api-keys，点击 "Create new secret key" 创建新的 API Key。⚠️ 重要：API Key 只显示一次，请立即复制并妥善保管！'
        },
        {
          title: '3. 充值余额',
          content: '在 https://platform.openai.com/account/billing 添加付款方式并充值。GPT-4 需要至少充值 $5 才能使用。'
        },
        {
          title: '4. 设置使用限额',
          content: '在 Billing 设置中设置每月使用限额，避免意外超支。建议先设置较低限额测试。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '永远不要将 API Key 硬编码在代码中',
          '使用环境变量或密钥管理服务（如 AWS Secrets Manager、HashiCorp Vault）',
          '在生产环境中使用 HTTPS 传输所有 API 请求',
          '实施 API Key 轮换策略，定期更换密钥',
          '为不同的环境（开发、测试、生产）使用不同的 API Key'
        ],
        performance: [
          '使用流式响应（stream=True）提升用户体验',
          '实现请求重试机制（指数退避算法）',
          '设置合理的 timeout 参数（建议 30-60 秒）',
          '使用连接池复用 HTTP 连接',
          '批量处理请求以减少 API 调用次数'
        ],
        cost: [
          '使用 GPT-3.5-turbo 处理简单任务，GPT-4 处理复杂任务',
          '设置 max_tokens 参数控制输出长度',
          '优化 prompt 减少 token 使用量',
          '监控 API 使用量和成本',
          '实现缓存机制避免重复请求'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制（Rate Limit）保护后端服务',
          '使用队列系统处理高并发请求',
          '记录详细的日志用于问题排查',
          '设置健康检查和告警机制'
        ]
      },
      languages: {
        python: {
          install: 'pip install openai',
          code: `import openai

client = openai.OpenAI(api_key="your-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello! Can you help me?"}
    ],
    temperature=0.7,
    max_tokens=150
)

print(response.choices[0].message.content)

# 流式响应示例
stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`
        },
        javascript: {
          install: 'npm install openai',
          code: `import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key'
});

async function chat() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello! Can you help me?' }
    ],
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 150
  });

  console.log(completion.choices[0].message.content);
}

chat();

// 流式响应示例
async function streamChat() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Tell me a story' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello! Can you help me?"}
    ],
    "temperature": 0.7,
    "max_tokens": 150
  }'`
        },
        java: {
          install: 'implementation "com.azure:azure-ai-openai"',
          code: `import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;

public class GPTExample {
    public static void main(String[] args) {
        String apiKey = "your-api-key";
        
        OpenAIClient client = new OpenAIClientBuilder()
            .credential(new AzureKeyCredential(apiKey))
            .buildClient();

        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage(ChatRole.SYSTEM)
            .setContent("You are a helpful assistant."));
        messages.add(new ChatMessage(ChatRole.USER)
            .setContent("Hello! Can you help me?"));

        ChatCompletionsOptions options = new ChatCompletionsOptions(messages)
            .setModel("gpt-4")
            .setTemperature(0.7)
            .setMaxTokens(150);

        ChatCompletions completions = client.getChatCompletions("gpt-4", options);
        System.out.println(completions.getChoices().get(0).getMessage().getContent());
    }
}`
        }
      }
    },
    claude: {
      name: 'Claude 3',
      icon: '🧠',
      provider: 'Anthropic',
      description: 'Anthropic 的 Claude 3 系列包括 Opus、Sonnet 和 Haiku 三个版本，具有强大的推理能力和安全性，特别擅长长文本处理和复杂任务。',
      features: [
        '强大的推理和分析能力',
        '支持 200K 上下文窗口',
        '优秀的长文本处理能力',
        '多模态支持（图像理解）',
        '工具使用和函数调用',
        '流式响应支持'
      ],
      pricing: {
        opus: '输入: $15/1M tokens, 输出: $75/1M tokens',
        sonnet: '输入: $3/1M tokens, 输出: $15/1M tokens',
        haiku: '输入: $0.25/1M tokens, 输出: $1.25/1M tokens'
      },
      docs: 'https://docs.anthropic.com',
      quickStart: [
        {
          title: '1. 注册 Anthropic 账号',
          content: '访问 https://console.anthropic.com/ 注册账号。'
        },
        {
          title: '2. 创建 API Key',
          content: '在控制台的 API Keys 页面创建新的 API Key。⚠️ 重要：API Key 只显示一次，请立即复制并妥善保管！'
        },
        {
          title: '3. 充值余额',
          content: '在 Billing 页面添加付款方式并充值。Claude 3 Opus 需要预付费。'
        },
        {
          title: '4. 选择模型版本',
          content: '根据需求选择：Claude 3 Opus（最强）、Sonnet（平衡）、Haiku（最快最便宜）。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '使用环境变量或密钥管理服务存储 API Key',
          '实施 API Key 轮换策略',
          '在生产环境中使用 HTTPS',
          '设置使用限额和告警',
          '为不同环境使用不同的 API Key'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制（指数退避）',
          '设置合理的 timeout 参数',
          '利用 Claude 的长上下文窗口处理大文档',
          '使用 Haiku 处理简单任务，Opus 处理复杂任务'
        ],
        cost: [
          '根据任务复杂度选择合适的模型版本',
          '设置 max_tokens 控制输出长度',
          '优化 prompt 减少 token 使用',
          '监控 API 使用量和成本',
          '实现缓存机制'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统处理高并发',
          '记录详细日志',
          '设置健康检查和告警'
        ]
      },
      languages: {
        python: {
          install: 'pip install anthropic',
          code: `import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello! Can you help me?"}
    ]
)

print(message.content[0].text)

# 流式响应示例
with client.messages.stream(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me a story"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`
        },
        javascript: {
          install: 'npm install @anthropic-ai/sdk',
          code: `import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: 'your-api-key'
});

async function chat() {
  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: 'Hello! Can you help me?' }
    ]
  });

  console.log(message.content[0].text);
}

chat();

// 流式响应示例
async function streamChat() {
  const stream = await anthropic.messages.stream({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Tell me a story' }]
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta') {
      process.stdout.write(event.delta.text);
    }
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: your-api-key" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello! Can you help me?"}
    ]
  }'`
        },
        java: {
          install: 'implementation "com.anthropic:anthropic-java-sdk"',
          code: `import com.anthropic.AnthropicClient;
import com.anthropic.types.*;

public class ClaudeExample {
    public static void main(String[] args) {
        String apiKey = "your-api-key";
        
        AnthropicClient client = AnthropicClient.builder()
            .apiKey(apiKey)
            .build();

        MessageRequest request = MessageRequest.builder()
            .model("claude-3-opus-20240229")
            .maxTokens(1024)
            .messages(java.util.List.of(
                Message.builder()
                    .role("user")
                    .content("Hello! Can you help me?")
                    .build()
            ))
            .build();

        MessageResponse response = client.messages().create(request);
        System.out.println(response.content().get(0).text());
    }
}`
        }
      }
    },
    gemini: {
      name: 'Gemini Pro',
      icon: '💎',
      provider: 'Google',
      description: 'Google 最新推出的多模态大模型，支持文本、图像、视频等多种输入，具有强大的多语言理解和生成能力。',
      features: [
        '多模态支持（文本、图像、视频、音频）',
        '强大的多语言能力',
        '支持 1M 上下文窗口',
        '代码生成和调试',
        '工具调用功能',
        '流式响应支持'
      ],
      pricing: {
        pro: '免费版: 15次/分钟, Pro版: $0.00025/1K字符'
      },
      docs: 'https://ai.google.dev/docs',
      quickStart: [
        {
          title: '1. 创建 Google Cloud 项目',
          content: '访问 https://console.cloud.google.com/ 创建新项目或选择现有项目。'
        },
        {
          title: '2. 启用 Gemini API',
          content: '在 Google Cloud Console 中搜索并启用 "Generative Language API"。'
        },
        {
          title: '3. 创建 API Key',
          content: '在 API & Services > Credentials 页面创建 API Key。⚠️ 注意：在生产环境中应使用 OAuth 2.0 而非 API Key。'
        },
        {
          title: '4. 设置配额',
          content: '在 Quotas 页面设置 API 调用配额，避免超出限制。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '生产环境使用 OAuth 2.0 而非 API Key',
          '实施密钥轮换策略',
          '使用 HTTPS 传输所有请求',
          '设置 API 使用限额和告警',
          '使用 IAM 角色控制访问权限'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制',
          '利用 Gemini 的多模态能力',
          '使用 Gemini 1.5 Pro 处理长文本',
          '批量处理请求'
        ],
        cost: [
          '监控 API 使用量和成本',
          '设置配额限制',
          '优化 prompt 减少字符使用',
          '使用缓存机制',
          '选择合适的模型版本'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统',
          '记录详细日志',
          '设置健康检查'
        ]
      },
      languages: {
        python: {
          install: 'pip install google-generativeai',
          code: `import google.generativeai as genai

genai.configure(api_key="your-api-key")

model = genai.GenerativeModel('gemini-pro')

response = model.generate_content("Hello! Can you help me?")
print(response.text)

# 流式响应示例
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("Tell me a story", stream=True)

for chunk in response:
    print(chunk.text, end="", flush=True)

# 多模态示例（图像理解）
import PIL.Image

model = genai.GenerativeModel('gemini-pro-vision')
img = PIL.Image.open('image.jpg')
response = model.generate_content(["What's in this image?", img])
print(response.text)`
        },
        javascript: {
          install: 'npm install @google/generative-ai',
          code: `import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('your-api-key');

async function chat() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const result = await model.generateContent('Hello! Can you help me?');
  const response = await result.response;
  console.log(response.text());
}

chat();

// 流式响应示例
async function streamChat() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContentStream('Tell me a story');
  
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=your-api-key" \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "contents": [{
      "parts":[{"text": "Hello! Can you help me?"}]
    }]
  }'`
        },
        java: {
          install: 'implementation "com.google.ai.client:generativeai"',
          code: `import com.google.ai.client.generativeai.*;
import com.google.ai.client.generativeai.type.*;

public class GeminiExample {
    public static void main(String[] args) {
        String apiKey = "your-api-key";
        
        GenerativeModel model = new GenerativeModel(
            "gemini-pro",
            GoogleAI.getApiKey(apiKey)
        );

        GenerateContentResponse response = model.generateContent(
            new Content.Builder()
                .addText("Hello! Can you help me?")
                .build()
        );

        System.out.println(response.getText());
    }
}`
        }
      }
    },
    ernie: {
      name: '文心一言',
      icon: '🌟',
      provider: '百度',
      description: '百度自主研发的知识增强大语言模型，中文理解能力强，适合国内应用场景，支持多种任务类型。',
      features: [
        '强大的中文理解和生成能力',
        '知识增强技术',
        '支持多轮对话',
        '代码生成能力',
        '长文本处理',
        '流式响应支持'
      ],
      pricing: {
        standard: '免费版: 100次/天, Pro版: ¥0.012/千tokens'
      },
      docs: 'https://cloud.baidu.com/doc/WENXINWORKSHOP',
      quickStart: [
        {
          title: '1. 注册百度智能云账号',
          content: '访问 https://cloud.baidu.com/ 注册账号并完成实名认证。'
        },
        {
          title: '2. 创建应用',
          content: '在千帆大模型平台创建应用，获取 API Key 和 Secret Key。'
        },
        {
          title: '3. 获取 Access Token',
          content: '使用 API Key 和 Secret Key 调用认证接口获取 Access Token（有效期30天）。'
        },
        {
          title: '4. 选择模型版本',
          content: 'ERNIE-Bot-4（最强）、ERNIE-Bot-turbo（最快）、ERNIE-Speed（最便宜）。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '使用环境变量存储 API Key 和 Secret Key',
          '实施密钥轮换策略',
          '定期刷新 Access Token',
          '使用 HTTPS 传输所有请求',
          '设置 IP 白名单限制访问'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制',
          '缓存 Access Token 避免频繁刷新',
          '使用连接池复用 HTTP 连接',
          '批量处理请求'
        ],
        cost: [
          '根据任务复杂度选择合适的模型版本',
          '设置 max_tokens 控制输出长度',
          '优化 prompt 减少 token 使用',
          '监控 API 使用量和成本',
          '实现缓存机制'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统',
          '记录详细日志',
          '设置健康检查'
        ]
      },
      languages: {
        python: {
          install: 'pip install qianfan',
          code: `import qianfan

client = qianfan.ChatCompletion(
    ak="your-access-key",
    sk="your-secret-key"
)

response = client.do(
    model="ERNIE-Bot-4",
    messages=[{
        "role": "user",
        "content": "你好！能帮我吗？"
    }],
    temperature=0.7,
    top_p=0.8
)

print(response['result'])

# 流式响应示例
response = client.do(
    model="ERNIE-Bot-4",
    messages=[{
        "role": "user",
        "content": "给我讲个故事"
    }],
    stream=True
)

for chunk in response:
    print(chunk['result'], end="", flush=True)`
        },
        javascript: {
          install: 'npm install @baiducloud/qianfan',
          code: `import { ChatCompletion } from '@baiducloud/qianfan';

const client = new ChatCompletion({
  apiKey: 'your-access-key',
  secretKey: 'your-secret-key'
});

async function chat() {
  const response = await client.chat({
    model: 'ERNIE-Bot-4',
    messages: [
      { role: 'user', content: '你好！能帮我吗？' }
    ],
    temperature: 0.7,
    topP: 0.8
  });

  console.log(response.result);
}

chat();

// 流式响应示例
async function streamChat() {
  const response = await client.chat({
    model: 'ERNIE-Bot-4',
    messages: [
      { role: 'user', content: '给我讲个故事' }
    ],
    stream: true
  });

  for await (const chunk of response) {
    process.stdout.write(chunk.result);
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=your-access-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ERNIE-Bot-4",
    "messages": [
      {"role": "user", "content": "你好！能帮我吗？"}
    ],
    "temperature": 0.7,
    "top_p": 0.8
  }'`
        },
        java: {
          install: 'implementation "com.baidu.aip:java-sdk"',
          code: `import com.baidu.aip.chat.AipChat;
import org.json.JSONObject;

public class ErnieExample {
    public static void main(String[] args) {
        String APP_ID = "your-app-id";
        String API_KEY = "your-api-key";
        String SECRET_KEY = "your-secret-key";
        
        AipChat client = new AipChat(APP_ID, API_KEY, SECRET_KEY);

        JSONObject response = client.chat(
            "ERNIE-Bot-4",
            new JSONObject()
                .put("messages", 
                    new org.json.JSONArray()
                        .put(new JSONObject()
                            .put("role", "user")
                            .put("content", "你好！能帮我吗？")
                        )
                )
                .put("temperature", 0.7)
                .put("top_p", 0.8)
        );

        System.out.println(response.toString());
    }
}`
        }
      }
    },
    qwen: {
      name: '通义千问',
      icon: '🚀',
      provider: '阿里云',
      description: '阿里云推出的大语言模型，支持多轮对话、文本生成等功能，性能优异，适合各种应用场景。',
      features: [
        '强大的中文理解和生成',
        '支持多轮对话',
        '长文本处理能力',
        '代码生成和调试',
        '工具调用功能',
        '流式响应支持'
      ],
      pricing: {
        turbo: '免费版: 20次/分钟, Plus版: ¥0.008/千tokens'
      },
      docs: 'https://help.aliyun.com/zh/dashscope',
      quickStart: [
        {
          title: '1. 注册阿里云账号',
          content: '访问 https://www.aliyun.com/ 注册账号并完成实名认证。'
        },
        {
          title: '2. 开通 DashScope 服务',
          content: '在阿里云控制台搜索并开通 "DashScope 灵积" 服务。'
        },
        {
          title: '3. 创建 API Key',
          content: '在 DashScope 控制台创建 API Key。⚠️ 重要：API Key 只显示一次，请立即复制并妥善保管！'
        },
        {
          title: '4. 选择模型版本',
          content: 'qwen-max（最强）、qwen-plus（平衡）、qwen-turbo（最快最便宜）。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '使用环境变量存储 API Key',
          '实施密钥轮换策略',
          '使用 HTTPS 传输所有请求',
          '设置 IP 白名单限制访问',
          '为不同环境使用不同的 API Key'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制',
          '使用连接池复用 HTTP 连接',
          '批量处理请求',
          '利用 DashScope 的长文本能力'
        ],
        cost: [
          '根据任务复杂度选择合适的模型版本',
          '设置 max_tokens 控制输出长度',
          '优化 prompt 减少 token 使用',
          '监控 API 使用量和成本',
          '实现缓存机制'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统',
          '记录详细日志',
          '设置健康检查'
        ]
      },
      languages: {
        python: {
          install: 'pip install dashscope',
          code: `import dashscope

dashscope.api_key = "your-api-key"

response = dashscope.Generation.call(
    model='qwen-turbo',
    prompt='你好！能帮我吗？',
    result_format='message'
)

print(response.output.choices[0].message.content)

# 流式响应示例
responses = dashscope.Generation.call(
    model='qwen-turbo',
    prompt='给我讲个故事',
    stream=True,
    result_format='message'
)

for response in responses:
    if response.output.choices[0].message.content:
        print(response.output.choices[0].message.content, end="", flush=True)`
        },
        javascript: {
          install: 'npm install dashscope',
          code: `import { Generation } from 'dashscope';

const gen = new Generation({
  apiKey: 'your-api-key'
});

async function chat() {
  const response = await gen.call({
    model: 'qwen-turbo',
    prompt: '你好！能帮我吗？',
    resultFormat: 'message'
  });

  console.log(response.output.choices[0].message.content);
}

chat();

// 流式响应示例
async function streamChat() {
  const response = await gen.call({
    model: 'qwen-turbo',
    prompt: '给我讲个故事',
    stream: true,
    resultFormat: 'message'
  });

  for await (const chunk of response) {
    if (chunk.output.choices[0].message.content) {
      process.stdout.write(chunk.output.choices[0].message.content);
    }
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "qwen-turbo",
    "input": {
      "messages": [
        {"role": "user", "content": "你好！能帮我吗？"}
      ]
    }
  }'`
        },
        java: {
          install: 'implementation "com.alibaba.dashscope:dashscope-sdk-java"',
          code: `import com.alibaba.dashscope.aigc.generation.Generation;
import com.alibaba.dashscope.aigc.generation.GenerationParam;
import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.common.Message;
import com.alibaba.dashscope.common.Role;

public class QwenExample {
    public static void main(String[] args) {
        String apiKey = "your-api-key";
        
        Generation gen = new Generation();
        
        Message message = Message.builder()
            .role(Role.USER.getValue())
            .content("你好！能帮我吗？")
            .build();

        GenerationParam param = GenerationParam.builder()
            .apiKey(apiKey)
            .model("qwen-turbo")
            .messages(java.util.List.of(message))
            .resultFormat(GenerationParam.ResultFormat.MESSAGE)
            .build();

        GenerationResult result = gen.call(param);
        System.out.println(result.getOutput().getChoices().get(0).getMessage().getContent());
    }
}`
        }
      }
    },
    hunyuan: {
      name: '混元大模型',
      icon: '🎯',
      provider: '腾讯',
      description: '腾讯推出的多模态大模型，支持文本、图像等多种任务，应用场景广泛，性能稳定。',
      features: [
        '多模态支持',
        '强大的中文理解',
        '多轮对话能力',
        '长文本处理',
        '工具调用功能',
        '流式响应支持'
      ],
      pricing: {
        lite: '免费版: 100次/天, Pro版: ¥0.006/千tokens'
      },
      docs: 'https://cloud.tencent.com/document/product/1729',
      quickStart: [
        {
          title: '1. 注册腾讯云账号',
          content: '访问 https://cloud.tencent.com/ 注册账号并完成实名认证。'
        },
        {
          title: '2. 开通混元大模型服务',
          content: '在腾讯云控制台搜索并开通 "混元大模型" 服务。'
        },
        {
          title: '3. 获取密钥',
          content: '在访问管理 > API密钥管理页面获取 SecretId 和 SecretKey。'
        },
        {
          title: '4. 选择模型版本',
          content: 'hunyuan-pro（最强）、hunyuan-lite（最快最便宜）。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '使用环境变量存储 SecretId 和 SecretKey',
          '实施密钥轮换策略',
          '使用 HTTPS 传输所有请求',
          '设置 IP 白名单限制访问',
          '为不同环境使用不同的密钥'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制',
          '使用连接池复用 HTTP 连接',
          '批量处理请求',
          '合理设置超时时间'
        ],
        cost: [
          '根据任务复杂度选择合适的模型版本',
          '设置 max_tokens 控制输出长度',
          '优化 prompt 减少 token 使用',
          '监控 API 使用量和成本',
          '实现缓存机制'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统',
          '记录详细日志',
          '设置健康检查'
        ]
      },
      languages: {
        python: {
          install: 'pip install tencentcloud-hunyuan',
          code: `import tencentcloud.hunyuan.v20230901 as hunyuan
from tencentcloud.common import credential

cred = credential.Credential(
    "your-secret-id",
    "your-secret-key"
)

client = hunyuan.Client(cred, "ap-guangzhou")

req = hunyuan.ChatCompletionsRequest()
req.Model = "hunyuan-lite"
req.Messages = [
    {"Role": "user", "Content": "你好！能帮我吗？"}
]
req.Temperature = 0.7
req.TopP = 0.8

resp = client.ChatCompletions(req)
print(resp.Response.Choices[0].Message.Content)

# 流式响应示例
req.Stream = True
resp = client.ChatCompletions(req)
for event in resp:
    if event.data:
        print(event.data, end="", flush=True)`
        },
        javascript: {
          install: 'npm install tencentcloud-sdk-nodejs',
          code: `import tencentcloud from 'tencentcloud-sdk-nodejs';

const HunyuanClient = tencentcloud.hunyuan.v20230901.Client;

const clientConfig = {
  credential: {
    secretId: 'your-secret-id',
    secretKey: 'your-secret-key'
  },
  region: 'ap-guangzhou'
};

const client = new HunyuanClient(clientConfig);

async function chat() {
  const params = {
    Model: 'hunyuan-lite',
    Messages: [
      { Role: 'user', Content: '你好！能帮我吗？' }
    ],
    Temperature: 0.7,
    TopP: 0.8
  };

  const response = await client.ChatCompletions(params);
  console.log(response.Choices[0].Message.Content);
}

chat();

// 流式响应示例
async function streamChat() {
  const params = {
    Model: 'hunyuan-lite',
    Messages: [
      { Role: 'user', Content: '给我讲个故事' }
    ],
    Stream: true
  };

  const response = await client.ChatCompletions(params);
  for await (const chunk of response) {
    process.stdout.write(chunk.data);
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl "https://hunyuan.tencentcloudapi.com/" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: your-authorization-header" \\
  -d '{
    "Model": "hunyuan-lite",
    "Messages": [
      {"Role": "user", "Content": "你好！能帮我吗？"}
    ],
    "Temperature": 0.7,
    "TopP": 0.8
  }'`
        },
        java: {
          install: 'implementation "com.tencentcloudapi:tencentcloud-sdk-java"',
          code: `import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.hunyuan.v20230901.HunyuanClient;
import com.tencentcloudapi.hunyuan.v20230901.models.*;

public class HunyuanExample {
    public static void main(String[] args) {
        try {
            Credential cred = new Credential(
                "your-secret-id",
                "your-secret-key"
            );

            HttpProfile httpProfile = new HttpProfile();
            httpProfile.setEndpoint("hunyuan.tencentcloudapi.com");
            ClientProfile clientProfile = new ClientProfile();
            clientProfile.setHttpProfile(httpProfile);

            HunyuanClient client = new HunyuanClient(cred, "ap-guangzhou", clientProfile);

            ChatCompletionsRequest req = new ChatCompletionsRequest();
            req.setModel("hunyuan-lite");
            
            Message msg = new Message();
            msg.setRole("user");
            msg.setContent("你好！能帮我吗？");
            req.setMessages(new Message[]{msg});
            
            req.setTemperature(0.7f);
            req.setTopP(0.8f);

            ChatCompletionsResponse resp = client.ChatCompletions(req);
            System.out.println(resp.getChoices()[0].getMessage().getContent());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`
        }
      }
    },
    spark: {
      name: '讯飞星火',
      icon: '✨',
      provider: '科大讯飞',
      description: '科大讯飞推出的认知大模型，具有强大的中文理解和生成能力，支持多模态交互，在教育、医疗等领域有广泛应用。',
      features: [
        '强大的中文理解和生成能力',
        '多模态支持（文本、语音、图像）',
        '知识库问答能力',
        '长文本处理',
        '流式响应支持',
        '多轮对话能力'
      ],
      pricing: {
        lite: '免费版: 500万tokens/月, Pro版: ¥0.015/千tokens'
      },
      docs: 'https://www.xfyun.cn/doc/spark',
      quickStart: [
        {
          title: '1. 注册讯飞开放平台账号',
          content: '访问 https://www.xfyun.cn/ 注册账号并完成实名认证。'
        },
        {
          title: '2. 创建应用',
          content: '在控制台创建应用，获取 APPID、APISecret 和 APIKey。'
        },
        {
          title: '3. 激活星火认知大模型服务',
          content: '在应用管理中开通"星火认知大模型"服务。'
        },
        {
          title: '4. 选择模型版本',
          content: 'Spark Pro（最强）、Spark Lite（最快最便宜）、Spark Max（最强版本）。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '使用环境变量存储 APPID、APISecret 和 APIKey',
          '实施密钥轮换策略',
          '使用 HTTPS 传输所有请求',
          '设置 IP 白名单限制访问',
          '为不同环境使用不同的密钥'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制',
          '使用连接池复用 HTTP 连接',
          '批量处理请求',
          '合理设置超时时间'
        ],
        cost: [
          '根据任务复杂度选择合适的模型版本',
          '设置 max_tokens 控制输出长度',
          '优化 prompt 减少 token 使用',
          '监控 API 使用量和成本',
          '实现缓存机制'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统',
          '记录详细日志',
          '设置健康检查'
        ]
      },
      languages: {
        python: {
          install: 'pip install websocket-client',
          setup: '# 创建 .env 文件\nAPPID=your-app-id\nAPISecret=your-api-secret\nAPIKey=your-api-key',
          code: `import os
import json
import hashlib
import base64
import hmac
import time
import websocket
from dotenv import load_dotenv

load_dotenv()

class SparkClient:
    def __init__(self, appid=None, api_secret=None, api_key=None):
        self.appid = appid or os.getenv("APPID")
        self.api_secret = api_secret or os.getenv("APISecret")
        self.api_key = api_key or os.getenv("APIKey")
        
        if not all([self.appid, self.api_secret, self.api_key]):
            raise ValueError("APPID, APISecret, and APIKey are required")
        
        self.url = self._generate_url()
    
    def _generate_url(self):
        host = "spark-api.xf-yun.com"
        path = "/v3.5/chat"
        timestamp = str(int(time.time()))
        
        signature_origin = f"host: {host}\\ndate: {timestamp}\\nGET {path} HTTP/1.1"
        signature_sha = hmac.new(
            self.api_secret.encode('utf-8'),
            signature_origin.encode('utf-8'),
            digestmod=hashlib.sha256
        ).digest()
        signature = base64.b64encode(signature_sha).decode(encoding='utf-8')
        
        authorization_origin = f'api_key="{self.api_key}", algorithm="hmac-sha256", headers="host date request-line", signature="{signature}"'
        authorization = base64.b64encode(authorization_origin.encode('utf-8')).decode(encoding='utf-8')
        
        return f"wss://{host}{path}?authorization={authorization}&date={timestamp}&host={host}"
    
    def chat(self, messages, model="spark-pro", temperature=0.7, max_tokens=1500):
        data = {
            "header": {
                "app_id": self.appid,
                "uid": "user-001"
            },
            "parameter": {
                "chat": {
                    "domain": model,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
            },
            "payload": {
                "message": {
                    "text": messages
                }
            }
        }
        
        ws = websocket.create_connection(self.url)
        ws.send(json.dumps(data))
        
        response_text = ""
        while True:
            message = ws.recv()
            if message:
                data = json.loads(message)
                if data.get("header", {}).get("code") == 0:
                    choices = data.get("payload", {}).get("choices", {})
                    if choices.get("status") == 2:
                        ws.close()
                        break
                    text = choices.get("text", [])
                    if text:
                        response_text += text[0].get("content", "")
        
        return response_text
    
    def stream_chat(self, messages, model="spark-pro", temperature=0.7, max_tokens=1500):
        data = {
            "header": {
                "app_id": self.appid,
                "uid": "user-001"
            },
            "parameter": {
                "chat": {
                    "domain": model,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
            },
            "payload": {
                "message": {
                    "text": messages
                }
            }
        }
        
        ws = websocket.create_connection(self.url)
        ws.send(json.dumps(data))
        
        while True:
            message = ws.recv()
            if message:
                data = json.loads(message)
                if data.get("header", {}).get("code") == 0:
                    choices = data.get("payload", {}).get("choices", {})
                    if choices.get("status") == 2:
                        ws.close()
                        break
                    text = choices.get("text", [])
                    if text:
                        yield text[0].get("content", "")

if __name__ == "__main__":
    client = SparkClient()
    
    messages = [
        {"role": "user", "content": "你好！请帮我写一个Python函数来计算斐波那契数列。"}
    ]
    
    response = client.chat(messages, model="spark-pro")
    print("Response:", response)
    
    print("\\n流式响应:")
    for chunk in client.stream_chat(
        messages=[{"role": "user", "content": "给我讲一个简短的故事"}],
        model="spark-lite"
    ):
        print(chunk, end="", flush=True)
    print()`
        },
        javascript: {
          install: 'npm install ws crypto-js',
          setup: '// 创建 .env 文件\nAPPID=your-app-id\nAPISecret=your-api-secret\nAPIKey=your-api-key',
          code: `const WebSocket = require('ws');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

class SparkClient {
  constructor(appid, apiSecret, apiKey) {
    this.appid = appid;
    this.apiSecret = apiSecret;
    this.apiKey = apiKey;
    this.url = this.generateUrl();
  }

  generateUrl() {
    const host = 'spark-api.xf-yun.com';
    const path = '/v3.5/chat';
    const timestamp = Math.floor(Date.now() / 1000);

    const signatureOrigin = 'host: ' + host + '\\ndate: ' + timestamp + '\\nGET ' + path + ' HTTP/1.1';
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.apiSecret).toString(CryptoJS.enc.Base64);
    const authorizationOrigin = 'api_key="' + this.apiKey + '", algorithm="hmac-sha256", headers="host date request-line", signature="' + signatureSha + '"';
    const authorization = Buffer.from(authorizationOrigin).toString('base64');

    return 'wss://' + host + path + '?authorization=' + authorization + '&date=' + timestamp + '&host=' + host;
  }

  async chat(messages, model = 'spark-pro', temperature = 0.7, maxTokens = 1500) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this.url);

      const data = {
        header: {
          app_id: this.appid,
          uid: 'user-001'
        },
        parameter: {
          chat: {
            domain: model,
            temperature: temperature,
            max_tokens: maxTokens
          }
        },
        payload: {
          message: {
            text: messages
          }
        }
      };

      let responseText = '';

      ws.on('open', () => {
        ws.send(JSON.stringify(data));
      });

      ws.on('message', (data) => {
        const parsed = JSON.parse(data);
        if (parsed.header?.code === 0) {
          const choices = parsed.payload?.choices;
          if (choices?.status === 2) {
            ws.close();
            resolve(responseText);
          }
          const text = choices?.text;
          if (text?.[0]?.content) {
            responseText += text[0].content;
          }
        }
      });

      ws.on('error', reject);
      ws.on('close', () => {
        resolve(responseText);
      });
    });
  }

  async* streamChat(messages, model = 'spark-pro', temperature = 0.7, maxTokens = 1500) {
    const ws = new WebSocket(this.url);
    const chunks = [];
    let isComplete = false;

    const data = {
      header: {
        app_id: this.appid,
        uid: 'user-001'
      },
      parameter: {
        chat: {
          domain: model,
          temperature: temperature,
          max_tokens: maxTokens
        }
      },
      payload: {
        message: {
          text: messages
        }
      }
    };

    ws.on('open', () => {
      ws.send(JSON.stringify(data));
    });

    ws.on('message', (data) => {
      const parsed = JSON.parse(data);
      if (parsed.header?.code === 0) {
        const choices = parsed.payload?.choices;
        if (choices?.status === 2) {
          isComplete = true;
          ws.close();
        }
        const text = choices?.text;
        if (text?.[0]?.content) {
          chunks.push(text[0].content);
        }
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      isComplete = true;
    });

    while (!isComplete || chunks.length > 0) {
      if (chunks.length > 0) {
        yield chunks.shift();
      } else if (!isComplete) {
        await new Promise(r => setTimeout(r, 10));
      } else {
        break;
      }
    }
  }
}

async function main() {
  const client = new SparkClient(
    process.env.APPID,
    process.env.APISecret,
    process.env.APIKey
  );

  const messages = [
    { role: 'user', content: '你好！请帮我写一个Python函数来计算斐波那契数列。' }
  ];

  const response = await client.chat(messages, 'spark-pro');
  console.log('Response:', response);

  console.log('\\n流式响应:');
  for await (const chunk of client.streamChat(
    [{ role: 'user', content: '给我讲一个简短的故事' }],
    'spark-lite'
  )) {
    process.stdout.write(chunk);
  }
  console.log();
}

main();`
        },
        curl: {
          install: '无需安装，使用 WebSocket 客户端',
          code: `# 讯飞星火使用 WebSocket 协议，建议使用 SDK
# 以下是简单的 WebSocket 连接示例（需要先生成授权 URL）

# 生成授权 URL 的步骤：
# 1. 获取当前时间戳
# 2. 生成签名
# 3. 构建 WebSocket URL

# 连接示例（使用 wscat）:
wscat -c "wss://spark-api.xf-yun.com/v3.5/chat?authorization=YOUR_AUTHORIZATION&date=YOUR_DATE&host=spark-api.xf-yun.com"

# 发送消息:
{
  "header": {
    "app_id": "your-app-id",
    "uid": "user-001"
  },
  "parameter": {
    "chat": {
      "domain": "spark-pro",
      "temperature": 0.7,
      "max_tokens": 1500
    }
  },
  "payload": {
    "message": {
      "text": [
        {"role": "user", "content": "你好！"}
      ]
    }
  }
}`
        },
        java: {
          install: 'implementation "org.java-websocket:Java-WebSocket:1.5.3"',
          setup: '// 创建 application.properties\nspark.appid=your-app-id\nspark.apiSecret=your-api-secret\nspark.apiKey=your-api-key',
          code: `import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class SparkClient {
    private String appid;
    private String apiSecret;
    private String apiKey;
    private String url;

    public SparkClient(String appid, String apiSecret, String apiKey) {
        this.appid = appid;
        this.apiSecret = apiSecret;
        this.apiKey = apiKey;
        this.url = generateUrl();
    }

    private String generateUrl() {
        String host = "spark-api.xf-yun.com";
        String path = "/v3.5/chat";
        String timestamp = String.valueOf(System.currentTimeMillis() / 1000);

        String signatureOrigin = String.format("host: %s\\ndate: %s\\nGET %s HTTP/1.1", host, timestamp, path);
        String signatureSha = hmacSHA256(signatureOrigin, apiSecret);
        String authorizationOrigin = String.format("api_key=\"%s\", algorithm=\"hmac-sha256\", headers=\"host date request-line\", signature=\"%s\"", apiKey, signatureSha);
        String authorization = Base64.getEncoder().encodeToString(authorizationOrigin.getBytes(StandardCharsets.UTF_8));

        return String.format("wss://%s%s?authorization=%s&date=%s&host=%s", host, path, authorization, timestamp, host);
    }

    private String hmacSHA256(String data, String key) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String chat(String messagesJson, String model, float temperature, int maxTokens) {
        CountDownLatch latch = new CountDownLatch(1);
        StringBuilder responseBuilder = new StringBuilder();

        WebSocketClient wsClient = new WebSocketClient(URI.create(url)) {
            @Override
            public void onOpen(ServerHandshake handshakedata) {
                String payload = String.format(
                    "{\"header\":{\"app_id\":\"%s\",\"uid\":\"user-001\"},\"parameter\":{\"chat\":{\"domain\":\"%s\",\"temperature\":%f,\"max_tokens\":%d}},\"payload\":{\"message\":{\"text\":%s}}}",
                    appid, model, temperature, maxTokens, messagesJson
                );
                send(payload);
            }

            @Override
            public void onMessage(String message) {
                try {
                    Map<String, Object> data = parseJson(message);
                    Map<String, Object> header = (Map<String, Object>) data.get("header");
                    if (header != null && Integer.parseInt(header.get("code").toString()) == 0) {
                        Map<String, Object> payload = (Map<String, Object>) data.get("payload");
                        if (payload != null) {
                            Map<String, Object> choices = (Map<String, Object>) payload.get("choices");
                            if (choices != null && Integer.parseInt(choices.get("status").toString()) == 2) {
                                latch.countDown();
                            }
                            Object text = choices.get("text");
                            if (text != null) {
                                Map<String, Object> textItem = ((Map<String, Object>[]) text)[0];
                                responseBuilder.append(textItem.get("content"));
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onClose(int code, String reason, boolean remote) {
                latch.countDown();
            }

            @Override
            public void onError(Exception ex) {
                ex.printStackTrace();
                latch.countDown();
            }
        };

        wsClient.connect();
        try {
            latch.await(30, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wsClient.close();

        return responseBuilder.toString();
    }

    private Map<String, Object> parseJson(String json) {
        return new HashMap<>();
    }

    public static void main(String[] args) {
        SparkClient client = new SparkClient("your-app-id", "your-api-secret", "your-api-key");
        
        String messages = "[{\"role\":\"user\",\"content\":\"你好！请帮我写一个Python函数来计算斐波那契数列。\"}]";
        
        String response = client.chat(messages, "spark-pro", 0.7f, 1500);
        System.out.println("Response: " + response);
    }
}`
        }
      }
    },
    openclaw: {
      name: 'OpenClaw',
      icon: '🦾',
      provider: 'OpenClaw',
      description: 'OpenClaw 是一个新兴的开源大语言模型，具有强大的多语言理解和生成能力。支持多种部署方式，包括云端 API 和本地部署，为开发者提供灵活的选择。',
      features: [
        '开源免费，可自由部署',
        '强大的多语言理解能力',
        '支持多种模型规模（7B、13B、34B）',
        '本地部署保护数据隐私',
        '兼容 OpenAI API 格式',
        '流式响应支持'
      ],
      pricing: {
        cloud: '云端 API: ¥0.001/千tokens, 本地部署: 完全免费'
      },
      docs: 'https://docs.openclaw.ai',
      quickStart: [
        {
          title: '1. 选择部署方式',
          content: 'OpenClaw 支持两种部署方式：云端 API（快速开始）和本地部署（数据隐私保护）。'
        },
        {
          title: '2. 云端 API 部署',
          content: '访问 https://api.openclaw.ai 注册账号，创建应用并获取 API Key。'
        },
        {
          title: '3. 本地部署',
          content: '下载 OpenClaw 模型文件，使用 Docker 或 Python 部署到本地服务器。'
        },
        {
          title: '4. 选择模型版本',
          content: 'openclaw-7b（最快）、openclaw-13b（平衡）、openclaw-34b（最强）。'
        },
        {
          title: '5. 安装 SDK',
          content: '根据你的编程语言安装对应的 SDK。'
        }
      ],
      productionTips: {
        security: [
          '使用环境变量存储 API Key',
          '本地部署时设置访问控制',
          '实施密钥轮换策略',
          '使用 HTTPS 传输所有请求',
          '为不同环境使用不同的 API Key'
        ],
        performance: [
          '使用流式响应提升用户体验',
          '实现请求重试机制',
          '本地部署时使用 GPU 加速',
          '批量处理请求',
          '合理设置超时时间'
        ],
        cost: [
          '根据任务复杂度选择合适的模型版本',
          '本地部署可完全免费使用',
          '设置 max_tokens 控制输出长度',
          '优化 prompt 减少 token 使用',
          '实现缓存机制'
        ],
        reliability: [
          '实现错误处理和降级策略',
          '设置速率限制',
          '使用队列系统',
          '记录详细日志',
          '设置健康检查'
        ]
      },
      languages: {
        python: {
          install: 'pip install openclaw python-dotenv',
          setup: '# 创建 .env 文件\nOPENCLAW_API_KEY=your-api-key-here\nOPENCLAW_BASE_URL=https://api.openclaw.ai/v1',
          code: `import os
from openclaw import OpenClawClient
from dotenv import load_dotenv
import time
from typing import Optional, List, Dict, Any
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class OpenClawClientWrapper:
    def __init__(
        self,
        api_key: Optional[str] = None,
        base_url: Optional[str] = None,
        max_retries: int = 3,
        timeout: int = 60
    ):
        self.api_key = api_key or os.getenv("OPENCLAW_API_KEY")
        self.base_url = base_url or os.getenv("OPENCLAW_BASE_URL", "https://api.openclaw.ai/v1")
        self.max_retries = max_retries
        self.timeout = timeout
        
        if not self.api_key:
            raise ValueError("API Key is required")
        
        self.client = OpenClawClient(
            api_key=self.api_key,
            base_url=self.base_url,
            timeout=self.timeout,
            max_retries=max_retries
        )
    
    def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "openclaw-7b",
        temperature: float = 0.7,
        max_tokens: int = 1500,
        stream: bool = False,
        **kwargs
    ) -> Any:
        for attempt in range(self.max_retries):
            try:
                logger.info(f"Sending request to {model}, attempt {attempt + 1}")
                
                response = self.client.chat(
                    model=model,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                    stream=stream,
                    **kwargs
                )
                
                if stream:
                    return response
                else:
                    return response.choices[0].message.content
                    
            except Exception as e:
                logger.error(f"Attempt {attempt + 1} failed: {str(e)}")
                
                if attempt == self.max_retries - 1:
                    raise
                
                wait_time = (2 ** attempt) * 1
                logger.info(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
    
    def stream_chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "openclaw-7b",
        **kwargs
    ):
        try:
            stream = self.chat_completion(
                messages=messages,
                model=model,
                stream=True,
                **kwargs
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            logger.error(f"Stream error: {str(e)}")
            raise

if __name__ == "__main__":
    client = OpenClawClientWrapper()
    
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello! Can you help me?"}
    ]
    
    response = client.chat_completion(
        messages=messages,
        model="openclaw-7b",
        temperature=0.3,
        max_tokens=1000
    )
    
    print("Response:", response)
    
    print("\\n流式响应:")
    for chunk in client.stream_chat_completion(
        messages=[{"role": "user", "content": "Tell me a story"}],
        model="openclaw-7b"
    ):
        print(chunk, end="", flush=True)
    print()

# 本地部署示例（使用 Hugging Face Transformers）
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class LocalOpenClaw:
    def __init__(self, model_name: str = "openclaw/openclaw-7b"):
        logger.info(f"Loading model: {model_name}")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None
        )
        logger.info("Model loaded successfully")
    
    def generate(
        self,
        prompt: str,
        max_length: int = 200,
        temperature: float = 0.7,
        top_p: float = 0.9
    ) -> str:
        inputs = self.tokenizer(prompt, return_tensors="pt")
        
        if torch.cuda.is_available():
            inputs = {k: v.cuda() for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                top_p=top_p,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response[len(prompt):]

if __name__ == "__main__":
    local_client = LocalOpenClaw()
    
    prompt = "Hello! Can you help me?"
    response = local_client.generate(prompt, max_length=150)
    print("Response:", response)`
        },
        javascript: {
          install: 'npm install openclaw dotenv',
          setup: '// 创建 .env 文件\nOPENCLAW_API_KEY=your-api-key-here\nOPENCLAW_BASE_URL=https://api.openclaw.ai/v1',
          code: `require('dotenv').config();
const { OpenClawClient } = require('openclaw');

class OpenClawClientWrapper {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.OPENCLAW_API_KEY;
    this.baseUrl = options.baseUrl || process.env.OPENCLAW_BASE_URL || 'https://api.openclaw.ai/v1';
    this.maxRetries = options.maxRetries || 3;
    this.timeout = options.timeout || 60000;
    
    if (!this.apiKey) {
      throw new Error('API Key is required');
    }
    
    this.client = new OpenClawClient({
      apiKey: this.apiKey,
      baseUrl: this.baseUrl,
      timeout: this.timeout,
      maxRetries: this.maxRetries
    });
  }
  
  async chatCompletion(messages, options = {}) {
    const {
      model = 'openclaw-7b',
      temperature = 0.7,
      maxTokens = 1500,
      stream = false,
      ...kwargs
    } = options;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        console.log('Sending request to ' + model + ', attempt ' + (attempt + 1));
        
        const response = await this.client.chat({
          model,
          messages,
          temperature,
          maxTokens,
          stream,
          ...kwargs
        });
        
        if (stream) {
          return response;
        } else {
          return response.choices[0].message.content;
        }
      } catch (error) {
        console.error('Attempt ' + (attempt + 1) + ' failed:', error.message);
        
        if (attempt === this.maxRetries - 1) {
          throw error;
        }
        
        const waitTime = Math.pow(2, attempt) * 1000;
        console.log('Retrying in ' + waitTime + 'ms...');
        await this.sleep(waitTime);
      }
    }
  }
  
  async* streamChatCompletion(messages, options = {}) {
    try {
      const stream = await this.chatCompletion(messages, {
        ...options,
        stream: true
      });
      
      for await (const chunk of stream) {
        if (chunk.choices[0]?.delta?.content) {
          yield chunk.choices[0].delta.content;
        }
      }
    } catch (error) {
      console.error('Stream error:', error);
      throw error;
    }
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function main() {
  const client = new OpenClawClientWrapper();
  
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello! Can you help me?' }
  ];
  
  const response = await client.chatCompletion(messages, {
    model: 'openclaw-7b',
    temperature: 0.3,
    maxTokens: 1000
  });
  
  console.log('Response:', response);
  
  console.log('\\n流式响应:');
  for await (const chunk of client.streamChatCompletion(
    [{ role: 'user', content: 'Tell me a story' }],
    { model: 'openclaw-7b' }
  )) {
    process.stdout.write(chunk);
  }
  console.log();
}

main();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          setup: '# 设置环境变量\nexport OPENCLAW_API_KEY="your-api-key-here"\nexport OPENCLAW_BASE_URL="https://api.openclaw.ai/v1"',
          code: `# OpenClaw API 兼容 OpenAI API 格式

# 基础请求示例
curl -X POST "$OPENCLAW_BASE_URL/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENCLAW_API_KEY" \\
  -d '{
    "model": "openclaw-7b",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello! Can you help me?"}
    ],
    "temperature": 0.7,
    "max_tokens": 150
  }'

# 流式响应示例
curl -X POST "$OPENCLAW_BASE_URL/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENCLAW_API_KEY" \\
  -d '{
    "model": "openclaw-7b",
    "messages": [
      {"role": "user", "content": "Tell me a story"}
    ],
    "stream": true,
    "temperature": 0.7,
    "max_tokens": 500
  }'

# 带重试机制的脚本示例
#!/bin/bash

API_KEY="$OPENCLAW_API_KEY"
BASE_URL="$OPENCLAW_BASE_URL"
MAX_RETRIES=3
RETRY_DELAY=2

make_request() {
  local attempt=1
  local messages="$1"
  
  while [ $attempt -le $MAX_RETRIES ]; do
    echo "Attempt $attempt..."
    
    response=$(curl -s -X POST "$BASE_URL/chat/completions" \\
      -H "Content-Type: application/json" \\
      -H "Authorization: Bearer $API_KEY" \\
      -d "$messages" \\
      -w "\\n%{http_code}")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
      echo "$body" | jq -r '.choices[0].message.content'
      return 0
    fi
    
    echo "Request failed with HTTP code: $http_code"
    
    if [ $attempt -lt $MAX_RETRIES ]; then
      echo "Retrying in $RETRY_DELAY s..."
      sleep $RETRY_DELAY
    fi
    
    attempt=$((attempt + 1))
  done
  
  echo "Max retries reached. Giving up."
  return 1
}

# 使用示例
messages='{
  "model": "openclaw-7b",
  "messages": [
    {"role": "user", "content": "Hello! Can you help me?"}
  ],
  "temperature": 0.7,
  "max_tokens": 150
}'

make_request "$messages"`
        },
        java: {
          install: 'implementation "ai.openclaw:openclaw-java-sdk"',
          setup: '// 创建 application.properties\nopenclaw.apiKey=your-api-key-here\nopenclaw.baseUrl=https://api.openclaw.ai/v1',
          code: `import ai.openclaw.OpenClawClient;
import ai.openclaw.models.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.io.IOException;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.InputStream;

public class OpenClawClientWrapper {
    private String apiKey;
    private String baseUrl;
    private OpenClawClient client;
    private int maxRetries;
    private long retryDelay;

    public OpenClawClientWrapper() {
        this.loadConfig();
        this.client = new OpenClawClient(this.apiKey);
        this.maxRetries = 3;
        this.retryDelay = 2000;
    }

    private void loadConfig() {
        try (InputStream input = new FileInputStream("application.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            this.apiKey = prop.getProperty("openclaw.apiKey");
            this.baseUrl = prop.getProperty("openclaw.baseUrl", "https://api.openclaw.ai/v1");
            
            if (this.apiKey == null || this.apiKey.isEmpty()) {
                throw new RuntimeException("API Key is required");
            }
        } catch (IOException ex) {
            throw new RuntimeException("Failed to load configuration", ex);
        }
    }

    public String chatCompletion(List<Message> messages, String model, 
                                float temperature, int maxTokens) {
        for (int attempt = 0; attempt < maxRetries; attempt++) {
            try {
                System.out.println("Sending request to " + model + ", attempt " + (attempt + 1));
                
                ChatRequest request = new ChatRequest();
                request.setModel(model);
                request.setTemperature(temperature);
                request.setMaxTokens(maxTokens);
                request.setMessages(messages);
                
                ChatResponse response = client.chat(request);
                return response.getChoices().get(0).getMessage().getContent();
                
            } catch (Exception e) {
                System.err.println("Attempt " + (attempt + 1) + " failed: " + e.getMessage());
                
                if (attempt == maxRetries - 1) {
                    throw new RuntimeException("Max retries reached", e);
                }
                
                try {
                    long delay = (long) (retryDelay * Math.pow(2, attempt));
                    System.out.println("Retrying in " + delay + "ms...");
                    TimeUnit.MILLISECONDS.sleep(delay);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Interrupted during retry", ie);
                }
            }
        }
        throw new RuntimeException("Failed to complete request");
    }

    public List<String> streamChatCompletion(List<Message> messages, String model,
                                             float temperature, int maxTokens) {
        List<String> chunks = new ArrayList<>();
        
        try {
            ChatRequest request = new ChatRequest();
            request.setModel(model);
            request.setTemperature(temperature);
            request.setMaxTokens(maxTokens);
            request.setMessages(messages);
            request.setStream(true);
            
            ChatResponse response = client.chat(request);
            
            for (Chunk chunk : response.getChunks()) {
                if (chunk.getChoices() != null && !chunk.getChoices().isEmpty()) {
                    String content = chunk.getChoices().get(0).getDelta().getContent();
                    if (content != null && !content.isEmpty()) {
                        chunks.add(content);
                    }
                }
            }
            
        } catch (Exception e) {
            System.err.println("Stream error: " + e.getMessage());
            throw new RuntimeException("Stream failed", e);
        }
        
        return chunks;
    }

    public static void main(String[] args) {
        OpenClawClientWrapper client = new OpenClawClientWrapper();
        
        List<Message> messages = new ArrayList<>();
        messages.add(new Message("system", "You are a helpful assistant."));
        messages.add(new Message("user", "Hello! Can you help me?"));
        
        try {
            String response = client.chatCompletion(
                messages, 
                "openclaw-7b", 
                0.7f, 
                1500
            );
            
            System.out.println("Response: " + response);
            
            System.out.println("\\n流式响应:");
            List<String> streamChunks = client.streamChatCompletion(
                Arrays.asList(new Message("user", "Tell me a story")),
                "openclaw-7b",
                0.7f,
                500
            );
            
            for (String chunk : streamChunks) {
                System.out.print(chunk);
            }
            System.out.println();
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`
        }
      }
    }
  };

  const model = modelData[modelId];

  if (!model) {
    return (
      <div className="model-detail">
        <div className="container">
          <div className="not-found">
            <h1>模型未找到</h1>
            <Link to="/" className="back-link">返回首页</Link>
          </div>
        </div>
      </div>
    );
  }

  const activeLanguageData = model.languages[activeLanguage];

  return (
    <div className="model-detail">
      <div className="container">
        <Link to="/" className="back-link">← 返回首页</Link>
        
        <div className="model-header">
          <div className="model-badge-large">
            <span className="badge-icon-large">{model.icon}</span>
            <div className="badge-info-large">
              <h1 className="model-title-large">{model.name}</h1>
              <span className="model-provider-large">{model.provider}</span>
            </div>
          </div>
          <a href={model.docs} target="_blank" rel="noopener noreferrer" className="docs-link-large">
            查看官方文档 →
          </a>
        </div>

        <p className="model-description-large">{model.description}</p>

        <div className="features-section">
          <h2 className="section-title">核心特性</h2>
          <ul className="features-list">
            {model.features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-bullet">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="pricing-section">
          <h2 className="section-title">定价信息</h2>
          <div className="pricing-cards">
            {Object.entries(model.pricing).map(([key, value]) => (
              <div key={key} className="pricing-card">
                <h3 className="pricing-title">{key.toUpperCase()}</h3>
                <p className="pricing-value">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="steps-section-large">
          <h2 className="section-title">快速入门</h2>
          <div className="quick-steps">
            {model.quickStart && model.quickStart.map((step, index) => (
              <div key={index} className="quick-step-card">
                <h3 className="quick-step-title">{step.title}</h3>
                <p className="quick-step-content">{step.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="integration-section">
          <h2 className="section-title">代码示例</h2>
          
          <div className="language-tabs">
            {Object.keys(model.languages).map((lang) => (
              <button
                key={lang}
                className={`language-tab ${activeLanguage === lang ? 'active' : ''}`}
                onClick={() => setActiveLanguage(lang)}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          <div className="code-container">
            <div className="code-header-large">
              <span className="install-command">
                <span className="install-label">安装:</span>
                <code>{activeLanguageData.install}</code>
              </span>
              <button 
                className="copy-button-large"
                onClick={() => navigator.clipboard.writeText(activeLanguageData.code)}
              >
                复制代码
              </button>
            </div>
            {activeLanguageData.setup && (
              <div className="setup-block">
                <span className="setup-label">环境配置:</span>
                <pre><code>{activeLanguageData.setup}</code></pre>
              </div>
            )}
            <pre className="code-block-large">
              <code>{activeLanguageData.code}</code>
            </pre>
          </div>
        </div>

        {model.productionTips && (
          <div className="production-tips-section">
            <h2 className="section-title">生产环境最佳实践</h2>
            
            <div className="tips-category">
              <h3>🔒 安全性</h3>
              <ul>
                {model.productionTips.security.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="tips-category">
              <h3>⚡ 性能优化</h3>
              <ul>
                {model.productionTips.performance.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="tips-category">
              <h3>💰 成本控制</h3>
              <ul>
                {model.productionTips.cost.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="tips-category">
              <h3>🛡️ 可靠性</h3>
              <ul>
                {model.productionTips.reliability.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelDetail;
