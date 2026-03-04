import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="particles"></div>
      <div className="particles"></div>
      <div className="particles"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">AI Powered</div>
            <h1 className="hero-title">
              <span className="gradient-text">大模型接入</span>
              <span className="glitch-text" data-text="平台">平台</span>
            </h1>
            <p className="hero-description">
              汇集全球主流大语言模型，提供详细的接入文档和代码示例。
              <span className="highlight">GPT、Claude、Gemini、文心一言</span>等，轻松集成到您的应用中。
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">主流模型</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">代码示例</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">编程语言</div>
              </div>
            </div>
            <div className="hero-buttons">
              <button className="primary-button">
                <span className="button-text">查看接入方法</span>
                <span className="button-glow"></span>
              </button>
              <button className="secondary-button">
                <span className="button-text">快速开始</span>
                <span className="button-glow"></span>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ai-brain">
              <div className="brain-core"></div>
              <div className="brain-ring"></div>
              <div className="brain-ring"></div>
              <div className="brain-particles">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="particle" style={{ '--i': i }}></div>
                ))}
              </div>
            </div>
            <div className="code-display">
              <div className="code-header">
                <div className="code-dot red"></div>
                <div className="code-dot yellow"></div>
                <div className="code-dot green"></div>
              </div>
              <div className="code-content">
                <div className="code-line">
                  <span className="code-keyword">import</span>
                  <span className="code-module">AI</span>
                  <span className="code-keyword">from</span>
                  <span className="code-string">'model-hub'</span>
                </div>
                <div className="code-line">
                  <span className="code-keyword">const</span>
                  <span className="code-variable">model</span>
                  <span className="code-operator">=</span>
                  <span className="code-keyword">new</span>
                  <span className="code-class">AIModel</span>
                  <span className="code-punctuation">()</span>
                </div>
                <div className="code-line">
                  <span className="code-variable">model</span>
                  <span className="code-punctuation">.</span>
                  <span className="code-method">connect</span>
                  <span className="code-punctuation">(</span>
                  <span className="code-string">'gpt-4'</span>
                  <span className="code-punctuation">)</span>
                </div>
                <div className="code-line">
                  <span className="code-keyword">await</span>
                  <span className="code-variable">model</span>
                  <span className="code-punctuation">.</span>
                  <span className="code-method">generate</span>
                  <span className="code-punctuation">(</span>
                  <span className="code-string">'Hello AI!'</span>
                  <span className="code-punctuation">)</span>
                  <span className="code-cursor">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;