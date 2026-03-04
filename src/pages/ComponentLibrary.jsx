import { useState, Suspense } from 'react';
import ChatComponent from '../components/ai-components/ChatComponent';
import StreamOutput from '../components/ai-components/StreamOutput';
import PromptEditor from '../components/ai-components/PromptEditor';
import MultimodalInput from '../components/ai-components/MultimodalInput';
import ChainOfThought from '../components/ai-components/ChainOfThought';
import DocumentQA from '../components/ai-components/DocumentQA';
import VoiceRecognition from '../components/ai-components/VoiceRecognition';
import ImageGeneration from '../components/ai-components/ImageGeneration';
import CodeCompletion from '../components/ai-components/CodeCompletion';
import SentimentAnalysis from '../components/ai-components/SentimentAnalysis';
import KnowledgeGraph from '../components/ai-components/KnowledgeGraph';
import SmartRecommendation from '../components/ai-components/SmartRecommendation';
import './ComponentLibrary.css';

function ComponentError({ error }) {
  return (
    <div style={{ padding: '2rem', color: '#ff6464', textAlign: 'center' }}>
      <h3>组件加载错误</h3>
      <p>{error?.message || '未知错误'}</p>
    </div>
  );
}

function ComponentLibrary() {
  const [activeComponent, setActiveComponent] = useState('chat');

  const components = [
    { id: 'chat', name: '聊天对话', icon: '💬', component: ChatComponent },
    { id: 'stream', name: '流式输出', icon: '⚡', component: StreamOutput },
    { id: 'prompt', name: '提示词编辑器', icon: '📝', component: PromptEditor },
    { id: 'multimodal', name: '多模态输入', icon: '🎨', component: MultimodalInput },
    { id: 'cot', name: '思维链展示', icon: '🧠', component: ChainOfThought },
    { id: 'qa', name: '文档问答', icon: '📚', component: DocumentQA },
    { id: 'voice', name: '语音识别', icon: '🎤', component: VoiceRecognition },
    { id: 'image', name: '图像生成', icon: '🖼️', component: ImageGeneration },
    { id: 'code', name: '代码补全', icon: '💻', component: CodeCompletion },
    { id: 'sentiment', name: '情感分析', icon: '😊', component: SentimentAnalysis },
    { id: 'knowledge', name: '知识图谱', icon: '🕸️', component: KnowledgeGraph },
    { id: 'recommend', name: '智能推荐', icon: '🎯', component: SmartRecommendation }
  ];

  const ActiveComponent = components.find(c => c.id === activeComponent)?.component;

  return (
    <div className="component-library">
      <div className="library-header">
        <h1>🧩 AI 组件库</h1>
        <p className="library-subtitle">专为AI应用设计的前端组件，开箱即用</p>
      </div>

      <div className="library-layout">
        <div className="library-sidebar">
          <h2 className="sidebar-title">组件列表</h2>
          <div className="component-nav">
            {components.map(comp => (
              <button
                key={comp.id}
                className={`nav-item ${activeComponent === comp.id ? 'active' : ''}`}
                onClick={() => setActiveComponent(comp.id)}
              >
                <span className="nav-icon">{comp.icon}</span>
                <span className="nav-name">{comp.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="library-main">
          <Suspense fallback={<div style={{ padding: '2rem', color: '#808080' }}>加载中...</div>}>
            {ActiveComponent && <ActiveComponent />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ComponentLibrary;
