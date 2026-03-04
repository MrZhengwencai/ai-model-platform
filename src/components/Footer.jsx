import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">ModelHub</h3>
            <p className="footer-description">
              一站式大模型接入平台，汇集全球主流大语言模型，提供详细的接入文档和代码示例，以及丰富的AI组件库。
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">快速导航</h4>
            <ul className="footer-links">
              <li><a href="/">首页</a></li>
              <li><a href="/components">组件库</a></li>
              <li><a href="#features">支持模型</a></li>
              <li><a href="#integrations">接入方法</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">支持模型</h4>
            <ul className="footer-links">
              <li><a href="#integrations">GPT 系列</a></li>
              <li><a href="#integrations">Claude 系列</a></li>
              <li><a href="#integrations">Gemini 系列</a></li>
              <li><a href="#integrations">国内模型</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">资源</h4>
            <ul className="footer-links">
              <li><a href="#">接入文档</a></li>
              <li><a href="#">API 参考</a></li>
              <li><a href="#">最佳实践</a></li>
              <li><a href="#">常见问题</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ModelHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
