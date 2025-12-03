import React, { useEffect, useMemo, useState } from 'react';

// 书籍数据：按原始 HTML 中的配置整理
const books = [
  {
    title: '机器学习 周志华',
    fileName: '机器学习+周志华.pdf',
    folderName: '机器学习+周志华',
    parts: 5,
    level: '进阶 / 理论',
    category: '基础理论与机器学习',
    tags: ['机器学习', '基础理论'],
    link: 'https://pan.baidu.com/s/1P5Owh7YoZ6ncQz9dXanwCA',
    code: 'wzst',
    description: '系统介绍机器学习核心理论与方法，被广泛视为机器学习领域的权威教材。'
  },
  {
    title: '推荐系统实践',
    fileName: '推荐系统实践.pdf',
    level: '实战',
    category: '推荐系统',
    tags: ['推荐系统', '机器学习'],
    link: 'https://pan.baidu.com/s/11-VA6RE0RY3XRBQkEomMMg',
    code: 'te31',
    description: '从工程实践角度讲解推荐算法、特征工程与系统实现，是入门推荐系统的经典读物。'
  },
  {
    title: '自然语言处理综论',
    fileName: '《自然语言处理综论》.pdf',
    folderName: '自然语言处理综论',
    parts: 7,
    level: '进阶 / 理论',
    category: '自然语言处理 NLP',
    tags: ['自然语言处理', 'NLP', '机器学习'],
    link: 'https://pan.baidu.com/s/1KP6wTUyRvtpDGC84bltoyA',
    code: 'l3wl',
    description: '系统梳理自然语言处理的基本任务、经典算法和理论框架，适合理解 NLP 整体版图。'
  },
  {
    title: '计算机视觉：一种现代方法',
    fileName: '《计算机视觉：一种现代方法》.pdf',
    level: '进阶 / 理论',
    category: '计算机视觉与图像处理',
    tags: ['计算机视觉', 'CV', '图像处理'],
    link: 'https://pan.baidu.com/s/1XXY5AP7hHOb6XKtLv36yvg',
    code: 'l3fb',
    description: '从现代视角介绍计算机视觉的理论与方法，涵盖图像理解、识别与视觉模型。'
  },
  {
    title: '图解机器学习',
    fileName: '图解机器学习.pdf',
    folderName: '图解机器学习',
    parts: 3,
    level: '入门',
    category: '基础理论与机器学习',
    tags: ['机器学习', '入门'],
    link: 'https://pan.baidu.com/s/1X3qsFL1rSL_bhqsAHQ7fPg',
    code: 'k59g',
    description: '以图解和案例的方式解释机器学习概念，非常适合入门和快速扫盲。'
  },
  {
    title: '决策知识自动化',
    fileName: '《决策知识自动化》.pdf',
    level: '进阶',
    category: '人工智能通识与应用',
    tags: ['人工智能', '机器学习'],
    link: 'https://pan.baidu.com/s/13kalbqzHI8G7F_dprWytkw',
    code: 'bu7l',
    description: '围绕企业和业务场景讲解如何用知识与算法实现决策自动化。'
  },
  {
    title: '人工智能：一种现代的方法 (第3版)',
    fileName: '人工智能：一种现代的方法（第３版）.pdf',
    level: '理论 / 通识',
    category: '人工智能通识与应用',
    tags: ['人工智能', '机器学习'],
    link: 'https://pan.baidu.com/s/1cHP3gVUGJFKP-xL90vEFA',
    code: '8iyo',
    description: '覆盖搜索、规划、推理、学习等广泛主题的 AI 经典教材，被誉为“AI 圣经”。'
  },
  {
    title: 'Python 数据分析与挖掘实战',
    fileName: 'Python数据分析与挖掘实战.pdf',
    folderName: 'Python数据分析与挖掘实战',
    parts: 4,
    level: '实战',
    category: '数据分析与挖掘',
    tags: ['数据分析', '机器学习', '实战'],
    link: 'https://pan.baidu.com/s/1OjCLV_hhCcFO5BBCKUDxHA',
    code: 'gnzc',
    description: '结合 Python 工具链，从数据预处理到建模与挖掘，适合做端到端实战项目。'
  },
  {
    title: '机器学习导论',
    fileName: '机器学习导论.pdf',
    folderName: '机器学习导论',
    parts: 6,
    level: '入门 / 进阶',
    category: '基础理论与机器学习',
    tags: ['机器学习'],
    link: 'https://pan.baidu.com/s/1hmD-VeuzlOy-qakENc-77g',
    code: '2wpg',
    description: '对主要机器学习算法进行系统性介绍，适合作为入门与进阶的过渡读物。'
  },
  {
    title: '面向机器智能的 TensorFlow 实践',
    fileName: '面向机器智能的TensorFlow实践+(智能系统与技术丛书)_.pdf',
    level: '实战',
    category: '深度学习与 TensorFlow',
    tags: ['深度学习', 'TensorFlow'],
    link: 'https://pan.baidu.com/s/1BQJLFh7te0ggyD538JgQWg',
    code: '03lo',
    description: '以 TensorFlow 为工具，从案例出发实现机器学习与深度学习模型应用。'
  },
  {
    title: '图像处理、分析与机器视觉（第三版）',
    fileName: '图像处理、分析与机器视觉（第三版）.pdf',
    folderName: '图像处理、分析与机器视觉',
    parts: 7,
    level: '进阶 / 理论',
    category: '计算机视觉与图像处理',
    tags: ['计算机视觉', 'CV', '图像处理'],
    link: 'https://pan.baidu.com/s/17VmF6AHL_WsLr6g8_oaHmw',
    code: '104g',
    description: '系统讲解图像处理、图像分析与机器视觉的基础理论与工程方法。'
  },
  {
    title: 'TensorFlow 实战（黄文坚）',
    fileName: 'TensorFlow实战_黄文坚（完整）.pdf',
    level: '实战',
    category: '深度学习与 TensorFlow',
    tags: ['深度学习', 'TensorFlow'],
    link: 'https://pan.baidu.com/s/15voQk0MxMYySwhTy2UTVSQ',
    code: '6syh',
    description: '以实例驱动的方式介绍 TensorFlow，涵盖模型搭建、训练与部署实战。'
  },
  {
    title: 'TensorFlow 实战：Google 深度学习框架',
    fileName: 'Tensorflow 实战Google深度学习框架.pdf',
    folderName: 'Tensorflow 实战Google深度学习框架',
    parts: 3,
    level: '实战',
    category: '深度学习与 TensorFlow',
    tags: ['深度学习', 'TensorFlow'],
    link: 'https://pan.baidu.com/s/1L85W0wOCdNBM-a-QDYceTA',
    code: 'ejj3',
    description: '围绕 Google 的 TensorFlow 框架讲解深度学习模型构建与实战案例。'
  },
  {
    title: '统计学习方法',
    fileName: '统计学习方法.pdf',
    level: '理论 / 进阶',
    category: '基础理论与机器学习',
    tags: ['统计学习', '机器学习', '数学'],
    link: 'https://pan.baidu.com/s/1tKUWBK-eZHwSPSUf15PGuQ',
    code: 'zjme',
    description: '从统计学习视角系统推导常见机器学习算法，是打牢理论基础的重要参考书。'
  },
  {
    title: '数学之美',
    fileName: '数学之美.pdf',
    folderName: '数学之美',
    parts: 3,
    level: '入门 / 通识',
    category: '基础理论与机器学习',
    tags: ['数学', '自然语言处理', 'NLP'],
    link: 'https://pan.baidu.com/s/1sWFH8lkzWpHLDxw0zBvyyw',
    code: 'y7xe',
    description: '用通俗易懂的方式讲解数学在搜索引擎、自然语言处理等中的应用。'
  },
  {
    title: '区块链新经济概论',
    fileName: '区块链新经济概论.pdf',
    folderName: '区块链新经济概论',
    parts: 3,
    level: '入门',
    category: '区块链与扩展阅读',
    tags: ['区块链'],
    link: 'https://pan.baidu.com/s/10ugwGsJI9yf-z5yzKNon0g',
    code: 'm35l',
    description: '系统介绍区块链技术与新经济形态，为理解 Web3 与加密经济提供入门视角。'
  }
];

