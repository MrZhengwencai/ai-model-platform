import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              一站式
              <span className="gradient-text">大模型接入</span>
              平台
            </h1>
            <p className="hero-description">
              汇集全球主流大语言模型，提供详细的接入文档和代码示例。
              GPT、Claude、Gemini、文心一言等，轻松集成到您的应用中。
            </p>
            <div className="hero-buttons">
              <button className="primary-button">查看接入方法</button>
              <button className="secondary-button">快速开始</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
