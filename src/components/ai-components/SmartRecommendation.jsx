import { useState } from 'react';
import './SmartRecommendation.css';

function SmartRecommendation() {
  const [preferences, setPreferences] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    tags: []
  });

  const [recommendations, setRecommendations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: 'all', name: '全部', icon: '🌟' },
    { id: 'tech', name: '科技', icon: '💻' },
    { id: 'art', name: '艺术', icon: '🎨' },
    { id: 'music', name: '音乐', icon: '🎵' },
    { id: 'books', name: '书籍', icon: '📚' },
    { id: 'games', name: '游戏', icon: '🎮' }
  ];

  const priceRanges = [
    { id: 'all', name: '全部价格' },
    { id: 'free', name: '免费' },
    { id: 'low', name: '¥0-50' },
    { id: 'medium', name: '¥50-200' },
    { id: 'high', name: '¥200+' }
  ];

  const ratings = [
    { id: 'all', name: '全部评分' },
    { id: '4', name: '4星以上' },
    { id: '3', name: '3星以上' },
    { id: '2', name: '2星以上' }
  ];

  const availableTags = [
    '热门', '新发布', '精选', '限时优惠', '独家', '推荐'
  ];

  const sampleItems = [
    { id: 1, name: 'AI绘画助手', category: 'tech', price: 99, rating: 4.8, tags: ['热门', '推荐'], image: '🎨', description: '强大的AI图像生成工具，支持多种风格' },
    { id: 2, name: '智能代码编辑器', category: 'tech', price: 199, rating: 4.9, tags: ['新发布', '精选'], image: '💻', description: 'AI驱动的代码补全和优化' },
    { id: 3, name: '音乐生成器', category: 'music', price: 0, rating: 4.5, tags: ['免费', '热门'], image: '🎵', description: '基于AI的音乐创作平台' },
    { id: 4, name: '数字艺术教程', category: 'art', price: 149, rating: 4.7, tags: ['限时优惠'], image: '🖼️', description: '专业的数字艺术学习课程' },
    { id: 5, name: '科幻小说合集', category: 'books', price: 59, rating: 4.6, tags: ['独家'], image: '📖', description: '精选科幻小说电子书' },
    { id: 6, name: '策略游戏合集', category: 'games', price: 129, rating: 4.8, tags: ['推荐', '精选'], image: '🎮', description: '经典策略游戏完整版' },
    { id: 7, name: '语音识别SDK', category: 'tech', price: 299, rating: 4.9, tags: ['热门', '新发布'], image: '🎤', description: '高精度语音转文字API' },
    { id: 8, name: '电子音乐制作', category: 'music', price: 79, rating: 4.4, tags: ['限时优惠'], image: '🎹', description: '专业电子音乐制作工具' }
  ];

  const generateRecommendations = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let filtered = [...sampleItems];

      if (preferences.category !== 'all') {
        filtered = filtered.filter(item => item.category === preferences.category);
      }

      if (preferences.priceRange !== 'all') {
        filtered = filtered.filter(item => {
          switch (preferences.priceRange) {
            case 'free':
              return item.price === 0;
            case 'low':
              return item.price > 0 && item.price <= 50;
            case 'medium':
              return item.price > 50 && item.price <= 200;
            case 'high':
              return item.price > 200;
            default:
              return true;
          }
        });
      }

      if (preferences.rating !== 'all') {
        filtered = filtered.filter(item => item.rating >= parseInt(preferences.rating));
      }

      if (preferences.tags.length > 0) {
        filtered = filtered.filter(item => 
          item.tags.some(tag => preferences.tags.includes(tag))
        );
      }

      const shuffled = filtered.sort(() => Math.random() - 0.5);
      setRecommendations(shuffled.slice(0, 6));
      setIsGenerating(false);
    }, 1500);
  };

  const toggleTag = (tag) => {
    setPreferences(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const clearPreferences = () => {
    setPreferences({
      category: 'all',
      priceRange: 'all',
      rating: 'all',
      tags: []
    });
    setRecommendations([]);
    setSelectedItem(null);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star full">⭐</span>
        ))}
        {hasHalfStar && <span className="star half">⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star empty">⭐</span>
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="smart-recommendation">
      <div className="sr-header">
        <h3>🎯 智能推荐组件</h3>
        <p className="sr-subtitle">基于用户偏好的AI智能推荐系统</p>
      </div>

      <div className="sr-filters">
        <div className="filter-section">
          <label className="filter-label">分类</label>
          <div className="filter-grid">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-chip ${preferences.category === cat.id ? 'active' : ''}`}
                onClick={() => setPreferences(prev => ({ ...prev, category: cat.id }))}
              >
                <span className="chip-icon">{cat.icon}</span>
                <span className="chip-label">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">价格</label>
          <div className="filter-options">
            {priceRanges.map(range => (
              <button
                key={range.id}
                className={`filter-option ${preferences.priceRange === range.id ? 'active' : ''}`}
                onClick={() => setPreferences(prev => ({ ...prev, priceRange: range.id }))}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">评分</label>
          <div className="filter-options">
            {ratings.map(rating => (
              <button
                key={rating.id}
                className={`filter-option ${preferences.rating === rating.id ? 'active' : ''}`}
                onClick={() => setPreferences(prev => ({ ...prev, rating: rating.id }))}
              >
                {rating.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">标签</label>
          <div className="tags-container">
            {availableTags.map(tag => (
              <button
                key={tag}
                className={`tag-chip ${preferences.tags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sr-actions">
        <button 
          className="action-button primary" 
          onClick={generateRecommendations}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="loading-spinner"></span>
              <span>生成推荐...</span>
            </>
          ) : (
            <>
              <span className="button-icon">🎯</span>
              <span>生成推荐</span>
            </>
          )}
        </button>
        <button 
          className="action-button secondary" 
          onClick={clearPreferences}
          disabled={recommendations.length === 0}
        >
          <span className="button-icon">🔄</span>
          <span>重置</span>
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="sr-results">
          <div className="results-header">
            <span className="results-title">推荐结果</span>
            <span className="results-count">{recommendations.length} 项</span>
          </div>

          <div className="results-grid">
            {recommendations.map(item => (
              <div 
                key={item.id}
                className={`recommendation-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <div className="card-image">
                  <span className="item-emoji">{item.image}</span>
                  {item.tags.map((tag, index) => (
                    <span key={index} className="item-tag">{tag}</span>
                  ))}
                </div>
                <div className="card-content">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <div className="meta-item">
                      <span className="meta-icon">💰</span>
                      <span className="meta-value">
                        {item.price === 0 ? '免费' : `¥${item.price}`}
                      </span>
                    </div>
                    <div className="meta-rating">
                      {renderStars(item.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="item-details-panel">
          <div className="panel-header">
            <span className="panel-title">详情</span>
            <button 
              className="close-panel-btn"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>
          </div>
          <div className="panel-content">
            <div className="detail-header">
              <span className="detail-emoji">{selectedItem.image}</span>
              <div className="detail-info">
                <h3 className="detail-name">{selectedItem.name}</h3>
                <div className="detail-rating">
                  {renderStars(selectedItem.rating)}
                </div>
              </div>
            </div>
            <p className="detail-description">{selectedItem.description}</p>
            <div className="detail-meta">
              <div className="meta-row">
                <span className="meta-label">分类:</span>
                <span className="meta-value">
                  {categories.find(c => c.id === selectedItem.category)?.name}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">价格:</span>
                <span className="meta-value price">
                  {selectedItem.price === 0 ? '免费' : `¥${selectedItem.price}`}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">评分:</span>
                <span className="meta-value rating">{selectedItem.rating} / 5.0</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">标签:</span>
                <div className="meta-tags">
                  {selectedItem.tags.map((tag, index) => (
                    <span key={index} className="detail-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button className="detail-button">
              立即查看
            </button>
          </div>
        </div>
      )}

      <div className="sr-tips">
        <div className="tips-header">
          <span className="tips-icon">💡</span>
          <span className="tips-title">使用提示</span>
        </div>
        <ul className="tips-list">
          <li>选择多个筛选条件可以获得更精准的推荐</li>
          <li>标签可以帮助您发现热门和精选内容</li>
          <li>评分筛选可以过滤掉低质量内容</li>
          <li>点击推荐卡片查看详细信息</li>
        </ul>
      </div>
    </div>
  );
}

export default SmartRecommendation;