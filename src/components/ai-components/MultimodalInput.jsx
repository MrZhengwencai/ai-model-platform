import { useState } from 'react';
import './MultimodalInput.css';

function MultimodalInput() {
  const [inputType, setInputType] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFiles(prev => [...prev, {
          type: 'image',
          name: file.name,
          url: event.target.result
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setUploadedFiles(prev => [...prev, {
        type: 'audio',
        name: file.name,
        url: URL.createObjectURL(file)
      }]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const data = {
      type: inputType,
      text: textInput,
      files: uploadedFiles
    };
    console.log('提交的数据:', data);
    alert('数据已提交！查看控制台查看详情。');
  };

  const clearAll = () => {
    setTextInput('');
    setImageFile(null);
    setAudioFile(null);
    setUploadedFiles([]);
  };

  return (
    <div className="multimodal-input">
      <div className="multimodal-header">
        <h3>🎨 多模态输入组件</h3>
        <p className="multimodal-subtitle">支持文本、图片、音频等多种输入方式</p>
      </div>

      <div className="input-type-selector">
        <button 
          className={`type-button ${inputType === 'text' ? 'active' : ''}`}
          onClick={() => setInputType('text')}
        >
          <span className="type-icon">📝</span>
          <span className="type-label">文本</span>
        </button>
        <button 
          className={`type-button ${inputType === 'image' ? 'active' : ''}`}
          onClick={() => setInputType('image')}
        >
          <span className="type-icon">🖼️</span>
          <span className="type-label">图片</span>
        </button>
        <button 
          className={`type-button ${inputType === 'audio' ? 'active' : ''}`}
          onClick={() => setInputType('audio')}
        >
          <span className="type-icon">🎵</span>
          <span className="type-label">音频</span>
        </button>
        <button 
          className={`type-button ${inputType === 'mixed' ? 'active' : ''}`}
          onClick={() => setInputType('mixed')}
        >
          <span className="type-icon">🔀</span>
          <span className="type-label">混合</span>
        </button>
      </div>

      <div className="input-area">
        {inputType === 'text' || inputType === 'mixed' ? (
          <div className="text-input-section">
            <label className="section-label">文本输入</label>
            <textarea
              className="text-input"
              placeholder="输入文本内容..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              rows={6}
            />
          </div>
        ) : null}

        {inputType === 'image' || inputType === 'mixed' ? (
          <div className="image-input-section">
            <label className="section-label">图片上传</label>
            <div className="upload-zone">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="upload-label">
                <span className="upload-icon">📤</span>
                <span className="upload-text">点击或拖拽上传图片</span>
                <span className="upload-hint">支持 JPG、PNG、GIF 格式</span>
              </label>
            </div>
          </div>
        ) : null}

        {inputType === 'audio' || inputType === 'mixed' ? (
          <div className="audio-input-section">
            <label className="section-label">音频上传</label>
            <div className="upload-zone">
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="file-input"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="upload-label">
                <span className="upload-icon">🎙️</span>
                <span className="upload-text">点击或拖拽上传音频</span>
                <span className="upload-hint">支持 MP3、WAV、M4A 格式</span>
              </label>
            </div>
          </div>
        ) : null}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <div className="files-header">
            <span className="files-title">已上传文件</span>
            <span className="files-count">{uploadedFiles.length}</span>
          </div>
          <div className="files-list">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-icon">
                  {file.type === 'image' ? '🖼️' : '🎵'}
                </div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-type">{file.type}</span>
                </div>
                {file.type === 'image' && (
                  <img src={file.url} alt={file.name} className="file-preview" />
                )}
                {file.type === 'audio' && (
                  <audio controls src={file.url} className="file-preview" />
                )}
                <button 
                  className="remove-button"
                  onClick={() => removeFile(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="input-actions">
        <button className="action-button secondary" onClick={clearAll}>
          清空
        </button>
        <button 
          className="action-button primary" 
          onClick={handleSubmit}
          disabled={!textInput && uploadedFiles.length === 0}
        >
          提交分析
        </button>
      </div>
    </div>
  );
}

export default MultimodalInput;
