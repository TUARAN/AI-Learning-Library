import React from 'react';

const algorithmCards = [
  {
    title: '搜索与规划（A* / BFS / DFS / 规划）',
    description:
      '在状态空间里寻找最优/可行路径，把“目标”变成可执行的步骤序列。',
    enables:
      'Agent 任务分解、工具调用流程、机器人路径规划、游戏 AI。',
    examples: ['A*', 'BFS/DFS', '动态规划', '约束满足（CSP）'],
  },
  {
    title: '优化（梯度下降 / 近端方法）',
    description:
      '把学习问题写成损失函数最小化：参数怎么更新、怎么收敛、怎么稳定。',
    enables:
      '深度学习训练（SGD/Adam）、微调稳定性、RL 策略优化、超参搜索。',
    examples: ['SGD', 'Adam', 'L-BFGS', '坐标下降'],
  },
  {
    title: '概率与统计推断（贝叶斯 / EM）',
    description:
      '用概率刻画不确定性：在噪声数据中做推断、估计与解释。',
    enables:
      '聚类（GMM）、缺失值处理、A/B 实验、可靠性评估、生成建模。',
    examples: ['贝叶斯推断', 'EM', '最大似然', 'GMM'],
  },
  {
    title: '线性代数与矩阵分解（SVD / PCA）',
    description:
      '把高维数据投影到更“有信息”的子空间，提取主方向与结构。',
    enables:
      '降维可视化、特征压缩、推荐系统（矩阵分解）、去噪与表示学习。',
    examples: ['PCA', 'SVD', 'QR 分解', '特征值分解'],
  },
  {
    title: '树模型与集成（决策树 / 随机森林 / GBDT）',
    description:
      '用可解释的规则划分特征空间，再通过集成提升泛化能力。',
    enables:
      '结构化数据建模、特征重要性解释、工业级 CTR/风控、冷启动建模。',
    examples: ['CART', 'Random Forest', 'XGBoost', 'LightGBM'],
  },
  {
    title: '序列算法（HMM / Viterbi / 动态规划）',
    description:
      '处理“时间/顺序”信号：在序列中做解码、对齐与最优路径。',
    enables:
      '语音识别（经典管线）、分词/标注、时序预测、行为序列建模。',
    examples: ['HMM', 'Viterbi', 'DTW', '序列 DP'],
  },
  {
    title: '图算法（最短路 / 社区发现 / PageRank）',
    description:
      '把实体与关系建模为图：从连接结构中挖掘影响力与传播路径。',
    enables:
      '知识图谱、推荐（图召回）、社交网络分析、GNN 的邻居采样/传播。',
    examples: ['Dijkstra', 'PageRank', 'BFS', '最小生成树'],
  },
  {
    title: '近似检索（倒排 / 向量索引 ANN）',
    description:
      '在海量数据中快速找到“最相似”的内容，兼顾速度与精度。',
    enables:
      'RAG 检索增强、相似问答、语义搜索、Embedding 召回、去重。',
    examples: ['倒排索引', 'HNSW', 'IVF', 'PQ'],
  },
  {
    title: '博弈与采样（MCTS / 蒙特卡洛）',
    description:
      '用随机采样估计期望与价值，并在搜索树中平衡探索与利用。',
    enables:
      'AlphaGo 关键组件、策略评估、仿真优化、复杂决策问题。',
    examples: ['蒙特卡洛', 'MCTS', 'UCB', '重要性采样'],
  },
];

function AIAlgorithms() {
  return (
    <div className="ai-history-page">
      <div className="ai-history-hero">
        <h1 className="ai-history-title">
          <span className="highlight">通过算法学AI</span>
        </h1>
        <p className="ai-history-subtitle">
          从“怎么搜索”到“怎么优化”，从“如何推断不确定性”到“如何高效检索”，
          这些算法像积木一样支撑着现代 AI 系统。
        </p>
        <div className="algo-grid">
          {algorithmCards.map((card) => (
            <article key={card.title} className="algo-card">
              <h3 className="algo-title">{card.title}</h3>
              <p className="algo-desc">{card.description}</p>
              <div className="algo-meta">
                <div className="algo-meta-row">
                  <span className="algo-meta-k">如何赋能：</span>
                  <span className="algo-meta-v">{card.enables}</span>
                </div>
                <div className="algo-meta-row">
                  <span className="algo-meta-k">常见形式：</span>
                  <span className="algo-meta-v">{card.examples.join(' · ')}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ai-history-footer">
          <div className="footer-card">
            <h3>📌 学习路径</h3>
            <p>
              先掌握“优化 + 线代 + 概率”三件套，再把树模型/检索/图算法补齐，
              最后用搜索与规划串起 Agent 与系统思维。
            </p>
          </div>
          <div className="footer-card">
            <h3>🧠 迁移思路</h3>
            <p>
              看到一个新模型时，试着问：它在解决哪类算法问题？是在做搜索、优化、推断，
              还是在做高效检索与数据结构设计？
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAlgorithms;
