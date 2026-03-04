import { useState } from 'react';
import './ImageGeneration.css';

function ImageGeneration() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const styles = [
    { id: 'realistic', name: '写实风格', icon: '📷' },
    { id: 'anime', name: '动漫风格', icon: '🎨' },
    { id: 'oil-painting', name: '油画风格', icon: '🖼️' },
    { id: 'watercolor', name: '水彩风格', icon: '💧' },
    { id: '3d', name: '3D渲染', icon: '🎮' },
    { id: 'cyberpunk', name: '赛博朋克', icon: '🤖' },
    { id: 'fantasy', name: '奇幻风格', icon: '🧙' },
    { id: 'minimalist', name: '极简主义', icon: '⬜' }
  ];

  const sizes = [
    { id: '512x512', name: '512×512', label: '小' },
    { id: '768x768', name: '768×768', label: '中' },
    { id: '1024x1024', name: '1024×1024', label: '大' },
    { id: '1024x768', name: '1024×768', label: '横屏' },
    { id: '768x1024', name: '768×1024', label: '竖屏' }
  ];

  const samplePrompts = [
    '一只可爱的猫咪在花园里玩耍，阳光明媚，细节丰富',
    '未来城市的夜景，霓虹灯闪烁，赛博朋克风格',
    '宁静的湖面，倒映着雪山，油画风格',
    '动漫风格的少女，粉色头发，梦幻背景',
    '3D渲染的机器人，金属质感，科幻场景'
  ];

  const generateImages = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const newImages = [];
      for (let i = 0; i < 4; i++) {
        newImages.push({
          id: Date.now() + i,
          url: `https://picsum.photos/seed/${Date.now() + i}/1024/1024`,
          prompt: prompt,
          style: style,
          size: size,
          timestamp: new Date().toLocaleString()
        });
      }
      setGeneratedImages(newImages);
      setIsGenerating(false);
    }, 3000);
  };

  const handlePromptSelect = (samplePrompt) => {
    setPrompt(samplePrompt);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `ai-image-${image.id}.jpg`;
    link.click();
  };

  const clearImages = () => {
    setGeneratedImages([]);
    setSelectedImage(null);
  };

  return (
    <div className="image-generation">
      <div className="ig-header">
        <h3>🎨 AI 图像生成</h3>
        <p className="ig-subtitle">输入描述，生成独特的AI艺术作品</p>
      </div>

      <div className="ig-input-section">
        <div className="prompt-group">
          <label className="prompt-label">正面提示词</label>
          <textarea
            className="prompt-textarea"
            placeholder="描述你想要生成的图像..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
          <div className="sample-prompts">
            <span className="sample-label">示例:</span>
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                className="sample-prompt"
                onClick={() => handlePromptSelect(sample)}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        <div className="prompt-group">
          <label className="prompt-label">负面提示词</label>
          <textarea
            className="prompt-textarea negative"
            placeholder="描述你不想要的内容..."
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div className="ig-settings">
        <div className="setting-group">
          <label className="setting-label">风格</label>
          <div className="style-grid">
            {styles.map(s => (
              <button
                key={s.id}
                className={`style-card ${style === s.id ? 'active' : ''}`}
                onClick={() => setStyle(s.id)}
              >
                <span className="style-icon">{s.icon}</span>
                <span className="style-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label className="setting-label">尺寸</label>
          <div className="size-grid">
            {sizes.map(s => (
              <button
                key={s.id}
                className={`size-card ${size === s.id ? 'active' : ''}`}
                onClick={() => setSize(s.id)}
              >
                <span className="size-label">{s.label}</span>
                <span className="size-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ig-actions">
        <button 
          className="ig-button primary" 
          onClick={generateImages}
          disabled={!prompt.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="loading-spinner"></span>
              <span>生成中...</span>
            </>
          ) : (
            <>
              <span className="button-icon">✨</span>
              <span>生成图像</span>
            </>
          )}
        </button>
        <button 
          className="ig-button secondary" 
          onClick={clearImages}
          disabled={generatedImages.length === 0}
        >
          <span className="button-icon">🗑️</span>
          <span>清空</span>
        </button>
      </div>

      {isGenerating && (
        <div className="ig-generating">
          <div className="generating-animation">
            <div className="pulse-circle"></div>
            <div className="pulse-circle"></div>
            <div className="pulse-circle"></div>
          </div>
          <div className="generating-text">
            <span className="generating-title">AI 正在创作...</span>
            <span className="generating-subtitle">这可能需要几秒钟</span>
          </div>
        </div>
      )}

      {generatedImages.length > 0 && (
        <div className="ig-results">
          <div className="results-header">
            <span className="results-title">生成结果</span>
            <span className="results-count">{generatedImages.length} 张图像</span>
          </div>

          <div className="images-grid">
            {generatedImages.map(image => (
              <div 
                key={image.id}
                className={`image-card ${selectedImage?.id === image.id ? 'selected' : ''}`}
                onClick={() => handleImageSelect(image)}
              >
                <div className="image-wrapper">
                  <img src={image.url} alt={image.prompt} className="generated-image" />
                  <div className="image-overlay">
                    <button 
                      className="overlay-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image);
                      }}
                    >
                      📥 下载
                    </button>
                  </div>
                </div>
                <div className="image-info">
                  <span className="image-style">{styles.find(s => s.id === image.style)?.name}</span>
                  <span className="image-size">{image.size}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedImage && (
            <div className="selected-image-panel">
              <div className="panel-header">
                <span className="panel-title">图像详情</span>
                <button 
                  className="close-button"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
              </div>
              <div className="panel-content">
                <div className="panel-image">
                  <img src={selectedImage.url} alt={selectedImage.prompt} />
                </div>
                <div className="panel-details">
                  <div className="detail-row">
                    <span className="detail-label">提示词:</span>
                    <span className="detail-value">{selectedImage.prompt}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">风格:</span>
                    <span className="detail-value">{styles.find(s => s.id === selectedImage.style)?.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">尺寸:</span>
                    <span className="detail-value">{selectedImage.size}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">生成时间:</span>
                    <span className="detail-value">{selectedImage.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageGeneration;