import React from 'react';

// AI历史时间线数据
const aiTimeline = [
  {
    year: '1950',
    title: '图灵测试',
    description: '艾伦·图灵提出"图灵测试"，这是判断机器是否具有智能的经典标准。他在论文《计算机器与智能》中提出了"机器能思考吗？"的著名问题。',
    keyPoint: '人工智能概念的萌芽',
    impact: '为人工智能研究奠定了哲学基础',
    icon: '🤔'
  },
  {
    year: '1956',
    title: '达特茅斯会议',
    description: '约翰·麦卡锡等人在达特茅斯学院召开会议，首次提出"人工智能"一词，标志着AI作为一个独立学科的诞生。',
    keyPoint: '人工智能正式诞生',
    impact: 'AI成为独立研究领域',
    icon: '🎓'
  },
  {
    year: '1957-1974',
    title: '第一次AI繁荣期',
    description: '逻辑推理、问题求解和符号主义方法蓬勃发展。开发了第一批AI程序，如逻辑理论家(Logic Theorist)和通用问题求解器(GPS)。',
    keyPoint: '符号主义AI、专家系统',
    impact: '证明了机器可以进行逻辑推理',
    icon: '🧩'
  },
  {
    year: '1974-1980',
    title: '第一次AI寒冬',
    description: '由于过高的期望与有限的计算能力之间的矛盾，AI研究陷入低谷，资金大幅削减。',
    keyPoint: '技术瓶颈与资金短缺',
    impact: '研究放缓，但也促使研究者反思',
    icon: '❄️'
  },
  {
    year: '1980-1987',
    title: '专家系统时代',
    description: '专家系统成为AI商业化的突破口，XCON、MYCIN等系统在医疗、工业领域取得成功，AI迎来第二次繁荣。',
    keyPoint: '知识工程、规则系统',
    impact: 'AI首次实现大规模商业应用',
    icon: '🏥'
  },
  {
    year: '1987-1993',
    title: '第二次AI寒冬',
    description: '专家系统维护成本高昂，知识获取困难。日本第五代计算机项目失败，AI再次进入低谷期。',
    keyPoint: '知识工程的局限性暴露',
    impact: '推动研究转向新的方向',
    icon: '❄️'
  },
  {
    year: '1997',
    title: '深蓝击败卡斯帕罗夫',
    description: 'IBM的深蓝(Deep Blue)国际象棋计算机击败世界冠军加里·卡斯帕罗夫，展示了计算机在复杂策略游戏中的能力。',
    keyPoint: '暴力搜索算法的胜利',
    impact: '证明AI在特定领域可以超越人类',
    icon: '♟️'
  },
  {
    year: '2006',
    title: '深度学习突破',
    description: 'Geoffrey Hinton提出深度信念网络(DBN)，引发深度学习革命。多层神经网络训练问题得到解决。',
    keyPoint: '深度神经网络、反向传播',
    impact: '开启现代AI时代',
    icon: '🧠'
  },
  {
    year: '2012',
    title: 'AlexNet与ImageNet',
    description: 'Alex Krizhevsky的AlexNet在ImageNet图像识别竞赛中以巨大优势夺冠，深度学习在计算机视觉领域取得突破。',
    keyPoint: 'CNN卷积神经网络、GPU加速',
    impact: '计算机视觉进入深度学习时代',
    icon: '👁️'
  },
  {
    year: '2014',
    title: '生成对抗网络(GAN)',
    description: 'Ian Goodfellow提出GAN，通过生成器与判别器的对抗训练，实现高质量内容生成。',
    keyPoint: '对抗学习、生成模型',
    impact: '图像、视频生成能力大幅提升',
    icon: '🎨'
  },
  {
    year: '2016',
    title: 'AlphaGo击败李世石',
    description: 'DeepMind的AlphaGo击败世界围棋冠军李世石，结合深度学习与蒙特卡洛树搜索，解决了围棋这一公认的AI难题。',
    keyPoint: '深度强化学习、蒙特卡洛树搜索',
    impact: '证明AI可以掌握直觉性游戏',
    icon: '🏆'
  },
  {
    year: '2017',
    title: 'Transformer架构',
    description: 'Google提出Transformer架构("Attention is All You Need")，彻底改变了NLP领域，成为后续大模型的基础。',
    keyPoint: '自注意力机制、并行计算',
    impact: 'NLP进入预训练大模型时代',
    icon: '🔄'
  },
  {
    year: '2018',
    title: 'BERT与预训练模型',
    description: 'Google发布BERT，通过双向预训练刷新多项NLP任务记录，预训练+微调成为主流范式。',
    keyPoint: '双向编码、预训练+微调',
    impact: 'NLP任务性能大幅提升',
    icon: '📖'
  },
  {
    year: '2020',
    title: 'GPT-3发布',
    description: 'OpenAI发布GPT-3(1750亿参数)，展示了大规模语言模型的强大能力，few-shot学习效果惊人。',
    keyPoint: '大规模参数、涌现能力',
    impact: '开启大语言模型(LLM)竞赛',
    icon: '💬'
  },
  {
    year: '2021',
    title: 'AlphaFold 2',
    description: 'DeepMind的AlphaFold 2在蛋白质结构预测竞赛中取得突破性成果，解决了生物学50年难题。',
    keyPoint: '深度学习+生物科学',
    impact: 'AI在科学研究中的重大应用',
    icon: '🧬'
  },
  {
    year: '2022',
    title: 'ChatGPT引爆AI热潮',
    description: 'OpenAI发布ChatGPT，通过RLHF(人类反馈强化学习)使大模型更好地理解人类意图，迅速成为现象级应用。',
    keyPoint: 'RLHF、对话优化、用户体验',
    impact: 'AI走向大众，引发全球关注',
    icon: '🤖'
  },
  {
    year: '2023',
    title: 'GPT-4与多模态AI',
    description: 'GPT-4发布，支持图像输入；Midjourney、Stable Diffusion等AIGC工具成熟，多模态AI时代到来。',
    keyPoint: '多模态融合、AIGC',
    impact: 'AI内容创作能力飞跃',
    icon: '🎭'
  },
  {
    year: '2024',
    title: 'AI Agent与具身智能',
    description: 'AI Agent、具身智能、Sora等视频生成模型出现，AI从单一任务向复杂任务规划、物理世界交互方向发展。',
    keyPoint: 'Agent架构、世界模型、视频生成',
    impact: 'AI向通用人工智能(AGI)迈进',
    icon: '🚀'
  }
];