const THEME_KEY = 'ai-learning-theme';

function detectPreferredTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

function applyThemeToBody(theme) {
  if (typeof document === 'undefined') return;
  const body = document.body;
  body.classList.remove('theme-dark', 'theme-light');
  body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
}

function groupByCategory(items) {
  const map = new Map();
  items.forEach((book) => {
    const key = book.category || '其他';
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(book);
  });
  return map;
}

function getSectionDesc(category) {
  if (category.includes('基础理论')) {
    return '打牢数学、统计与机器学习基础，为后续深度学习与工程实践铺路。';
  }
  if (category.includes('人工智能通识')) {
    return '整体了解人工智能领域的全景与主流方向，建立系统化认知。';
  }
  if (category.includes('深度学习')) {
    return '围绕深度学习与 TensorFlow 框架，从理论到工程实践进行学习。';
  }
  if (category.includes('自然语言处理')) {
    return '聚焦文本与语言相关任务，如分词、句法分析、文本分类、对话等。';
  }
  if (category.includes('计算机视觉')) {
    return '从图像处理、分析到机器视觉与 CV 任务，理解如何让机器“看懂”世界。';
  }
  if (category.includes('推荐系统')) {
    return '学习推荐系统算法与工程实践，理解“千人千面”的实现原理。';
  }
  if (category.includes('数据分析')) {
    return '用 Python 工具链完成数据分析与挖掘项目，实现端到端实践。';
  }
  if (category.includes('区块链')) {
    return '面向未来扩展的区块链与新经济阅读，对 AI+区块链场景有更全面思考。';
  }
  return '该分区汇总了所在方向的代表性书籍，建议按从易到难逐本进阶。';
}

