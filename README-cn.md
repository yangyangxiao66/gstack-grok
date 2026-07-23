# gstack（中文说明）

> **本仓库（Grok 适配发布版）**  
> [https://github.com/yangyangxiao66/gstack-grok](https://github.com/yangyangxiao66/gstack-grok)

> **上游原版（官方）**  
> [https://github.com/garrytan/gstack](https://github.com/garrytan/gstack)  
> 作者：[Garry Tan](https://x.com/garrytan)（Y Combinator CEO）· MIT License

`gstack` 是一套把 AI 编程助手变成「虚拟工程团队」的 **技能包（skills）**：CEO 评审、架构锁定、设计审、代码审查、浏览器 QA、安全审计、发 PR / 上线等，都以 slash 命令 + Markdown 技能文件的形式提供。

本仓库在上游基础上，增加了 **Grok（xAI Grok Build TUI）** 的一等宿主（host）支持：

```bash
./setup --host grok
# 技能安装到 ~/.grok/skills/gstack-*
```

英文完整文档见 [README.md](./README.md)。更细的技能说明见 [docs/skills.md](./docs/skills.md)。

---

## 和原版是什么关系

| 项目 | 说明 |
|------|------|
| **上游** | [garrytan/gstack](https://github.com/garrytan/gstack) — 标准功能与设计源头 |
| **本仓** | [yangyangxiao66/gstack-grok](https://github.com/yangyangxiao66/gstack-grok) — 上游全量代码 + Grok host |
| **本仓新增** | `hosts/grok.ts`、`setup --host grok`、相关卸载 / 文档 / 测试 |
| **生成目录** | `.grok/skills/` 由 `setup` / `bun run gen:skill-docs --host grok` 生成，默认不进 Git |

请以 **本仓 `main`** 作为你使用的「Grok 版 gstack」标准来源；功能演进请同时关注上游 [garrytan/gstack](https://github.com/garrytan/gstack)。

---

## 它是干什么的

gstack 不是又一个聊天插件，而是一条可重复的研发流程：

**想清楚 → 做计划 → 写代码 → 审查 → 测试 → 发布 → 复盘**

常见技能示例：

| 命令 | 角色 | 作用 |
|------|------|------|
| `/office-hours` | YC Office Hours | 用 6 个逼问把「点子」打磨成可做的产品楔子 |
| `/plan-ceo-review` | CEO / 创始人 | 挑战范围与野心，找 10 星产品 |
| `/plan-eng-review` | 工程经理 | 锁架构、数据流、边界与测试 |
| `/plan-design-review` | 设计师 | 设计维度打分，改计划里的视觉/交互 |
| `/autoplan` | 评审流水线 | 自动跑 CEO → 设计 → 工程等评审 |
| `/review` | Staff 工程师 | 找能过 CI 但上线会炸的问题 |
| `/investigate` | 调试 | 先调查再改代码，禁止瞎修 |
| `/qa` / `/qa-only` | QA | 真浏览器测站、找 bug（/qa 可顺带修） |
| `/ship` | 发布 | 同步 main、跑测、开 PR |
| `/land-and-deploy` | 发布 | 合并 + 部署 + 验生产 |
| `/cso` | 安全 | OWASP + STRIDE 类审计 |
| `/browse` | 浏览器 | 给 Agent 真 Chromium 眼睛 |
| `/gstack-upgrade` | 升级 | 升级本机 gstack |

完整列表与英文说明见上游 [README.md · The sprint](https://github.com/garrytan/gstack/blob/main/README.md)。

---

## 环境要求

| 依赖 | 说明 |
|------|------|
| [Git](https://git-scm.com/) | 必须 |
| [Bun](https://bun.sh/) v1.0+ | 必须（setup / 生成技能文档） |
| [Node.js](https://nodejs.org/) | **Windows 建议安装** |
| [Grok CLI / Grok Build](https://x.ai/) | 使用 `--host grok` 时需要本机可执行 `grok` |
| 或其他宿主 | Claude Code、Codex、Cursor 等（见下文） |

---

## 安装（给 Grok 用 · 推荐）

### 1. 克隆本仓并安装

**Windows（PowerShell / Git Bash）：**

```bash
git clone --single-branch --depth 1 https://github.com/yangyangxiao66/gstack-grok.git ~/gstack
cd ~/gstack
./setup --host grok
```

Windows 上若 `~/gstack` 路径不方便，可改成：

```bash
git clone --single-branch --depth 1 https://github.com/yangyangxiao66/gstack-grok.git %USERPROFILE%\gstack
cd %USERPROFILE%\gstack
bash ./setup --host grok
```

安装成功后，技能会出现在：

```text
~/.grok/skills/gstack
~/.grok/skills/gstack-*
```

Grok Build 会从这些路径发现 `SKILL.md`。

### 2. 验证

```bash
# 本机有 grok 命令
grok --version   # 或你平时启动 Grok 的方式

# 确认技能目录
ls ~/.grok/skills | findstr gstack    # Windows
ls ~/.grok/skills | grep gstack       # macOS / Linux
```

### 3. 在 Grok 里怎么用

打开 Grok Build / Grok CLI 后，直接调用技能名，例如：

- 「运行 `/office-hours`，我想做一个……」
- 「对当前分支跑 `/review`」
- 「对 https://staging.example.com 跑 `/qa`」
- 「帮我 `/ship`」

具体触发方式以 Grok 客户端对 skills 的支持为准（侧栏技能 / 斜杠命令 / 自然语言路由）。

---

## 安装（官方上游 · Claude 等）

若你主要用 **Claude Code**，也可直接装上游：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

### 多宿主一览

`./setup` 会自动检测已安装的 Agent；也可指定：

```bash
./setup --host <name>
```

| Agent | 参数 | 技能安装位置 |
|-------|------|----------------|
| Claude Code | `claude`（默认） | `~/.claude/skills/gstack*` |
| OpenAI Codex CLI | `codex` | `~/.codex/skills/gstack-*/` |
| OpenCode | `opencode` | `~/.config/opencode/skills/gstack-*/` |
| Cursor | `cursor` | `~/.cursor/skills/gstack-*/` |
| Factory Droid | `factory` | `~/.factory/skills/gstack-*/` |
| Slate | `slate` | `~/.slate/skills/gstack-*/` |
| Kiro | `kiro` | `~/.kiro/skills/gstack-*/` |
| Hermes | `hermes` | `~/.hermes/skills/gstack-*/` |
| GBrain | `gbrain` | `~/.gbrain/skills/gstack-*/` |
| **Grok (xAI)** | **`grok`** | **`~/.grok/skills/gstack-*/`** |

新增宿主说明：[docs/ADDING_A_HOST.md](./docs/ADDING_A_HOST.md)。

---

## 30 秒上手流程

1. 装好 gstack（上一节）
2. 在项目里说清你要做的产品 → 跑 **`/office-hours`**
3. 对方案跑 **`/plan-ceo-review`** 或 **`/autoplan`**
4. 写完代码后跑 **`/review`**
5. 有网页就跑 **`/qa <你的 URL>`**
6. 准备合并时跑 **`/ship`**

如果这几步对你有用，再深入其它技能；不需要一次全学会。

---

## Grok 宿主做了什么（技术摘要）

配置文件：[`hosts/grok.ts`](./hosts/grok.ts)

| 项 | 行为 |
|----|------|
| 安装根目录 | `~/.grok/skills/gstack`（用户级） |
| 路径改写 | `~/.claude/skills/gstack` → `~/.grok/skills/gstack`，`CLAUDE.md` → `AGENTS.md` |
| 工具改写 | Claude 的 Bash/Read/Edit… → Grok 的 `run_terminal_command` / `read_file` / `search_replace` 等 |
| 提交署名 | `Co-Authored-By: Grok <noreply@x.ai>` |
| 生成技能 | `bun run gen:skill-docs --host grok`（setup 会调用） |

重新生成 Grok 技能文档：

```bash
cd ~/gstack   # 或你的克隆路径
bun install
bun run gen:skill-docs --host grok
./setup --host grok
```

---

## 升级与卸载

```bash
# 升级（技能内也可 /gstack-upgrade）
cd ~/gstack && git pull && ./setup --host grok

# 卸载 Grok 相关 gstack 技能（保留 ~/.grok 其它配置）
./bin/gstack-uninstall
```

---

## 许可与致谢

- **许可证**：MIT（见 [LICENSE](./LICENSE)）
- **上游项目**：[garrytan/gstack](https://github.com/garrytan/gstack) — 设计理念、技能体系与主体代码均来自上游
- **本仓贡献**：Grok（xAI）host 适配与发布整理

如需引用或二次分发，请保留 MIT 许可与上游作者信息。

---

## 常见问题

**Q: 和「终端矩阵」是什么关系？**  
A: 无关。终端矩阵是另一个桌面终端项目；本仓是 **gstack 技能套件**。

**Q: 必须用 Grok 吗？**  
A: 不必。本仓完整包含上游 gstack，也可用 `./setup --host claude` 等装到其它 Agent。本仓的差异是 **Grok 开箱可用**。

**Q: 技能目录为什么 Git 里看不到 `.grok/`？**  
A: `.grok/` 是生成物，已在 `.gitignore`。运行 `./setup --host grok` 后会出现在你的用户目录。

**Q: 大文件警告？**  
A: 上游自带部分较大的 `browse/dist` 二进制；GitHub 可能提示超过 50MB 建议阈值，一般不影响 clone 与使用。

---

## 链接

| 资源 | URL |
|------|-----|
| 本仓（标准发布 · Grok） | https://github.com/yangyangxiao66/gstack-grok |
| 上游原版 | https://github.com/garrytan/gstack |
| 英文 README | [README.md](./README.md) |
| 技能详解 | [docs/skills.md](./docs/skills.md) |
| 增加宿主 | [docs/ADDING_A_HOST.md](./docs/ADDING_A_HOST.md) |
