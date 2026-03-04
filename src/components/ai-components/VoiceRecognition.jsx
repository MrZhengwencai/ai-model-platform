import { useState, useEffect, useRef } from 'react';
import './VoiceRecognition.css';

function VoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [language, setLanguage] = useState('zh-CN');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interim = '';
        let lastConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            lastConfidence = result[0].confidence;
          } else {
            interim += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          setConfidence(lastConfidence);
        }
        setInterimTranscript(interim);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert('请允许麦克风访问权限');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [language, isListening]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      setIsListening(true);
      setInterimTranscript('');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript('');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(0);
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    alert('已复制到剪贴板');
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    if (isListening) {
      stopListening();
      setTimeout(() => startListening(), 100);
    }
  };

  if (!isSupported) {
    return (
      <div className="voice-recognition">
        <div className="unsupported-message">
          <span className="error-icon">⚠️</span>
          <h3>浏览器不支持语音识别</h3>
          <p>请使用 Chrome 或 Edge 浏览器以获得最佳体验</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-recognition">
      <div className="vr-header">
        <h3>🎤 语音识别组件</h3>
        <p className="vr-subtitle">实时语音转文字，支持多种语言</p>
      </div>

      <div className="vr-controls">
        <div className="control-group">
          <label className="control-label">语言:</label>
          <select 
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="zh-CN">中文 (简体)</option>
            <option value="zh-TW">中文 (繁体)</option>
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="ja-JP">日本語</option>
            <option value="ko-KR">한국어</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
          </select>
        </div>

        <div className="button-group">
          {!isListening ? (
            <button className="vr-button primary" onClick={startListening}>
              <span className="button-icon">🎤</span>
              <span className="button-text">开始录音</span>
            </button>
          ) : (
            <button className="vr-button danger" onClick={stopListening}>
              <span className="button-icon">⏹️</span>
              <span className="button-text">停止录音</span>
            </button>
          )}
          <button className="vr-button secondary" onClick={clearTranscript}>
            <span className="button-icon">🗑️</span>
            <span className="button-text">清空</span>
          </button>
          <button className="vr-button secondary" onClick={copyTranscript}>
            <span className="button-icon">📋</span>
            <span className="button-text">复制</span>
          </button>
        </div>
      </div>

      <div className="vr-visualizer">
        <div className={`visualizer-container ${isListening ? 'active' : ''}`}>
          {isListening && (
            <>
              <div className="wave wave-1"></div>
              <div className="wave wave-2"></div>
              <div className="wave wave-3"></div>
              <div className="wave wave-4"></div>
              <div className="wave wave-5"></div>
            </>
          )}
          <div className="center-circle">
            <span className="center-icon">{isListening ? '🎙️' : '🎤'}</span>
          </div>
        </div>
      </div>

      <div className="vr-status">
        <div className="status-indicator">
          <span className={`status-dot ${isListening ? 'listening' : ''}`}></span>
          <span className="status-text">
            {isListening ? '正在聆听...' : '等待开始'}
          </span>
        </div>
        {confidence > 0 && (
          <div className="confidence-meter">
            <span className="confidence-label">置信度:</span>
            <div className="confidence-bar">
              <div 
                className="confidence-fill"
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
            <span className="confidence-value">{(confidence * 100).toFixed(0)}%</span>
          </div>
        )}
      </div>

      <div className="vr-transcript">
        <div className="transcript-header">
          <span className="transcript-title">识别结果</span>
          <span className="transcript-stats">
            {transcript.length} 字符
          </span>
        </div>
        <div className="transcript-content">
          {transcript || interimTranscript ? (
            <>
              <div className="final-text">{transcript}</div>
              {interimTranscript && (
                <div className="interim-text">{interimTranscript}</div>
              )}
            </>
          ) : (
            <div className="transcript-placeholder">
              <span className="placeholder-icon">💬</span>
              <span className="placeholder-text">点击"开始录音"开始语音识别</span>
            </div>
          )}
        </div>
      </div>

      <div className="vr-tips">
        <div className="tips-header">
          <span className="tips-icon">💡</span>
          <span className="tips-title">使用提示</span>
        </div>
        <ul className="tips-list">
          <li>确保麦克风已连接并允许浏览器访问</li>
          <li>在安静环境下使用以获得更好的识别效果</li>
          <li>说话清晰，语速适中</li>
          <li>支持实时识别，无需等待说完</li>
        </ul>
      </div>
    </div>
  );
}

export default VoiceRecognition;