// 已上传 PDF 的文件列表（用于控制预览按钮显示）
const availablePdfs = new Set([
  '机器学习+周志华.pdf', // 实际上是文件夹，但为了兼容逻辑，这里保留，具体逻辑在渲染时处理
  '推荐系统实践.pdf',
  '《计算机视觉：一种现代方法》.pdf',
  '《决策知识自动化》.pdf',
  '人工智能：一种现代的方法（第３版）.pdf',
  '面向机器智能的TensorFlow实践+(智能系统与技术丛书)_.pdf',
  '统计学习方法.pdf',
  '《自然语言处理综论》.pdf',
  '区块链新经济概论.pdf',
  '数学之美.pdf',
  '图解机器学习.pdf',
  '机器学习导论.pdf',
  'Tensorflow 实战Google深度学习框架.pdf',
  'Python数据分析与挖掘实战.pdf',
  '图像处理、分析与机器视觉（第三版）.pdf'
]);

function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState('all');
  const [theme, setTheme] = useState(() => detectPreferredTheme());
  const [toast, setToast] = useState({ show: false, message: '' });

  // 应用主题到 body，并持久化
  useEffect(() => {
    applyThemeToBody(theme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleDownload = (e, link, code) => {
    e.preventDefault();
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`提取码 ${code} 已复制，正在跳转...`);
        setTimeout(() => {
          window.open(link, '_blank');
        }, 1000);
      }).catch(() => {
        window.open(link, '_blank');
      });
    } else {
      window.open(link, '_blank');
    }
  };

  const grouped = useMemo(() => groupByCategory(books), []);

  const visibleCount = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    let count = 0;
    grouped.forEach((list) => {
      list.forEach((book) => {
        const title = (book.title || '').toLowerCase();
        const tags = book.tags || [];
        const matchSearch = !keyword || title.includes(keyword);
        const matchDirection =
          direction === 'all' || tags.some((t) => t.includes(direction));
        if (matchSearch && matchDirection) count += 1;
      });
    });
    return count;
  }, [grouped, search, direction]);

  const totalCount = books.length;
  const year = new Date().getFullYear();

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const keyword = search.trim().toLowerCase();

  return (
    <div className="page">
      <Toast message={toast.message} visible={toast.show} />
      {/* 顶部导航 */}
      <header className="top-nav">
        <div className="top-nav-inner">
          <div className="brand">
            <div className="brand-logo" />
            <div>
              <div className="brand-text-title">安东尼学AI</div>
              <div className="brand-text-sub">AI · ML · DL · TensorFlow · CV · NLP</div>
            </div>
          </div>
          <div className="nav-right">
            <a
              className="nav-highlight-btn"
              href="https://github.com/TUARAN/AI-Learning-Library"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 仓库"
            >
              <span>参与项目</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              className="nav-external-link"
              href="https://blogger-alliance.pages.dev/"
              target="_blank"
              rel="noreferrer"
            >
              博主联盟
            </a>
            <div className="nav-pill">个人学习 &amp; 内部分享</div>
            <div className="nav-badge">
              <span className="nav-badge-dot" />
              <span>持续补充中</span>
            </div>
            {/* 亮度切换按钮：浅色 / 深色 */}
            <button
              className="theme-toggle"
              id="themeToggle"
              type="button"
              aria-label="切换浅色 / 深色模式"
              onClick={handleThemeToggle}
            >
              <span className="theme-toggle-icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-width">
        {/* 头部简介 */}
        <section className="hero">
          <div className="hero-layout">
            <div>
              <h1 className="hero-title">
                让 <span className="highlight">AI / 机器学习 / 深度学习</span>
                <br />
                相关书籍变成可浏览的<strong>在线知识库</strong>
              </h1>
              <p className="hero-subtitle">
                将分散在网盘里的人工智能资料，整理成按方向、按阶段可筛选的可视化书库。
                适合自己复习查找，也方便分享给同学、同事一起系统学习。
              </p>
              <div className="hero-tags">
                <span className="hero-tag">📚 人工智能 · 机器学习 · 深度学习</span>
                <span className="hero-tag">🧠 数学 · 统计学习 · 算法理论</span>
                <span className="hero-tag">🧾 NLP / CV / 推荐系统 · 区块链</span>
              </div>
              <p className="hero-tip">
                用法：按书名搜索 + 按方向筛选，点击「百度网盘下载」即可；需要时只要把{' '}
                <code>链接：XXXX</code> 替换为你自己的网盘链接即可。
              </p>
            </div>

            <aside className="hero-aside">
              <div className="hero-aside-header">
                <div className="hero-aside-title">当前书单概览</div>
                <div className="hero-aside-badge">v1 · 可自由扩展</div>
              </div>
              <div className="hero-aside-grid">
                <div className="hero-aside-item">
                  <div className="hero-aside-item-label">收录书籍</div>
                  <div className="hero-aside-item-value">{totalCount} 本</div>
                </div>
                <div className="hero-aside-item">
                  <div className="hero-aside-item-label">方向覆盖</div>
                  <div className="hero-aside-item-value">ML / DL / NLP / CV / 推荐 / 区块链</div>
                </div>
                <div className="hero-aside-item">
                  <div className="hero-aside-item-label">学习阶段</div>
                  <div className="hero-aside-item-value">入门 · 进阶 · 实战 · 理论</div>
                </div>
                <div className="hero-aside-item">
                  <div className="hero-aside-item-label">筛选体验</div>
                  <div className="hero-aside-item-value">搜索 + 方向标签</div>
                </div>
              </div>
              <div className="hero-aside-foot">
                <span>你可以随时在代码中追加更多书籍。</span>
                <span className="hero-aside-pill">前端 + 设计一体化布局</span>
              </div>
            </aside>
          </div>
        </section>

        {/* 搜索 & 筛选 */}
        <section className="controls" aria-label="筛选区域">
          <div className="search-box">
            <div className="search-icon" aria-hidden="true" />
            <input
              type="search"
              id="searchInput"
              className="search-input"
              placeholder="按书名关键字搜索，例如：机器学习 / TensorFlow / 推荐系统..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-row">
            <span className="filter-label">按方向筛选：</span>
            <select
              id="directionFilter"
              className="filter-select"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="all">全部方向</option>
              <option value="机器学习">机器学习</option>
              <option value="深度学习">深度学习</option>
              <option value="TensorFlow">TensorFlow</option>
              <option value="自然语言处理">自然语言处理 NLP</option>
              <option value="计算机视觉">计算机视觉 / 图像处理</option>
              <option value="推荐系统">推荐系统</option>
              <option value="数学">数学 / 统计学习</option>
              <option value="区块链">区块链</option>
            </select>
          </div>

          <div className="stats-text" id="statsVisible">
            当前显示：
            <strong>
              <span id="visibleCount">{visibleCount}</span>
            </strong>{' '}
            / <span id="totalCount">{totalCount}</span> 本
          </div>
        </section>

        {/* 书籍分区与卡片 */}
        <section id="sectionsContainer" aria-label="书籍分区展示">
          {Array.from(grouped.entries()).map(([category, list]) => {
            const desc = getSectionDesc(category);
            return (
              <section key={category} className="section">
                <div className="section-header">
                  <div className="section-title">
                    <span>📘 {category}</span>
                  </div>
                  <div className="section-pill">收录 {list.length} 本</div>
                </div>
                <div className="section-desc">{desc}</div>
                <div className="cards-grid">
                  {list.map((book) => {
                    const titleLc = (book.title || '').toLowerCase();
                    const tags = book.tags || [];
                    const matchSearch = !keyword || titleLc.includes(keyword);
                    const matchDirection =
                      direction === 'all' ||
                      tags.some((t) => t.includes(direction));
                    const hidden = !(matchSearch && matchDirection);
                    const hasPreview = availablePdfs.has(book.fileName);
                    const isSplit = !!book.parts;

                    return (
                      <article
                        key={book.fileName}
                        className={`book-card${hidden ? ' hidden' : ''}`}
                      >
                        <h3 className="book-title">
                          {book.fileName || book.title}
                        </h3>
                        <div className="book-meta">
                          <span className="level-badge">
                            {book.level || '阶段未标注'}
                          </span>
                          {tags.map((tag) => (
                            <span key={tag} className="tag-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="book-desc">
                          {book.description ||
                            '本书暂无简介，可根据书名与目录内容自行补充一两句说明。'}
                        </p>
                        <div className="book-footer">
                          <div className="footer-btns">
                            {isSplit ? (
                              <div className="split-preview-dropdown">
                                <button className="preview-btn dropdown-trigger" type="button">
                                  <span>在线预览 ({book.parts}卷)</span>
                                  <span className="dropdown-arrow">▼</span>
                                </button>
                                <div className="dropdown-menu">
                                  {Array.from({ length: book.parts }).map((_, i) => (
                                    <a
                                      key={i}
                                      className="dropdown-item"
                                      href={`/pdf/${book.folderName}/${book.folderName}-${i + 1}.pdf`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      第 {i + 1} 卷
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <a
                                className={`preview-btn ${!hasPreview ? 'disabled' : ''}`}
                                href={hasPreview ? `/pdf/${book.fileName}` : undefined}
                                target={hasPreview ? '_blank' : undefined}
                                rel={hasPreview ? 'noreferrer' : undefined}
                                title={hasPreview ? '在线预览本书' : '暂无预览资源'}
                                onClick={!hasPreview ? (e) => e.preventDefault() : undefined}
                              >
                                <span>{hasPreview ? '在线预览' : '暂无预览'}</span>
                              </a>
                            )}
                            <a
                              className="download-btn"
                              href={book.link}
                              target="_blank"
                              rel="noreferrer"
                              title="前往百度网盘下载本书"
                              onClick={(e) => handleDownload(e, book.link, book.code)}
                            >
                              <span
                                className="download-icon"
                                aria-hidden="true"
                              />
                              <span>网盘下载</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>
      </main>

      {/* 底部 */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-links">
            <div>
              © <span id="yearSpan">{year}</span> AI 全栈学习资料库
            </div>
            <div>Personal AI Learning Library · For Study &amp; Research Only</div>
          </div>
          <div className="footer-note">
            免责声明：本页面仅用于个人学习与技术交流，所列电子书链接来源于个人整理与网络公开资源，不对内容版权做任何主张。
            如有侵权，请在原分享平台联系删除或修改链接。请在遵守所在地区法律法规和版权政策的前提下使用本页资料。
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


