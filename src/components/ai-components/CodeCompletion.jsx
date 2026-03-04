import { useState, useEffect, useRef } from 'react';
import './CodeCompletion.css';

function CodeCompletion() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const editorRef = useRef(null);
  const cursorPositionRef = useRef(0);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '📜' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'typescript', name: 'TypeScript', icon: '📘' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚙️' },
    { id: 'go', name: 'Go', icon: '🔵' }
  ];

  const codeSnippets = {
    javascript: [
      { code: 'function', description: '定义函数' },
      { code: 'const', description: '声明常量' },
      { code: 'let', description: '声明变量' },
      { code: 'async', description: '异步函数' },
      { code: 'await', description: '等待异步操作' },
      { code: 'Promise', description: 'Promise对象' },
      { code: 'Array.from', description: '从类数组创建数组' },
      { code: 'Object.keys', description: '获取对象键' },
      { code: 'map', description: '数组映射' },
      { code: 'filter', description: '数组过滤' }
    ],
    python: [
      { code: 'def', description: '定义函数' },
      { code: 'class', description: '定义类' },
      { code: 'import', description: '导入模块' },
      { code: 'async def', description: '异步函数' },
      { code: 'await', description: '等待异步操作' },
      { code: 'list', description: '创建列表' },
      { code: 'dict', description: '创建字典' },
      { code: 'len()', description: '获取长度' },
      { code: 'range()', description: '生成范围' },
      { code: 'print()', description: '打印输出' }
    ],
    typescript: [
      { code: 'interface', description: '定义接口' },
      { code: 'type', description: '定义类型' },
      { code: 'enum', description: '定义枚举' },
      { code: 'implements', description: '实现接口' },
      { code: 'extends', description: '继承类' },
      { code: 'readonly', description: '只读属性' },
      { code: 'Partial', description: '部分类型' },
      { code: 'Required', description: '必需类型' },
      { code: 'Record', description: '记录类型' },
      { code: 'Pick', description: '选择属性' }
    ],
    java: [
      { code: 'public class', description: '公共类' },
      { code: 'private', description: '私有访问' },
      { code: 'protected', description: '受保护访问' },
      { code: 'static', description: '静态成员' },
      { code: 'final', description: '最终修饰符' },
      { code: 'interface', description: '接口定义' },
      { code: 'implements', description: '实现接口' },
      { code: 'extends', description: '继承类' },
      { code: 'import', description: '导入包' },
      { code: 'package', description: '包声明' }
    ],
    cpp: [
      { code: '#include', description: '包含头文件' },
      { code: 'namespace', description: '命名空间' },
      { code: 'class', description: '定义类' },
      { code: 'struct', description: '定义结构体' },
      { code: 'template', description: '模板定义' },
      { code: 'const', description: '常量' },
      { code: 'constexpr', description: '常量表达式' },
      { code: 'auto', description: '自动类型推导' },
      { code: 'override', description: '重写虚函数' },
      { code: 'virtual', description: '虚函数' }
    ],
    go: [
      { code: 'package', description: '包声明' },
      { code: 'import', description: '导入包' },
      { code: 'func', description: '定义函数' },
      { code: 'type', description: '定义类型' },
      { code: 'struct', description: '定义结构体' },
      { code: 'interface', description: '定义接口' },
      { code: 'go', description: '启动goroutine' },
      { code: 'chan', description: '通道类型' },
      { code: 'defer', description: '延迟执行' },
      { code: 'select', description: '多路选择' }
    ]
  };

  const sampleCode = {
    javascript: `function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result);`,
    python: `def calculate_sum(numbers):
    return sum(numbers)

result = calculate_sum([1, 2, 3, 4, 5])
print(result)`,
    typescript: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com'
  };
}`,
    java: `public class Calculator {
    public int sum(int[] numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
}`,
    cpp: `#include <vector>
#include <numeric>

int sum(const std::vector<int>& numbers) {
    return std::accumulate(numbers.begin(), numbers.end(), 0);
}`,
    go: `package main

import "fmt"

func sum(numbers []int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}`
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    cursorPositionRef.current = e.target.selectionStart;

    if (value.length > 0) {
      setIsAnalyzing(true);
      setTimeout(() => {
        generateSuggestions(value);
        setIsAnalyzing(false);
      }, 500);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const generateSuggestions = (text) => {
    const snippets = codeSnippets[language] || [];
    const lastWord = text.split(/[\s\n(){}[\],;]+/).pop().toLowerCase();
    
    const filtered = snippets.filter(snippet => 
      snippet.code.toLowerCase().includes(lastWord) || 
      snippet.description.toLowerCase().includes(lastWord)
    );

    setSuggestions(filtered.slice(0, 8));
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestion(0);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        applySuggestion(suggestions[selectedSuggestion]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    }
  };

  const applySuggestion = (suggestion) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const cursorPos = cursorPositionRef.current;
    const textBefore = code.substring(0, cursorPos);
    const textAfter = code.substring(cursorPos);

    const newText = textBefore + suggestion.code + textAfter;
    setCode(newText);
    setShowSuggestions(false);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = cursorPos + suggestion.code.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const loadSampleCode = () => {
    setCode(sampleCode[language] || '');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const clearCode = () => {
    setCode('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert('代码已复制到剪贴板');
  };

  return (
    <div className="code-completion">
      <div className="cc-header">
        <h3>💻 智能代码补全</h3>
        <p className="cc-subtitle">AI驱动的代码智能提示与补全</p>
      </div>

      <div className="cc-toolbar">
        <div className="toolbar-left">
          <div className="language-selector">
            <label className="selector-label">语言:</label>
            <select 
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.icon} {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button className="toolbar-button" onClick={loadSampleCode}>
            📄 加载示例
          </button>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-button" onClick={copyCode} disabled={!code}>
            📋 复制
          </button>
          <button className="toolbar-button danger" onClick={clearCode} disabled={!code}>
            🗑️ 清空
          </button>
        </div>
      </div>

      <div className="cc-editor-container">
        <div className="editor-wrapper">
          <div className="line-numbers">
            {code.split('\n').map((_, index) => (
              <div key={index} className="line-number">
                {index + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={editorRef}
            className="code-editor"
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            placeholder="在此输入代码... AI将提供智能补全建议"
            spellCheck={false}
          />
        </div>

        {showSuggestions && (
          <div className="suggestions-panel">
            <div className="suggestions-header">
              <span className="suggestions-title">💡 智能建议</span>
              {isAnalyzing && (
                <span className="analyzing-indicator">
                  <span className="spinner"></span>
                  分析中...
                </span>
              )}
            </div>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
                  onClick={() => applySuggestion(suggestion)}
                >
                  <div className="suggestion-code">
                    <code>{suggestion.code}</code>
                  </div>
                  <div className="suggestion-description">
                    {suggestion.description}
                  </div>
                </div>
              ))}
            </div>
            <div className="suggestions-footer">
              <span className="footer-hint">使用 ↑↓ 选择，Tab 或 Enter 应用，Esc 关闭</span>
            </div>
          </div>
        )}
      </div>

      <div className="cc-stats">
        <div className="stat-item">
          <span className="stat-label">字符数:</span>
          <span className="stat-value">{code.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">行数:</span>
          <span className="stat-value">{code.split('\n').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">语言:</span>
          <span className="stat-value">
            {languages.find(l => l.id === language)?.name}
          </span>
        </div>
        {suggestions.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">建议:</span>
            <span className="stat-value highlight">{suggestions.length}</span>
          </div>
        )}
      </div>

      <div className="cc-tips">
        <div className="tips-header">
          <span className="tips-icon">⚡</span>
          <span className="tips-title">快捷键</span>
        </div>
        <div className="tips-grid">
          <div className="tip-item">
            <kbd>Tab</kbd>
            <span>应用建议</span>
          </div>
          <div className="tip-item">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>导航建议</span>
          </div>
          <div className="tip-item">
            <kbd>Esc</kbd>
            <span>关闭建议</span>
          </div>
          <div className="tip-item">
            <kbd>Enter</kbd>
            <span>应用建议</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeCompletion;