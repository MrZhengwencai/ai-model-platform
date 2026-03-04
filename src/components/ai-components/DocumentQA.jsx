import { useState } from 'react';
import './DocumentQA.css';

function DocumentQA() {
  const [documents, setDocuments] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newDoc = {
          id: Date.now(),
          name: file.name,
          type: file.type,
          size: (file.size / 1024).toFixed(2) + ' KB',
          content: event.target.result
        };
        setDocuments([...documents, newDoc]);
      };
      reader.readAsText(file);
    }
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleAskQuestion = () => {
    if (!question.trim() || documents.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newAnswer = {
        id: Date.now(),
        question: question,
        answer: `基于您上传的文档，这是一个模拟的回答。\n\n在实际情况中，系统会：\n1. 分析文档内容\n2. 提取相关信息\n3. 生成准确的答案\n\n文档来源：${documents.map(d => d.name).join(', ')}`,
        sources: documents.slice(0, 2).map(doc => ({
          name: doc.name,
          excerpt: doc.content.substring(0, 100) + '...'
        })),
        timestamp: new Date().toLocaleString()
      };
      setAnswers([newAnswer, ...answers]);
      setQuestion('');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="document-qa">
      <div className="qa-header">
        <h3>📚 文档问答组件</h3>
        <p className="qa-subtitle">上传文档并进行智能问答</p>
      </div>

      <div className="qa-layout">
        <div className="qa-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">已上传文档</span>
            <span className="sidebar-count">{documents.length}</span>
          </div>

          <div className="upload-area">
            <input
              type="file"
              accept=".txt,.md,.json,.csv"
              onChange={handleFileUpload}
              className="file-input"
              id="doc-upload"
            />
            <label htmlFor="doc-upload" className="upload-button">
              <span className="upload-icon">📄</span>
              <span className="upload-text">上传文档</span>
            </label>
          </div>

          <div className="documents-list">
            {documents.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📂</span>
                <span className="empty-text">暂无文档</span>
                <span className="empty-hint">上传文档开始问答</span>
              </div>
            ) : (
              documents.map(doc => (
                <div key={doc.id} className="document-item">
                  <div className="doc-icon">📄</div>
                  <div className="doc-info">
                    <span className="doc-name">{doc.name}</span>
                    <span className="doc-meta">{doc.size}</span>
                  </div>
                  <button 
                    className="remove-doc-btn"
                    onClick={() => removeDocument(doc.id)}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="qa-main">
          <div className="question-area">
            <div className="question-header">
              <span className="question-title">提问</span>
            </div>
            <textarea
              className="question-input"
              placeholder="输入您的问题..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              disabled={documents.length === 0}
            />
            <button 
              className="ask-button"
              onClick={handleAskQuestion}
              disabled={!question.trim() || documents.length === 0 || isProcessing}
            >
              {isProcessing ? '思考中...' : '提问'}
            </button>
          </div>

          <div className="answers-area">
            <div className="answers-header">
              <span className="answers-title">问答历史</span>
              <span className="answers-count">{answers.length}</span>
            </div>

            {answers.length === 0 ? (
              <div className="empty-answers">
                <span className="empty-icon">💬</span>
                <span className="empty-text">暂无问答记录</span>
                <span className="empty-hint">上传文档并提问开始使用</span>
              </div>
            ) : (
              <div className="answers-list">
                {answers.map(answer => (
                  <div key={answer.id} className="answer-item">
                    <div className="answer-question">
                      <span className="q-label">Q:</span>
                      <span className="q-text">{answer.question}</span>
                    </div>
                    <div className="answer-content">
                      <span className="a-label">A:</span>
                      <div className="a-text">{answer.answer}</div>
                    </div>
                    <div className="answer-sources">
                      <span className="sources-label">📎 引用来源:</span>
                      <div className="sources-list">
                        {answer.sources.map((source, index) => (
                          <div key={index} className="source-item">
                            <span className="source-name">{source.name}</span>
                            <span className="source-excerpt">{source.excerpt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="answer-footer">
                      <span className="answer-time">{answer.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentQA;
