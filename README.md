# gstack-grok

**gstack for [Grok](https://x.ai/) (xAI Grok Build TUI)** — and the full multi-host gstack skill suite.

> **中文说明：** [README-cn.md](./README-cn.md)

## Credits & upstream

This repository is based on **[garrytan/gstack](https://github.com/garrytan/gstack)** by [Garry Tan](https://x.com/garrytan) (MIT License).

**Thank you to the upstream project** for the skill system, workflows, setup/host architecture, and the vast majority of the code. This fork adds first-class **Grok (xAI)** host support and packaging notes for Grok users.

| | URL |
|--|-----|
| **This fork (Grok-focused publish)** | https://github.com/yangyangxiao66/gstack-grok |
| **Upstream (source of design & core)** | https://github.com/garrytan/gstack |

If this helps you, please also star upstream: https://github.com/garrytan/gstack

---

## What is gstack?

gstack turns an AI coding agent into a **virtual engineering team** via slash-style skills: product forcing questions, architecture lock-in, design review, code review, real-browser QA, security audit, ship/PR, and more.

Skills are Markdown + small runners — not a closed SaaS. Process shape:

**Think → Plan → Build → Review → Test → Ship → Reflect**

Full skill deep-dives live upstream: [docs/skills.md](./docs/skills.md) (same tree as garrytan/gstack).

---

## What this fork adds

| Item | Detail |
|------|--------|
| Host config | [`hosts/grok.ts`](./hosts/grok.ts) |
| Install target | `./setup --host grok` → `~/.grok/skills/gstack*` |
| Tool rewrites | Claude tool names → Grok tools (`run_terminal_command`, `read_file`, `search_replace`, …) |
| Path rewrites | `~/.claude/...` → `~/.grok/...`, `CLAUDE.md` → `AGENTS.md` |
| Uninstall | `bin/gstack-uninstall` cleans `~/.grok/skills/gstack*` only |

Generated skill docs under `.grok/` are produced by setup / `bun run gen:skill-docs --host grok` (gitignored).

You still get **all upstream hosts** (Claude, Codex, Cursor, …). Grok is simply a first-class option here.

---

## Requirements

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) v1.0+
- [Node.js](https://nodejs.org/) (recommended on Windows)
- [Grok CLI / Grok Build](https://x.ai/) when using `--host grok` (`grok` on `PATH`)

---

## Install for Grok (recommended path for this repo)

```bash
git clone --single-branch --depth 1 https://github.com/yangyangxiao66/gstack-grok.git ~/gstack
cd ~/gstack
./setup --host grok
```

Windows (Git Bash):

```bash
git clone --single-branch --depth 1 https://github.com/yangyangxiao66/gstack-grok.git "$USERPROFILE/gstack"
cd "$USERPROFILE/gstack"
./setup --host grok
```

Skills install to:

```text
~/.grok/skills/gstack
~/.grok/skills/gstack-*
```

Grok Build discovers `SKILL.md` packages from those paths.

### Quick check

```bash
command -v grok
ls ~/.grok/skills | grep gstack   # or: dir %USERPROFILE%\.grok\skills
```

Then in Grok, invoke skills such as `/office-hours`, `/review`, `/qa`, `/ship` (exact UI depends on the Grok client).

---

## Other agents (same tree)

```bash
./setup                  # auto-detect installed agents
./setup --host claude
./setup --host codex
# ...
```

| Agent | Flag | Skills land in |
|-------|------|----------------|
| Claude Code | `claude` | `~/.claude/skills/gstack*` |
| OpenAI Codex CLI | `codex` | `~/.codex/skills/gstack-*/` |
| OpenCode | `opencode` | `~/.config/opencode/skills/gstack-*/` |
| Cursor | `cursor` | `~/.cursor/skills/gstack-*/` |
| Factory Droid | `factory` | `~/.factory/skills/gstack-*/` |
| Slate | `slate` | `~/.slate/skills/gstack-*/` |
| Kiro | `kiro` | `~/.kiro/skills/gstack-*/` |
| Hermes | `hermes` | `~/.hermes/skills/gstack-*/` |
| GBrain | `gbrain` | `~/.gbrain/skills/gstack-*/` |
| **Grok (xAI)** | **`grok`** | **`~/.grok/skills/gstack-*/`** |

Adding a host: [docs/ADDING_A_HOST.md](./docs/ADDING_A_HOST.md).

---

## 30-second workflow

1. Install (above)
2. `/office-hours` — shape the product before code
3. `/plan-ceo-review` or `/autoplan` — challenge scope / lock a plan
4. Build
5. `/review` — pre-merge structural review
6. `/qa <url>` — real browser QA when you have a site
7. `/ship` — tests + PR

### Skill map (short)

| Skill | Role |
|-------|------|
| `/office-hours` | Product forcing questions |
| `/plan-ceo-review` | Strategy / scope |
| `/plan-eng-review` | Architecture |
| `/plan-design-review` | Design plan critique |
| `/autoplan` | CEO → design → eng pipeline |
| `/review` | Diff / production-bug hunt |
| `/investigate` | Root-cause debugging |
| `/qa` / `/qa-only` | Browser QA (fix or report-only) |
| `/ship` / `/land-and-deploy` | PR and deploy flow |
| `/cso` | Security (OWASP / STRIDE style) |
| `/browse` | Headless Chromium for the agent |
| `/gstack-upgrade` | Update gstack |

For the long narrative, screenshots, and full tables, see **upstream** [README](https://github.com/garrytan/gstack/blob/main/README.md) — we intentionally keep this fork README shorter and Grok-oriented.

---

## Upgrade & uninstall

```bash
cd ~/gstack && git pull && ./setup --host grok

# Removes gstack* under ~/.grok/skills (and other hosts as applicable)
./bin/gstack-uninstall
```

---

## License

[MIT](./LICENSE) — same as upstream.

Copyright and design of the core project: contributors to [garrytan/gstack](https://github.com/garrytan/gstack).  
Grok host adaptation in this fork: published at [yangyangxiao66/gstack-grok](https://github.com/yangyangxiao66/gstack-grok).

---

## Links

| | |
|--|--|
| This repo | https://github.com/yangyangxiao66/gstack-grok |
| Upstream gstack | https://github.com/garrytan/gstack |
| Chinese README | [README-cn.md](./README-cn.md) |
| Skill deep dives | [docs/skills.md](./docs/skills.md) |
| Host authoring | [docs/ADDING_A_HOST.md](./docs/ADDING_A_HOST.md) |
