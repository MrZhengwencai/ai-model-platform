import { useState } from 'react';
import './PromptEditor.css';

function PromptEditor() {
  const [prompt, setPrompt] = useState('');
  const [variables, setVariables] = useState([]);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(150);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = {
    '': '选择一个模板...',
    'code': {
      name: '代码生成',
      content: '你是一个专业的程序员。请根据以下需求生成代码：\n\n需求：\{\{需求描述\}\}\n\n要求：\n1. 代码清晰易读\n2. 添加必要的注释\n3. 考虑边界情况\n4. 提供使用示例'
    },
    'writing': {
      name: '文章写作',
      content: '你是一个专业的作家。请根据以下主题写一篇文章：\n\n主题：\{\{主题\}\}\n\n要求：\n1. 字数：\{\{字数\}\}字\n2. 风格：\{\{风格\}\}\n3. 目标读者：\{\{目标读者\}\}'
    },
    'analysis': {
      name: '数据分析',
      content: '你是一个数据分析师。请分析以下数据：\n\n数据：\{\{数据内容\}\}\n\n分析要求：\n1. 识别关键趋势\n2. 提供可视化建议\n3. 给出结论和建议'
    },
    'translation': {
      name: '文本翻译',
      content: '你是一个专业的翻译官。请将以下文本翻译成\{\{目标语言\}\}：\n\n原文：\{\{原文内容\}\}\n\n要求：\n1. 保持原文语气\n2. 确保准确性\n3. 适当调整表达方式以符合目标语言习惯'
    }
  };

  const handleTemplateChange = (e) => {
    const templateKey = e.target.value;
    setSelectedTemplate(templateKey);
    if (templateKey && templates[templateKey]) {
      setPrompt(templates[templateKey].content);
    } else {
      setPrompt('');
    }
  };

  const extractVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = text.match(regex);
    if (matches) {
      const vars = matches.map(match => match.replace(/[{}]/g, ''));
      setVariables(vars);
    } else {
      setVariables([]);
    }
  };

  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    extractVariables(value);
  };

  const insertVariable = (variable) => {
    setPrompt(prev => prev + `\{\{${variable}\}\}`);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert('提示词已复制到剪贴板！');
  };

  return (
    <div className="prompt-editor">
      <div className="editor-header">
        <h3>📝 提示词编辑器</h3>
        <p className="editor-subtitle">创建和管理AI提示词模板</p>
      </div>

      <div className="editor-toolbar">
        <div className="toolbar-group">
          <label className="toolbar-label">模板:</label>
          <select 
            className="template-select"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            {Object.entries(templates).map(([key, value]) => (
              <option key={key} value={key}>
                {typeof value === 'object' ? value.name : value}
              </option>
            ))}
          </select>
        </div>
        <button className="copy-button" onClick={copyPrompt}>
          复制提示词
        </button>
      </div>

      <div className="editor-main">
        <div className="editor-area">
          <div className="area-header">
            <span className="area-title">提示词编辑</span>
            <span className="area-info">使用 {'{'}变量名{'}'} 定义变量</span>
          </div>
          <textarea
            className="prompt-textarea"
            placeholder="在此输入提示词... 使用 {'{'}变量名{'}'} 来定义可替换的变量"
            value={prompt}
            onChange={handlePromptChange}
            rows={12}
          />
        </div>

        <div className="variables-panel">
          <div className="panel-header">
            <span className="panel-title">检测到的变量</span>
            <span className="panel-count">{variables.length}</span>
          </div>
          {variables.length > 0 ? (
            <div className="variables-list">
              {variables.map((variable, index) => (
                <div key={index} className="variable-item">
                  <span className="variable-name">{`\{\{${variable}\}\}`}</span>
                  <button 
                    className="insert-btn"
                    onClick={() => insertVariable(variable)}
                  >
                    插入
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="variables-empty">
              <span className="empty-icon">📋</span>
              <span className="empty-text">暂无变量</span>
              <span className="empty-hint">在提示词中使用 {'{'}变量名{'}'} 来定义变量</span>
            </div>
          )}
        </div>
      </div>

      <div className="editor-params">
        <div className="param-group">
          <label className="param-label">Temperature (温度):</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="param-slider"
          />
          <span className="param-value">{temperature}</span>
        </div>
        <div className="param-group">
          <label className="param-label">Max Tokens (最大长度):</label>
          <input
            type="number"
            min="1"
            max="4096"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="param-input"
          />
        </div>
      </div>

      <div className="editor-preview">
        <div className="preview-header">
          <span className="preview-title">预览</span>
        </div>
        <div className="preview-content">
          {prompt || <span className="preview-placeholder">提示词预览将显示在这里...</span>}
        </div>
      </div>
    </div>
  );
}

export default PromptEditor;
