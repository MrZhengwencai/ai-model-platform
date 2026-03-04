import { useState } from 'react';
import './ChainOfThought.css';

function ChainOfThought() {
  const [steps, setSteps] = useState([
    {
      id: 1,
      type: 'analysis',
      title: '问题分析',
      content: '首先理解用户的问题，识别关键信息和要求。',
      status: 'completed'
    },
    {
      id: 2,
      type: 'reasoning',
      title: '逻辑推理',
      content: '基于已知信息进行推理，建立问题之间的联系。',
      status: 'completed'
    },
    {
      id: 3,
      type: 'calculation',
      title: '计算验证',
      content: '进行必要的计算或验证，确保推理的正确性。',
      status: 'in-progress'
    },
    {
      id: 4,
      type: 'conclusion',
      title: '得出结论',
      content: '综合所有推理步骤，得出最终答案。',
      status: 'pending'
    }
  ]);

  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '⏳';
      case 'pending':
        return '⭕';
      default:
        return '❓';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'analysis':
        return '#646cff';
      case 'reasoning':
        return '#a855f7';
      case 'calculation':
        return '#22c55e';
      case 'conclusion':
        return '#f59e0b';
      default:
        return '#808080';
    }
  };

  const addStep = () => {
    const newStep = {
      id: steps.length + 1,
      type: 'reasoning',
      title: '新步骤',
      content: '添加新的推理步骤...',
      status: 'pending'
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  return (
    <div className="chain-of-thought">
      <div className="cot-header">
        <h3>🧠 思维链展示组件</h3>
        <p className="cot-subtitle">可视化AI的推理过程和思考步骤</p>
      </div>

      <div className="cot-controls">
        <button className="cot-button primary" onClick={addStep}>
          ➕ 添加步骤
        </button>
        <button className="cot-button secondary" onClick={() => setSteps([])}>
          🗑️ 清空步骤
        </button>
      </div>

      <div className="cot-steps">
        {steps.map((step, index) => (
          <div key={step.id} className={`cot-step ${step.status}`}>
            <div className="step-connector">
              {index < steps.length - 1 && <div className="connector-line"></div>}
            </div>
            <div className="step-content">
              <div className="step-header">
                <div className="step-left">
                  <span className="step-number">{step.id}</span>
                  <span className="step-icon">{getStatusIcon(step.status)}</span>
                  <span 
                    className="step-title"
                    style={{ color: getTypeColor(step.type) }}
                  >
                    {step.title}
                  </span>
                </div>
                <div className="step-actions">
                  <button 
                    className="action-btn"
                    onClick={() => toggleDetails(step.id)}
                  >
                    {showDetails[step.id] ? '收起' : '展开'}
                  </button>
                  <button 
                    className="action-btn danger"
                    onClick={() => removeStep(step.id)}
                  >
                    删除
                  </button>
                </div>
              </div>
              
              {showDetails[step.id] && (
                <div className="step-details">
                  <div className="detail-row">
                    <span className="detail-label">类型:</span>
                    <span 
                      className="detail-value"
                      style={{ color: getTypeColor(step.type) }}
                    >
                      {step.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">状态:</span>
                    <span className="detail-value">{step.status.toUpperCase()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">内容:</span>
                    <span className="detail-text">{step.content}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cot-legend">
        <span className="legend-title">状态说明:</span>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">✅</span>
            <span className="legend-text">已完成</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">⏳</span>
            <span className="legend-text">进行中</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">⭕</span>
            <span className="legend-text">待处理</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChainOfThought;