function AIHistory() {
  return (
    <div className="ai-history-page">
      <div className="ai-history-hero">
        <h1 className="ai-history-title">
          <span className="highlight">学AI历史</span>
        </h1>
        <p className="ai-history-subtitle">
          从图灵测试到ChatGPT，回顾人工智能70余年的发展历程，
          理解每个关键时刻背后的技术突破与思想演进
        </p>
        <div className="ai-history-stats">
          <div className="stat-item">
            <div className="stat-value">70+年</div>
            <div className="stat-label">发展历程</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{aiTimeline.length}</div>
            <div className="stat-label">关键节点</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">3次</div>
            <div className="stat-label">重大浪潮</div>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-line" />
        {aiTimeline.map((item, index) => (
          <div 
            key={index} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-content">
              <div className="timeline-icon">{item.icon}</div>
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
              <div className="timeline-meta">
                <div className="timeline-keypoint">
                  <strong>关键技术：</strong>
                  {item.keyPoint}
                </div>
                <div className="timeline-impact">
                  <strong>历史影响：</strong>
                  {item.impact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-history-footer">
        <div className="footer-card">
          <h3>💡 学习建议</h3>
          <p>
            理解AI历史不仅是了解技术发展，更是理解为什么某些方法会成功、某些会失败。
            建议结合书库中的经典教材，从历史脉络中理解AI的核心思想演进。
          </p>
        </div>
        <div className="footer-card">
          <h3>🔮 未来展望</h3>
          <p>
            从符号主义到连接主义，从专家系统到深度学习，AI的发展充满曲折但始终向前。
            下一个十年，AGI(通用人工智能)或许将从梦想变为现实。
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIHistory;
