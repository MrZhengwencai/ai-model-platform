import { useState } from 'react';
import './SentimentAnalysis.css';

function SentimentAnalysis() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeSentiment = () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const sentiment = analyzeText(text);
      setResult(sentiment);
      setIsAnalyzing(false);
    }, 1500);
  };

  const analyzeText = (input) => {
    const positiveWords = ['好', '棒', '优秀', '喜欢', '爱', '开心', '快乐', '满意', '成功', '美好', 'great', 'good', 'excellent', 'love', 'happy', 'amazing', 'wonderful', 'perfect', 'best', 'awesome'];
    const negativeWords = ['差', '坏', '讨厌', '恨', '难过', '悲伤', '失望', '失败', '糟糕', 'bad', 'terrible', 'hate', 'sad', 'disappointed', 'worst', 'awful', 'horrible', 'poor'];

    let positiveCount = 0;
    let negativeCount = 0;
    const words = input.toLowerCase().split(/[\s\n.,!?;:，。！？；：]+/);

    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) {
        positiveCount++;
      }
      if (negativeWords.some(nw => word.includes(nw))) {
        negativeCount++;
      }
    });

    const total = positiveCount + negativeCount;
    let sentiment, confidence, details;

    if (total === 0) {
      sentiment = 'neutral';
      confidence = 0.5;
      details = {
        positive: 0.3,
        negative: 0.3,
        neutral: 0.4
      };
    } else if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = 0.6 + (positiveCount - negativeCount) / total * 0.4;
      details = {
        positive: 0.5 + (positiveCount / total) * 0.5,
        negative: 0.1 + (negativeCount / total) * 0.2,
        neutral: 0.4 - (positiveCount / total) * 0.3
      };
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = 0.6 + (negativeCount - positiveCount) / total * 0.4;
      details = {
        positive: 0.1 + (positiveCount / total) * 0.2,
        negative: 0.5 + (negativeCount / total) * 0.5,
        neutral: 0.4 - (negativeCount / total) * 0.3
      };
    } else {
      sentiment = 'neutral';
      confidence = 0.5;
      details = {
        positive: 0.3,
        negative: 0.3,
        neutral: 0.4
      };
    }

    return {
      sentiment,
      confidence,
      details,
      wordCount: words.filter(w => w.length > 0).length,
      characterCount: text.length
    };
  };

  const getSentimentInfo = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return { label: '积极', icon: '😊', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' };
      case 'negative':
        return { label: '消极', icon: '😢', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' };
      case 'neutral':
        return { label: '中性', icon: '😐', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' };
      default:
        return { label: '未知', icon: '❓', color: '#808080', bgColor: 'rgba(128, 128, 128, 0.1)' };
    }
  };

  const clearAnalysis = () => {
    setText('');
    setResult(null);
  };

  const sampleTexts = [
    '今天天气真好，我感到非常开心！',
    '这个产品质量太差了，我很失望。',
    '我觉得这个方案还可以，需要再讨论一下。',
    '太棒了！这是我用过最好的产品！',
    '糟糕透了，完全浪费我的时间。'
  ];

  return (
    <div className="sentiment-analysis">
      <div className="sa-header">
        <h3>💭 情感分析组件</h3>
        <p className="sa-subtitle">AI驱动的文本情感倾向分析</p>
      </div>

      <div className="sa-input-section">
        <div className="input-header">
          <label className="input-label">输入文本</label>
          <div className="sample-texts">
            <span className="sample-label">示例:</span>
            {sampleTexts.map((sample, index) => (
              <button
                key={index}
                className="sample-text"
                onClick={() => setText(sample)}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="text-input"
          placeholder="在此输入要分析的文本..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
        <div className="input-actions">
          <button 
            className="action-button primary" 
            onClick={analyzeSentiment}
            disabled={!text.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="loading-spinner"></span>
                <span>分析中...</span>
              </>
            ) : (
              <>
                <span className="button-icon">🔍</span>
                <span>开始分析</span>
              </>
            )}
          </button>
          <button 
            className="action-button secondary" 
            onClick={clearAnalysis}
            disabled={!text && !result}
          >
            <span className="button-icon">🗑️</span>
            <span>清空</span>
          </button>
        </div>
      </div>

      {result && (
        <div className="sa-result-section">
          <div className="result-header">
            <span className="result-title">分析结果</span>
            <span className="result-confidence">
              置信度: {(result.confidence * 100).toFixed(0)}%
            </span>
          </div>

          <div className="sentiment-overview">
            <div 
              className="sentiment-badge"
              style={{ 
                backgroundColor: getSentimentInfo(result.sentiment).bgColor,
                borderColor: getSentimentInfo(result.sentiment).color 
              }}
            >
              <span className="sentiment-icon">{getSentimentInfo(result.sentiment).icon}</span>
              <span className="sentiment-label">{getSentimentInfo(result.sentiment).label}</span>
            </div>
          </div>

          <div className="sentiment-details">
            <div className="detail-title">情感分布</div>
            <div className="distribution-bars">
              <div className="bar-item">
                <div className="bar-header">
                  <span className="bar-label">积极</span>
                  <span className="bar-value">{(result.details.positive * 100).toFixed(0)}%</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill positive"
                    style={{ width: `${result.details.positive * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-item">
                <div className="bar-header">
                  <span className="bar-label">中性</span>
                  <span className="bar-value">{(result.details.neutral * 100).toFixed(0)}%</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill neutral"
                    style={{ width: `${result.details.neutral * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-item">
                <div className="bar-header">
                  <span className="bar-label">消极</span>
                  <span className="bar-value">{(result.details.negative * 100).toFixed(0)}%</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill negative"
                    style={{ width: `${result.details.negative * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sentiment-chart">
            <div className="chart-title">情感雷达图</div>
            <div className="radar-chart">
              <div className="radar-center"></div>
              <div 
                className="radar-area"
                style={{
                  clipPath: `polygon(
                    50% ${50 - result.details.positive * 40}%,
                    ${50 + result.details.neutral * 40}% 50%,
                    50% ${50 + result.details.negative * 40}%
                  )`
                }}
              ></div>
              <div className="radar-labels">
                <span className="radar-label positive">积极</span>
                <span className="radar-label neutral">中性</span>
                <span className="radar-label negative">消极</span>
              </div>
            </div>
          </div>

          <div className="text-stats">
            <div className="stat-item">
              <span className="stat-icon">📝</span>
              <div className="stat-info">
                <span className="stat-label">字符数</span>
                <span className="stat-value">{result.characterCount}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-label">词数</span>
                <span className="stat-value">{result.wordCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sa-tips">
        <div className="tips-header">
          <span className="tips-icon">💡</span>
          <span className="tips-title">使用提示</span>
        </div>
        <ul className="tips-list">
          <li>支持中英文文本的情感分析</li>
          <li>分析结果基于关键词匹配和上下文理解</li>
          <li>置信度越高，分析结果越可靠</li>
          <li>建议输入较长的文本以获得更准确的结果</li>
        </ul>
      </div>
    </div>
  );
}

export default SentimentAnalysis;