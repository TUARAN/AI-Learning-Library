import React from 'react';

function LLMTopic() {
  return (
    <div className="ai-history-page">
      <div className="ai-history-hero">
        <h1 className="ai-history-title">
          <span className="highlight">LLM专题</span>
        </h1>
        <p className="ai-history-subtitle">
          一、基础层：大模型是怎么被“训出来”的
        </p>
      </div>

      <div className="llm-topic">
        <section className="llm-section">
          <h2 className="llm-h2">1️⃣ 训练范式</h2>

          <div className="llm-block">
            <h3 className="llm-h3">自监督预训练（Pretraining）</h3>
            <p className="llm-p">
              核心是 Next Token Prediction，用海量无标注语料学语言分布，这是“通用智能”的来源。
            </p>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">监督微调（SFT）</h3>
            <p className="llm-p">
              用高质量指令数据对齐任务形式，让模型“会按人话做事”。
            </p>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">偏好对齐（RLHF / RLAIF / DPO）</h3>
            <p className="llm-p">
              解决“说得像人但不一定对人好”的问题，是价值观与行为约束层。
            </p>
          </div>

          <div className="llm-callout">
            <div className="llm-callout-title">👉 你可以把它理解为：</div>
            <div className="llm-callout-body">
              预训练 = 智商上限，微调 = 技能，偏好对齐 = 性格
            </div>
          </div>
        </section>

        <section className="llm-section">
          <h2 className="llm-h2">二、算得动：规模化训练的核心技术</h2>

          <div className="llm-block">
            <h3 className="llm-h3">2️⃣ 并行训练体系（Scaling 的根基）</h3>
            <ul className="llm-list">
              <li>数据并行（DP）：最基础，显存压力不变</li>
              <li>模型并行（TP / PP）：解决模型太大放不下</li>
              <li>ZeRO Stage 1/2/3：把参数、梯度、优化器状态拆散</li>
              <li>FSDP（Fully Sharded Data Parallel）：工程上最常用的工业方案之一</li>
            </ul>

            <div className="llm-callout">
              <div className="llm-callout-title">📌 现实经验：</div>
              <div className="llm-callout-body">
                没有 ZeRO / FSDP，100B 以上模型基本“起步即爆显存”。
              </div>
            </div>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">3️⃣ 混合精度与低精度计算</h3>
            <ul className="llm-list">
              <li>FP16 / BF16：主流</li>
              <li>INT8 / INT4（训练中较少）</li>
              <li>Loss Scaling：防止梯度下溢</li>
              <li>Tensor Core / NPU 加速</li>
            </ul>

            <div className="llm-callout">
              <div className="llm-callout-title">👉 本质目标只有一个：</div>
              <div className="llm-callout-body">用更少显存，跑更大的模型</div>
            </div>
          </div>
        </section>

        <section className="llm-section">
          <h2 className="llm-h2">三、训得好：稳定性与效率技术</h2>

          <div className="llm-block">
            <h3 className="llm-h3">4️⃣ 优化器与学习率策略</h3>
            <ul className="llm-list">
              <li>AdamW / Lion</li>
              <li>Warmup + Cosine Decay</li>
              <li>梯度裁剪（Gradient Clipping）</li>
            </ul>
            <p className="llm-p">大模型训练里，80% 的“炸掉”不是代码 bug，而是学习率问题。</p>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">5️⃣ 长上下文与位置编码</h3>
            <ul className="llm-list">
              <li>RoPE / NTK scaling</li>
              <li>ALiBi</li>
              <li>Position Interpolation</li>
            </ul>
            <p className="llm-p">这是从 4k → 32k → 128k 的关键技术栈。</p>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">6️⃣ 稀疏化与专家模型（MoE）</h3>
            <ul className="llm-list">
              <li>Mixture of Experts</li>
              <li>Top-k gating</li>
              <li>负载均衡 loss</li>
              <li>典型代表：Switch Transformer、DeepSeek、Mixtral</li>
            </ul>
            <div className="llm-callout">
              <div className="llm-callout-title">👉 核心思想：</div>
              <div className="llm-callout-body">参数规模上去，但每次只激活一小部分</div>
            </div>
          </div>
        </section>

        <section className="llm-section">
          <h2 className="llm-h2">四、训得稳：工业级训练工程</h2>

          <div className="llm-block">
            <h3 className="llm-h3">7️⃣ 数据工程（被严重低估）</h3>
            <ul className="llm-list">
              <li>去重（MinHash / SimHash）</li>
              <li>质量打分（Perplexity / 规则 + 模型）</li>
              <li>领域配比（Code / Math / Chat / Web）</li>
            </ul>
            <div className="llm-callout">
              <div className="llm-callout-title">📌 共识：</div>
              <div className="llm-callout-body">垃圾数据 × 再大模型 = 更贵的垃圾</div>
            </div>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">8️⃣ Checkpoint 与容错</h3>
            <ul className="llm-list">
              <li>分布式 Checkpoint</li>
              <li>异常恢复（OOM / 节点宕机）</li>
              <li>Elastic Training</li>
            </ul>
            <p className="llm-p">这是“科研能跑”和“生产能跑”的分水岭。</p>
          </div>
        </section>

        <section className="llm-section">
          <h2 className="llm-h2">五、后训练时代的新方向（2024–2025）</h2>

          <div className="llm-block">
            <h3 className="llm-h3">9️⃣ 对齐技术的演进</h3>
            <ul className="llm-list">
              <li>DPO / IPO / KTO：不再依赖复杂 RL</li>
              <li>RLAIF：AI 给 AI 打分</li>
              <li>Self-Reward / Self-Play</li>
            </ul>
            <div className="llm-callout">
              <div className="llm-callout-title">👉 对齐正在从：</div>
              <div className="llm-callout-body">“人教模型”变成“模型自我进化”。</div>
            </div>
          </div>

          <div className="llm-block">
            <h3 className="llm-h3">🔟 训练 + 推理一体化</h3>
            <ul className="llm-list">
              <li>Speculative Decoding</li>
              <li>Inference-aware Training</li>
              <li>KV Cache 优化反哺训练</li>
            </ul>
            <div className="llm-callout">
              <div className="llm-callout-title">未来趋势非常明确：</div>
              <div className="llm-callout-body">
                训练不再只为 loss 服务，而是为推理成本服务
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LLMTopic;
