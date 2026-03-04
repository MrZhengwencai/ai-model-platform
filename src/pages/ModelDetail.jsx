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
          install: 'implementation "com.anthropic:anthropic-java"',
          code: `import com.anthropic.AnthropicClient;
import com.anthropic.models.messages.*;

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
      languages: {
        python: {
          install: 'pip install openclaw',
          code: `from openclaw import OpenClawClient

client = OpenClawClient(api_key="your-api-key")

response = client.chat(
    model="openclaw-7b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello! Can you help me?"}
    ],
    temperature=0.7,
    max_tokens=150
)

print(response.choices[0].message.content)

# 流式响应示例
stream = client.chat(
    model="openclaw-7b",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)

# 本地部署示例（使用 Hugging Face Transformers）
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "openclaw/openclaw-7b"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

input_text = "Hello! Can you help me?"
inputs = tokenizer(input_text, return_tensors="pt")

outputs = model.generate(**inputs, max_length=100)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)`
        },
        javascript: {
          install: 'npm install openclaw',
          code: `import { OpenClawClient } from 'openclaw';

const client = new OpenClawClient({
  apiKey: 'your-api-key'
});

async function chat() {
  const response = await client.chat({
    model: 'openclaw-7b',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello! Can you help me?' }
    ],
    temperature: 0.7,
    maxTokens: 150
  });

  console.log(response.choices[0].message.content);
}

chat();

// 流式响应示例
async function streamChat() {
  const stream = await client.chat({
    model: 'openclaw-7b',
    messages: [
      { role: 'user', content: 'Tell me a story' }
    ],
    stream: true
  });

  for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
      process.stdout.write(chunk.choices[0].delta.content);
    }
  }
}

streamChat();`
        },
        curl: {
          install: '无需安装，使用 cURL 命令',
          code: `curl https://api.openclaw.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "model": "openclaw-7b",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello! Can you help me?"}
    ],
    "temperature": 0.7,
    "max_tokens": 150
  }'`
        },
        java: {
          install: 'implementation "ai.openclaw:openclaw-java-sdk"',
          code: `import ai.openclaw.OpenClawClient;
import ai.openclaw.models.*;

public class OpenClawExample {
    public static void main(String[] args) {
        String apiKey = "your-api-key";
        
        OpenClawClient client = new OpenClawClient(apiKey);
        
        ChatRequest request = new ChatRequest();
        request.setModel("openclaw-7b");
        request.setTemperature(0.7);
        request.setMaxTokens(150);
        
        java.util.List<Message> messages = new java.util.ArrayList<>();
        messages.add(new Message("system", "You are a helpful assistant."));
        messages.add(new Message("user", "Hello! Can you help me?"));
        request.setMessages(messages);
        
        ChatResponse response = client.chat(request);
        System.out.println(response.getChoices().get(0).getMessage().getContent());
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

        <div className="integration-section">
          <h2 className="section-title">接入方法</h2>
          
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
            <pre className="code-block-large">
              <code>{activeLanguageData.code}</code>
            </pre>
          </div>
        </div>

        <div className="steps-section-large">
          <h2 className="section-title">接入步骤</h2>
          <ol className="steps-list-large">
            <li>
              <strong>注册账号:</strong> 访问 {model.provider} 官网注册开发者账号
            </li>
            <li>
              <strong>获取 API Key:</strong> 在控制台创建应用并获取 API Key 或访问令牌
            </li>
            <li>
              <strong>安装 SDK:</strong> 根据您的编程语言安装对应的 SDK
            </li>
            <li>
              <strong>配置环境:</strong> 将 API Key 配置到您的应用环境中
            </li>
            <li>
              <strong>调用 API:</strong> 使用提供的代码示例开始调用 API
            </li>
            <li>
              <strong>测试验证:</strong> 测试接口调用是否正常，验证返回结果
            </li>
          </ol>
        </div>

        <div className="tips-section">
          <h2 className="section-title">最佳实践</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🔒 安全性</h3>
              <p>不要在前端代码中硬编码 API Key，使用环境变量或密钥管理服务</p>
            </div>
            <div className="tip-card">
              <h3>⚡ 性能优化</h3>
              <p>使用流式响应提升用户体验，合理设置 max_tokens 控制成本</p>
            </div>
            <div className="tip-card">
              <h3>🎯 参数调优</h3>
              <p>根据任务类型调整 temperature 和 top_p 参数，平衡创造性和准确性</p>
            </div>
            <div className="tip-card">
              <h3>📊 错误处理</h3>
              <p>实现完善的错误处理机制，包括重试逻辑和降级策略</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelDetail;
