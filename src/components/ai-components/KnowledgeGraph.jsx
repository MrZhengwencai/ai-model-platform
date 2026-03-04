import { useState, useRef } from 'react';
import './KnowledgeGraph.css';

function KnowledgeGraph() {
  const [nodes, setNodes] = useState([
    { id: 1, label: '人工智能', x: 400, y: 150, type: 'main' },
    { id: 2, label: '机器学习', x: 250, y: 250, type: 'category' },
    { id: 3, label: '深度学习', x: 550, y: 250, type: 'category' },
    { id: 4, label: '自然语言处理', x: 150, y: 350, type: 'sub' },
    { id: 5, label: '计算机视觉', x: 350, y: 350, type: 'sub' },
    { id: 6, label: '强化学习', x: 500, y: 350, type: 'sub' },
    { id: 7, label: '生成模型', x: 650, y: 350, type: 'sub' },
    { id: 8, label: '神经网络', x: 200, y: 450, type: 'concept' },
    { id: 9, label: 'Transformer', x: 400, y: 450, type: 'concept' },
    { id: 10, label: 'GAN', x: 600, y: 450, type: 'concept' }
  ]);

  const [edges, setEdges] = useState([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 8 },
    { from: 5, to: 8 },
    { from: 6, to: 9 },
    { from: 7, to: 10 }
  ]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [layout, setLayout] = useState('force');
  const [draggingNode, setDraggingNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [draggingEdge, setDraggingEdge] = useState(null);
  const [edgeStartPoint, setEdgeStartPoint] = useState(null);
  const canvasRef = useRef(null);

  const layouts = [
    { id: 'force', name: '力导向', icon: '🔀' },
    { id: 'circular', name: '环形', icon: '⭕' },
    { id: 'tree', name: '树形', icon: '🌳' }
  ];

  const getNodeStyle = (node) => {
    const baseStyle = {
      position: 'absolute',
      left: node.x - 40,
      top: node.y - 20,
      width: 80,
      height: 40,
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '0.8rem',
      fontWeight: '500',
      padding: '0.5rem',
      textAlign: 'center'
    };

    switch (node.type) {
      case 'main':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #646cff 0%, #a855f7 100%)',
          color: 'white',
          boxShadow: '0 0 20px rgba(100, 108, 255, 0.5)',
          border: '2px solid #646cff'
        };
      case 'category':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
          color: 'white',
          boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)',
          border: '2px solid #22c55e'
        };
      case 'sub':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          color: 'white',
          boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
          border: '2px solid #f59e0b'
        };
      case 'concept':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          color: 'white',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)',
          border: '2px solid #ef4444'
        };
      default:
        return baseStyle;
    }
  };

  const handleNodeClick = (node) => {
    if (connectingFrom) {
      if (connectingFrom.id !== node.id) {
        const newEdge = { from: connectingFrom.id, to: node.id };
        if (!edges.some(e => e.from === newEdge.from && e.to === newEdge.to)) {
          setEdges([...edges, newEdge]);
          saveToHistory();
        }
      }
      setConnectingFrom(null);
    } else {
      setSelectedNode(selectedNode?.id === node.id ? null : node);
    }
  };

  const handleNodeMouseDown = (e, node) => {
    if (e.button === 0) {
      if (connectingFrom) {
        if (connectingFrom.id !== node.id) {
          const newEdge = { from: connectingFrom.id, to: node.id };
          if (!edges.some(e => e.from === newEdge.from && e.to === newEdge.to)) {
            setEdges([...edges, newEdge]);
            saveToHistory();
          }
        }
        setConnectingFrom(null);
        return;
      }
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setDraggingNode(node);
    }
  };

  const handleConnectorMouseDown = (e, node, position) => {
    e.stopPropagation();
    e.preventDefault();
    setConnectingFrom(node);
    setEdgeStartPoint({ node, position });
  };

  const handleCanvasRightClick = (e) => {
    e.preventDefault();
    setConnectingFrom(null);
    setDraggingEdge(null);
  };

  const handleNodeHover = (node) => {
    setHoveredNode(node);
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
  };

  const saveToHistory = () => {
    const state = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges))
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(JSON.parse(JSON.stringify(prevState.nodes)));
      setEdges(JSON.parse(JSON.stringify(prevState.edges)));
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(JSON.parse(JSON.stringify(nextState.nodes)));
      setEdges(JSON.parse(JSON.stringify(nextState.edges)));
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleMouseMove = (e) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (draggingNode) {
      const newX = e.clientX - rect.left - dragOffset.x + 40;
      const newY = e.clientY - rect.top - dragOffset.y + 20;

      setNodes(nodes.map(node => 
        node.id === draggingNode.id 
          ? { ...node, x: Math.max(40, Math.min(rect.width - 40, newX)), y: Math.max(20, Math.min(rect.height - 20, newY)) }
          : node
      ));
    }
  };

  const handleMouseUp = (e) => {
    if (draggingNode) {
      saveToHistory();
    }
    setDraggingNode(null);
    setDragOffset({ x: 0, y: 0 });
    
    if (connectingFrom) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const targetNode = nodes.find(node => {
          const nodeRect = {
            left: node.x - 40,
            right: node.x + 40,
            top: node.y - 20,
            bottom: node.y + 20
          };
          return x >= nodeRect.left && x <= nodeRect.right && 
                 y >= nodeRect.top && y <= nodeRect.bottom;
        });
        
        if (targetNode && targetNode.id !== connectingFrom.id) {
          const newEdge = { from: connectingFrom.id, to: targetNode.id };
          if (!edges.some(edge => edge.from === newEdge.from && edge.to === newEdge.to)) {
            setEdges([...edges, newEdge]);
            saveToHistory();
          }
        }
      }
      setConnectingFrom(null);
      setEdgeStartPoint(null);
    }
  };

  const addNode = () => {
    const newNode = {
      id: nodes.length + 1,
      label: `新节点 ${nodes.length + 1}`,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      type: 'concept'
    };
    setNodes([...nodes, newNode]);
    saveToHistory();
  };

  const removeNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.from !== nodeId && e.to !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
    saveToHistory();
  };

  const addEdge = () => {
    if (nodes.length < 2) return;
    const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
    let toNode = nodes[Math.floor(Math.random() * nodes.length)];
    while (toNode.id === fromNode.id) {
      toNode = nodes[Math.floor(Math.random() * nodes.length)];
    }
    const newEdge = { from: fromNode.id, to: toNode.id };
    if (!edges.some(e => e.from === newEdge.from && e.to === newEdge.to)) {
      setEdges([...edges, newEdge]);
      saveToHistory();
    }
  };

  const resetGraph = () => {
    setNodes([
      { id: 1, label: '人工智能', x: 400, y: 150, type: 'main' },
      { id: 2, label: '机器学习', x: 250, y: 250, type: 'category' },
      { id: 3, label: '深度学习', x: 550, y: 250, type: 'category' },
      { id: 4, label: '自然语言处理', x: 150, y: 350, type: 'sub' },
      { id: 5, label: '计算机视觉', x: 350, y: 350, type: 'sub' },
      { id: 6, label: '强化学习', x: 500, y: 350, type: 'sub' },
      { id: 7, label: '生成模型', x: 650, y: 350, type: 'sub' }
    ]);
    setEdges([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 3, to: 7 }
    ]);
    setSelectedNode(null);
  };

  const getConnectorPosition = (node, position) => {
    const offset = 45;
    switch (position) {
      case 'top':
        return { x: node.x, y: node.y - offset };
      case 'bottom':
        return { x: node.x, y: node.y + offset };
      case 'left':
        return { x: node.x - offset, y: node.y };
      case 'right':
        return { x: node.x + offset, y: node.y };
      default:
        return { x: node.x, y: node.y };
    }
  };

  return (
    <div className="knowledge-graph">
      <div className="kg-header">
        <h3>🕸️ 知识图谱组件</h3>
        <p className="kg-subtitle">可视化展示知识节点和关系</p>
      </div>

      <div className="kg-tips">
        <div className="tip-item">
          <span className="tip-icon">🖱️</span>
          <span className="tip-text">左键拖拽节点移动位置</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">🔗</span>
          <span className="tip-text">从节点边缘的连接点拖拽到其他节点创建连线</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">❌</span>
          <span className="tip-text">点击节点选中，点击删除按钮移除节点</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">◀️</span>
          <span className="tip-text">使用上一步/下一步按钮撤销和重做操作</span>
        </div>
      </div>

      <div className="kg-controls">
        <div className="control-group">
          <label className="control-label">布局:</label>
          <div className="layout-buttons">
            {layouts.map(l => (
              <button
                key={l.id}
                className={`layout-button ${layout === l.id ? 'active' : ''}`}
                onClick={() => setLayout(l.id)}
              >
                <span className="layout-icon">{l.icon}</span>
                <span className="layout-name">{l.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">显示:</label>
          <button 
            className={`toggle-button ${showLabels ? 'active' : ''}`}
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? '🏷️ 显示标签' : '🏷️ 隐藏标签'}
          </button>
        </div>

        <div className="control-group">
          <label className="control-label">操作:</label>
          <div className="action-buttons">
            <button className="action-button" onClick={addNode}>
              ➕ 添加节点
            </button>
            <button className="action-button" onClick={addEdge}>
              🔗 添加连线
            </button>
            {connectingFrom && (
              <button 
                className="action-button warning" 
                onClick={() => {
                  setConnectingFrom(null);
                  setEdgeStartPoint(null);
                }}
                title="取消连线"
              >
                ❌ 取消连线
              </button>
            )}
            <div className="history-controls">
              <button 
                className="action-button history-btn" 
                onClick={undo}
                disabled={historyIndex <= 0}
                title="上一步"
              >
                ◀️ 上一步
              </button>
              <span className="history-info">
                {historyIndex + 1} / {history.length}
              </span>
              <button 
                className="action-button history-btn" 
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                title="下一步"
              >
                下一步 ▶️
              </button>
            </div>
            <button className="action-button danger" onClick={resetGraph}>
              🔄 重置
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={canvasRef}
        className="kg-canvas"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={handleCanvasRightClick}
      >
        <svg className="graph-svg">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="rgba(100, 108, 255, 0.5)"
              />
            </marker>
          </defs>
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(100, 108, 255, 0.5)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                className="graph-edge"
              />
            );
          })}
          
          {connectingFrom && (
            <line
              x1={connectingFrom.x}
              y1={connectingFrom.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="rgba(100, 108, 255, 0.8)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="temp-edge"
            />
          )}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            style={getNodeStyle(node)}
            onClick={() => handleNodeClick(node)}
            onMouseDown={(e) => handleNodeMouseDown(e, node)}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={handleNodeLeave}
            onContextMenu={(e) => e.preventDefault()}
            className={`graph-node ${selectedNode?.id === node.id ? 'selected' : ''} ${hoveredNode?.id === node.id ? 'hovered' : ''} ${connectingFrom?.id === node.id ? 'connecting' : ''} ${draggingNode?.id === node.id ? 'dragging' : ''}`}
          >
            {showLabels && <span className="node-label">{node.label}</span>}
            
            {hoveredNode?.id === node.id && !connectingFrom && !draggingNode && (
              <>
                <div 
                  className="connector-point top"
                  onMouseDown={(e) => handleConnectorMouseDown(e, node, 'top')}
                  title="从顶部连接"
                />
                <div 
                  className="connector-point bottom"
                  onMouseDown={(e) => handleConnectorMouseDown(e, node, 'bottom')}
                  title="从底部连接"
                />
                <div 
                  className="connector-point left"
                  onMouseDown={(e) => handleConnectorMouseDown(e, node, 'left')}
                  title="从左侧连接"
                />
                <div 
                  className="connector-point right"
                  onMouseDown={(e) => handleConnectorMouseDown(e, node, 'right')}
                  title="从右侧连接"
                />
              </>
            )}
            
            {selectedNode?.id === node.id && (
              <button 
                className="remove-node-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNode(node.id);
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedNode && (
        <div className="node-details-panel">
          <div className="panel-header">
            <span className="panel-title">节点详情</span>
            <button 
              className="close-panel-btn"
              onClick={() => setSelectedNode(null)}
            >
              ✕
            </button>
          </div>
          <div className="panel-content">
            <div className="detail-row">
              <span className="detail-label">ID:</span>
              <span className="detail-value">{selectedNode.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">标签:</span>
              <span className="detail-value">{selectedNode.label}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">类型:</span>
              <span className="detail-value">{selectedNode.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">位置:</span>
              <span className="detail-value">({selectedNode.x}, {selectedNode.y})</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">连接数:</span>
              <span className="detail-value">
                {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="kg-stats">
        <div className="stat-item">
          <span className="stat-icon">🔵</span>
          <div className="stat-info">
            <span className="stat-label">节点数</span>
            <span className="stat-value">{nodes.length}</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔗</span>
          <div className="stat-info">
            <span className="stat-label">连线数</span>
            <span className="stat-value">{edges.length}</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-label">密度</span>
            <span className="stat-value">
              {((edges.length * 2) / (nodes.length * (nodes.length - 1))).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="kg-legend">
        <div className="legend-title">图例</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color main"></div>
            <span className="legend-label">主要节点</span>
          </div>
          <div className="legend-item">
            <div className="legend-color category"></div>
            <span className="legend-label">分类节点</span>
          </div>
          <div className="legend-item">
            <div className="legend-color sub"></div>
            <span className="legend-label">子节点</span>
          </div>
          <div className="legend-item">
            <div className="legend-color concept"></div>
            <span className="legend-label">概念节点</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGraph;
