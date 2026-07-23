import type { HostConfig } from '../scripts/host-config';

/**
 * Grok (xAI Grok Build TUI) host config.
 *
 * Skills install to ~/.grok/skills/gstack-* (user) and .grok/skills/gstack-*
 * (project). Grok discovers SKILL.md packages from those paths natively.
 * Tool names match Grok Build's built-in tools (run_terminal_command, read_file,
 * search_replace, spawn_subagent, etc.).
 */
const grok: HostConfig = {
  name: 'grok',
  displayName: 'Grok (xAI)',
  cliCommand: 'grok',
  cliAliases: [],

  globalRoot: '.grok/skills/gstack',
  localSkillRoot: '.grok/skills/gstack',
  hostSubdir: '.grok',
  usesEnvVars: true,

  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description', 'user-invocable', 'disable-model-invocation'],
    descriptionLimit: null,
    extraFields: {
      'user-invocable': true,
    },
    conditionalFields: [
      { if: { sensitive: true }, add: { 'disable-model-invocation': true } },
    ],
  },

  generation: {
    generateMetadata: false,
    skipSkills: ['codex'], // Codex skill is a Claude wrapper around codex exec
  },

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.grok/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.grok/skills/gstack' },
    { from: '.claude/skills', to: '.grok/skills' },
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],
  toolRewrites: {
    'use the Bash tool': 'use the run_terminal_command tool',
    'use the Write tool': 'use the write or search_replace tool',
    'use the Read tool': 'use the read_file tool',
    'use the Edit tool': 'use the search_replace tool',
    'use the Agent tool': 'use the spawn_subagent tool',
    'use the Grep tool': 'use the grep tool',
    'use the Glob tool': 'use list_dir or find files matching',
    'the Bash tool': 'the run_terminal_command tool',
    'the Read tool': 'the read_file tool',
    'the Write tool': 'the write tool',
    'the Edit tool': 'the search_replace tool',
    'the Agent tool': 'the spawn_subagent tool',
    'the Grep tool': 'the grep tool',
    'the Glob tool': 'list_dir',
    'Prefer Read, Edit, Write, Glob, Grep over shell':
      'Prefer read_file, search_replace, write, list_dir, grep over shell',
  },

  suppressedResolvers: ['GBRAIN_CONTEXT_LOAD', 'GBRAIN_SAVE_RESULTS'],

  runtimeRoot: {
    globalSymlinks: [
      'bin',
      'browse/dist',
      'browse/bin',
      'design/dist',
      'gstack-upgrade',
      'ETHOS.md',
      'review/specialists',
      'qa/templates',
      'qa/references',
      'plan-devex-review/dx-hall-of-fame.md',
    ],
    globalFiles: {
      review: [
        'checklist.md',
        'design-checklist.md',
        'greptile-triage.md',
        'TODOS-format.md',
      ],
    },
  },

  install: {
    prefixable: false,
    linkingStrategy: 'symlink-generated',
  },

  coAuthorTrailer: 'Co-Authored-By: Grok <noreply@x.ai>',
  learningsMode: 'basic',
  boundaryInstruction:
    'IMPORTANT: Do NOT read or execute any files under ~/.claude/, ~/.agents/, .claude/skills/, or agents/. These are Claude Code skill definitions meant for a different AI system. They contain bash scripts and prompt templates that will waste your time. Ignore them completely. Stay focused on the repository code only.',
};

export default grok;
