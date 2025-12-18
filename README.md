# 📘 安东尼学AI

🚀 **在线访问：[https://matrix-ai-pdfs.pages.dev/](https://matrix-ai-pdfs.pages.dev/)**

> **给大家安利一个我刚搓的 AI 学习资料站 —— 「安东尼学AI」。**
>
> 把平时散落在网盘里的西瓜书、花书、NLP、CV 等经典教材全整理到一起了。
> 主打一个**干净、无广、直达**。
> 支持按方向筛选，点击直接复制提取码下载，很多大部头还能**在线预览**。
> 纯用爱发电，希望能帮到正在啃书的你，好用记得收藏！

## 📚 当前收录资源 (Current Resources)

我们已整理并收录了以下经典书籍，覆盖从入门到实战的各个阶段：

### 🧠 基础理论与机器学习
*   **《机器学习》（西瓜书）** - 周志华
*   **《统计学习方法》** - 李航
*   **《机器学习导论》** - Ethem Alpaydin
*   **《图解机器学习》**
*   **《数学之美》** - 吴军

### 👁️ 计算机视觉 (CV)
*   **《计算机视觉：一种现代方法》**
*   **《图像处理、分析与机器视觉》（第三版）**

### 🗣️ 自然语言处理 (NLP)
*   **《自然语言处理综论》** (Jurafsky & Martin)

### 🔥 深度学习与 TensorFlow
*   **《TensorFlow 实战：Google 深度学习框架》**
*   **《面向机器智能的 TensorFlow 实践》**
*   **《TensorFlow 实战》** - 黄文坚

### 🤖 人工智能通识
*   **《人工智能：一种现代的方法》（第3版）** - AI 圣经
*   **《决策知识自动化》**

### 🎯 推荐系统 & 数据挖掘
*   **《推荐系统实践》**
*   **《Python 数据分析与挖掘实战》**

### 🔗 扩展阅读
*   **《区块链新经济概论》**

---

## 💡 设计理念

在学习人工智能的过程中，我们往往会收集大量的 PDF 书籍和资料，但它们通常散落在网盘的各个角落，文件名混乱，难以查找。

**“安东尼学AI”** 资料库的设计初衷，就是为了解决这个问题：

*   **可视化呈现**：告别枯燥的文件列表，采用精美的卡片式设计，直观展示书籍封面（未来）、简介、标签和适用阶段。
*   **结构化整理**：将庞杂的 AI 领域划分为机器学习、深度学习、NLP、CV、推荐系统等清晰的板块，帮助学习者建立知识体系。
*   **极简体验**：专注于“发现好书”和“获取资源”两个核心需求，无广告，无干扰。

## ✨ 当前优势

1.  **精选经典书单**：
    *   收录了行业公认的经典教材，如“西瓜书”（周志华）、“花书”（深度学习）、“AI 圣经”（人工智能一种现代方法）等。
    *   覆盖从 **入门 -> 进阶 -> 实战 -> 理论** 的全学习周期。

2.  **高效检索与获取**：
    *   支持**按书名搜索**和**按方向筛选**，秒级找到你需要的资料。
    *   提供直达的**百度网盘下载链接**和提取码。
    *   部分书籍支持**在线直接预览**，无需下载即可快速翻阅。

3.  **人性化交互**：
    *   支持 **深色 / 浅色** 主题切换，适应不同的阅读环境。
    *   响应式设计，手机和电脑都能流畅访问。

## 🚀 未来规划

我们致力于将这里打造成 AI 学习者的首选“藏书阁”：

*   **持续扩充书库**：计划引入更多前沿的论文集、大模型（LLM）相关教程以及高质量的开源文档。
*   **学习路线图**：不仅仅是堆砌书籍，未来将梳理出针对不同岗位的“学习路径”，指引大家按顺序阅读。
*   **增强互动**：引入书籍评分、读者评论功能，帮助大家筛选出真正的好书。

## 🤝 邀请共建

这是一个开源项目，维护一个高质量的知识库需要大家的力量。非常欢迎你参与进来！

### 如何参与？

1.  **推荐好书**：如果你读到一本觉得很棒的 AI 书籍，欢迎提交 Issue 或 Pull Request 分享给我们。
2.  **补充资源**：如果你手头有更高清的 PDF 版本，或者发现现有的链接失效，请协助更新。
    > **⚠️ 注意事项**：由于部署平台限制，单个 PDF 文件超过 **25MB** 将无法预览。请使用 [iLovePDF](https://www.ilovepdf.com/split_pdf) 等工具，建议按 **100页/份** 进行拆分，并将拆分后的文件放入同名文件夹中提交。
3.  **改进体验**：如果你对网站的设计或功能有好的建议，也请不吝赐教。

让我们一起构建一个开放、共享、高质量的 AI 学习社区！

---

## ✅ GitHub 登录 + 打卡（可选功能）

本项目已内置 Cloudflare Pages Functions：

- GitHub OAuth 登录
- 每日打卡（写入 Cloudflare KV）
- 查看历史打卡记录

### 1) 创建 GitHub OAuth App

在 GitHub：Settings → Developer settings → OAuth Apps → New OAuth App

- **Homepage URL**：你的站点地址，例如 `https://matrix-ai-pdfs.pages.dev`
- **Authorization callback URL**：`https://matrix-ai-pdfs.pages.dev/api/auth/github/callback`

拿到：

- `Client ID`
- `Client Secret`

### 2) 配置 Cloudflare Pages 环境变量 / Secrets

常用配置项：

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `JWT_SECRET`：随机长字符串（用于签名会话 Cookie）

说明：

- `APP_URL` 建议写在 [wrangler.toml](wrangler.toml) 的 `[vars]`（非敏感）
- `GITHUB_CLIENT_SECRET` / `JWT_SECRET` 建议用 **Pages secrets**（敏感）

如果你在 Cloudflare Pages 控制台无法直接绑定/设置（提示“此项目的绑定通过 wrangler.toml 管理”），请用 Wrangler 设置 secrets（项目名以你的 Pages 项目为准；本项目线上为 `matrix-ai-pdfs`）：

- `npx wrangler pages secret put GITHUB_CLIENT_ID --project-name matrix-ai-pdfs`
- `npx wrangler pages secret put GITHUB_CLIENT_SECRET --project-name matrix-ai-pdfs`
- `npx wrangler pages secret put JWT_SECRET --project-name matrix-ai-pdfs`

### 3) 配置 Cloudflare KV（存储打卡记录）

创建一个 KV Namespace，并在 Pages Functions 绑定：

- **Binding name**：`CHECKINS_KV`

如果你的 Cloudflare Pages 控制台提示“此项目的绑定在通过 wrangler.toml 进行管理”，
请用下面这套 **完整流程**（推荐）：

#### A. 登录 Wrangler（一次性）

- `npx wrangler login`

#### B. 创建 KV Namespace（生产 + 预览）

- `npx wrangler kv namespace create CHECKINS_KV`
- `npx wrangler kv namespace create CHECKINS_KV --preview`

> 这两条命令会输出 `id`（生产）和 `preview_id`（预览）。

#### C. 绑定到 Pages Functions（写入 wrangler.toml）

把输出的 `id` / `preview_id` 填到 [wrangler.toml](wrangler.toml)：

```toml
kv_namespaces = [
    { binding = "CHECKINS_KV", id = "<KV_NAMESPACE_ID>", preview_id = "<KV_PREVIEW_NAMESPACE_ID>" }
]
```

#### D. 提交 wrangler.toml（强烈建议）

不提交的话，下次走 GitHub 自动部署可能会丢 KV 绑定。

- `git add wrangler.toml`
- `git commit -m "Bind CHECKINS_KV"`
- `git push`

#### E. 部署（两选一）

- 方式 1：让 Cloudflare Pages 通过 GitHub 自动构建部署（推荐，最省事）
- 方式 2：本地手动部署（项目名以你的 Pages 项目为准；本项目线上为 `matrix-ai-pdfs`）：
    - `npm run build`
    - `npx wrangler pages deploy dist --project-name matrix-ai-pdfs`

> 是否需要“重置 KV”？一般不需要。只有你想清空打卡数据时，才需要换一个新的 KV namespace。

### 4) 使用方式

部署后：

- 顶部导航点击「GitHub 登录」完成授权
- 登录后会出现「打卡」入口
- 在「打卡」页进行打卡并查看历史记录（按 UTC 日期统计）

---

*本项目仅用于个人学习与技术交流，所列资源来源于网络，请在遵守版权法律法规的前提下使用。*
