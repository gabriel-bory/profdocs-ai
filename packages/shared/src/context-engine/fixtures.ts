import type { ContextRule, ValidationCommand } from "./common.types.js";
import type { ProjectStackReport } from "./stack-detector.types.js";
import type { SkillManifest, SkillRegistrySnapshot } from "./skill-registry.types.js";
import type { PromptRequest, ResponsePlan } from "./prompt-orchestrator.types.js";

export const PROFDOCS_DENIED_CONTEXT_RULES: ContextRule[] = [
  {
    pattern: ".env*",
    access: "denied",
    reason: "Environment files may contain secrets.",
  },
  {
    pattern: "node_modules/**",
    access: "denied",
    reason: "Dependency folders are not useful project context.",
  },
  {
    pattern: "dist/**",
    access: "denied",
    reason: "Generated build output should not be used as source context.",
  },
  {
    pattern: "test-results/**",
    access: "denied",
    reason: "Generated test artifacts should not be indexed by default.",
  },
  {
    pattern: "playwright-report/**",
    access: "denied",
    reason: "Generated Playwright reports should be reviewed manually.",
  },
];

export const PROFDOCS_VALIDATION_COMMANDS: ValidationCommand[] = [
  {
    command: "pnpm build:docs",
    description: "Validate Astro/Starlight documentation.",
    isSuggestionOnly: true,
  },
  {
    command: "pnpm build:web",
    description: "Validate the Angular application build.",
    isSuggestionOnly: true,
  },
  {
    command: "pnpm build:api",
    description: "Validate the NestJS API build.",
    isSuggestionOnly: true,
  },
];

export const PROFDOCS_CURRENT_STACK_REPORT: ProjectStackReport = {
  packageManager: "pnpm",
  projectAreas: [
    "angular",
    "nestjs",
    "astro-docs",
    "playwright",
    "postgresql",
    "github-actions",
    "context-engine",
    "documentation",
  ],
  frontend: ["Angular 21", "Angular Material/CDK", "TypeScript", "SCSS"],
  backend: ["NestJS foundation", "TypeScript"],
  documentation: ["Astro", "Starlight", "MDX", "Architecture Decision Records"],
  database: ["PostgreSQL 18 via Docker Compose", "pgvector planned"],
  testing: ["Playwright visual evidence", "future unit tests"],
  ci: ["GitHub Actions", "GitHub Pages"],
  architecturePractices: ["Documentation as Code", "ADRs", "Conventional Commits"],
  confidence: "high",
  evidence: [
    {
      technology: "Angular 21",
      sourceFile: "apps/web/package.json",
      matchedSignal: "@angular/core",
      confidence: "high",
    },
    {
      technology: "NestJS",
      sourceFile: "apps/api/package.json",
      matchedSignal: "@nestjs/core",
      confidence: "high",
    },
    {
      technology: "Astro Starlight",
      sourceFile: "apps/docs/astro.config.mjs",
      matchedSignal: "@astrojs/starlight",
      confidence: "high",
    },
  ],
  deniedSources: PROFDOCS_DENIED_CONTEXT_RULES.map((rule) => rule.pattern),
};

export const PROFDOCS_LEVEL0_SKILLS: SkillManifest[] = [
  {
    id: "angular-material-ui-review",
    name: "Angular Material UI Review",
    version: "0.1.0",
    description: "Reviews Angular Material UI plans using the existing ProfDocs AI frontend patterns.",
    projectAreas: ["angular"],
    triggers: ["angular", "material", "ui", "component", "signals", "scss"],
    allowedContext: [
      {
        pattern: "apps/web/src/**",
        access: "allowed",
        reason: "Frontend source files are relevant for Angular UI review.",
      },
    ],
    deniedContext: PROFDOCS_DENIED_CONTEXT_RULES,
    outputContract: "frontend-architecture-review-plan",
    validationCommands: PROFDOCS_VALIDATION_COMMANDS,
    riskLevel: "medium",
    requiresHumanApproval: true,
    providerMode: "mock",
  },
  {
    id: "nestjs-api-architecture-review",
    name: "NestJS API Architecture Review",
    version: "0.1.0",
    description: "Reviews backend architecture plans before any real Context Engine runtime is implemented.",
    projectAreas: ["nestjs", "context-engine"],
    triggers: ["nestjs", "api", "dto", "module", "service", "contract"],
    allowedContext: [
      {
        pattern: "apps/api/src/**",
        access: "allowed",
        reason: "Backend source files are relevant for API architecture review.",
      },
    ],
    deniedContext: PROFDOCS_DENIED_CONTEXT_RULES,
    outputContract: "backend-contract-review-plan",
    validationCommands: PROFDOCS_VALIDATION_COMMANDS,
    riskLevel: "medium",
    requiresHumanApproval: true,
    providerMode: "mock",
  },
  {
    id: "context-engine-safety-review",
    name: "Context Engine Safety Review",
    version: "0.1.0",
    description: "Reviews prompt injection, denied context, provider mode and Human Approval Gate boundaries.",
    projectAreas: ["context-engine", "security"],
    triggers: ["context", "safety", "approval", "provider", "prompt injection"],
    allowedContext: [
      {
        pattern: "apps/docs/src/content/docs/**",
        access: "allowed",
        reason: "Architecture and ADR pages are relevant for safety review.",
      },
    ],
    deniedContext: PROFDOCS_DENIED_CONTEXT_RULES,
    outputContract: "context-engine-safety-review-plan",
    validationCommands: PROFDOCS_VALIDATION_COMMANDS,
    riskLevel: "high",
    requiresHumanApproval: true,
    providerMode: "mock",
  },
];

export const PROFDOCS_LOCAL_SKILL_REGISTRY: SkillRegistrySnapshot = {
  source: "local",
  externalSkillsEnabled: false,
  skills: PROFDOCS_LEVEL0_SKILLS,
};

export const SAMPLE_PROMPT_REQUEST: PromptRequest = {
  id: "prompt-request-playwright-docs-001",
  userPrompt: "Improve the Playwright evidence workflow and document it professionally.",
  projectArea: "playwright",
  currentBranch: "feat/ai-prompt-orchestrator-contracts",
  allowedSources: ["apps/web/e2e/**", "apps/docs/src/content/docs/**"],
  deniedSources: PROFDOCS_DENIED_CONTEXT_RULES.map((rule) => rule.pattern),
  riskMode: "review-required",
};

export const SAMPLE_RESPONSE_PLAN: ResponsePlan = {
  summary: "Prepare a reviewable plan for improving Playwright evidence documentation.",
  selectedSkillId: "context-engine-safety-review",
  contextSources: [
    {
      path: "apps/docs/src/content/docs/adrs/",
      trustLevel: "trusted-project-source",
    },
  ],
  excludedSources: [
    {
      path: ".env*",
      trustLevel: "untrusted-retrieved-context",
    },
  ],
  steps: [
    {
      id: "review-current-evidence",
      title: "Review current evidence",
      description: "Inspect current Playwright evidence and related documentation.",
      riskLevel: "low",
    },
    {
      id: "prepare-safe-plan",
      title: "Prepare safe plan",
      description: "Suggest changes without executing commands automatically.",
      riskLevel: "medium",
    },
  ],
  validationCommands: PROFDOCS_VALIDATION_COMMANDS,
  suggestedCommitMessage: "docs(testing): improve Playwright evidence workflow",
  suggestedPrTitle: "docs(testing): improve Playwright evidence workflow",
  safetyNotes: [
    "Mock Provider only.",
    "No command execution.",
    "Human approval required.",
  ],
  requiresHumanApproval: true,
};
