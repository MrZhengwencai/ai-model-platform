import { useState, useEffect, useRef } from 'react';
import './StreamOutput.css';

function StreamOutput() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [speed, setSpeed] = useState(30);
  const streamRef = useRef(null);

  const sampleText = `人工智能（Artificial Intelligence，简称AI）是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。

该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大。

流式输出是AI应用中的重要特性，它可以让用户实时看到AI的生成过程，提升用户体验。通过逐字或逐句地显示内容，用户可以更早地获得部分信息，减少等待的焦虑感。`;

  const startStreaming = () => {
    setIsStreaming(true);
    setStreamedText('');
    let index = 0;
    const chars = sampleText.split('');

    streamRef.current = setInterval(() => {
      if (index < chars.length) {
        setStreamedText(prev => prev + chars[index]);
        index++;
      } else {
        clearInterval(streamRef.current);
        setIsStreaming(false);
      }
    }, speed);
  };

  const stopStreaming = () => {
    if (streamRef.current) {
      clearInterval(streamRef.current);
      setIsStreaming(false);
    }
  };

  const resetStream = () => {
    stopStreaming();
    setStreamedText('');
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        clearInterval(streamRef.current);
      }
    };
  }, []);

  return (
    <div className="stream-output">
      <div className="stream-header">
        <h3>⚡ 流式输出组件</h3>
        <p className="stream-subtitle">模拟AI实时生成内容的效果</p>
      </div>

      <div className="stream-controls">
        <div className="control-group">
          <label className="control-label">输出速度:</label>
          <input
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="speed-slider"
          />
          <span className="speed-value">{speed}ms</span>
        </div>
        <div className="button-group">
          <button 
            className="stream-button primary" 
            onClick={startStreaming}
            disabled={isStreaming}
          >
            开始流式输出
          </button>
          <button 
            className="stream-button secondary" 
            onClick={stopStreaming}
            disabled={!isStreaming}
          >
            暂停
          </button>
          <button 
            className="stream-button danger" 
            onClick={resetStream}
          >
            重置
          </button>
        </div>
      </div>

      <div className="stream-content">
        <div className="stream-status">
          <span className={`status-dot ${isStreaming ? 'active' : ''}`}></span>
          <span className="status-text">
            {isStreaming ? '正在生成...' : '等待开始'}
          </span>
        </div>
        <div className="stream-text">
          {streamedText || <span className="placeholder">点击"开始流式输出"查看效果...</span>}
          {isStreaming && <span className="cursor">|</span>}
        </div>
        <div className="stream-stats">
          <div className="stat-item">
            <span className="stat-label">字符数:</span>
            <span className="stat-value">{streamedText.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">进度:</span>
            <span className="stat-value">
              {((streamedText.length / sampleText.length) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreamOutput;
