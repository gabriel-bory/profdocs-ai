import type { HumanApprovalRequest } from "./human-approval.types.js";
import type {
  PromptIntent,
  PromptRequest,
  PromptRewriteResult,
  ResponsePlan,
  ResponsePlanStep,
} from "./prompt-orchestrator.types.js";
import type { SkillSelectionResult } from "./skill-registry.types.js";
import type { ProjectStackReport } from "./stack-detector.types.js";
import {
  PROFDOCS_CURRENT_STACK_REPORT,
  PROFDOCS_LOCAL_SKILL_REGISTRY,
  PROFDOCS_VALIDATION_COMMANDS,
} from "./fixtures.js";
import { selectMockSkill } from "./mock-skill-selector.js";

export interface MockPromptOrchestratorInput {
  readonly request: PromptRequest;
  readonly stackReport?: ProjectStackReport;
  readonly skillSelection?: SkillSelectionResult;
}

export interface MockPromptOrchestratorPreview {
  readonly request: PromptRequest;
  readonly intent: PromptIntent;
  readonly stackReport: ProjectStackReport;
  readonly skillSelection: SkillSelectionResult;
  readonly rewrite: PromptRewriteResult;
  readonly responsePlan: ResponsePlan;
  readonly humanApproval: HumanApprovalRequest;
}

export function createMockPromptIntent(request: PromptRequest): PromptIntent {
  return {
    primaryArea: request.projectArea ?? "unknown",
    secondaryAreas: ["context-engine", "documentation"],
    confidence: request.projectArea ? 0.76 : 0.42,
    riskLevel: request.riskMode === "review-required" ? "medium" : "low",
    rationale:
      "Mock intent generated from the requested project area and risk mode. No real AI provider was used.",
  };
}

export function createMockPromptRewrite(
  request: PromptRequest,
): PromptRewriteResult {
  return {
    originalPrompt: request.userPrompt,
    rewrittenPrompt: `Prepare a safe, reviewable plan for: ${request.userPrompt}`,
    assumptions: [
      "This is a mock rewrite.",
      "The user remains responsible for approving any suggested action.",
    ],
    constraints: [
      "No real AI provider.",
      "No command execution.",
      "No automatic file mutation.",
      "Human approval is required.",
    ],
    validationPlan: PROFDOCS_VALIDATION_COMMANDS.map((item) => item.command),
    requiresHumanApproval: true,
  };
}

export function createMockResponsePlan(
  skillSelection: SkillSelectionResult,
): ResponsePlan {
  const selectedSkillId = skillSelection.selectedSkill?.manifest.id;

  const steps: ResponsePlanStep[] = [
    {
      id: "review-request",
      title: "Review request",
      description: "Confirm the user request, project area and safety boundaries.",
      riskLevel: "low",
    },
    {
      id: "prepare-plan",
      title: "Prepare reviewable plan",
      description:
        "Create a suggested plan using local skill metadata and mock provider behavior.",
      riskLevel: "medium",
    },
    {
      id: "validate-manually",
      title: "Validate manually",
      description:
        "Run suggested validation commands manually after reviewing the plan.",
      riskLevel: "medium",
    },
  ];

  const basePlan = {
    summary:
      "Mock response plan generated from local contracts. This plan is suggested only.",
    contextSources: [
      {
        path: "packages/shared/src/context-engine/",
        trustLevel: "trusted-project-source" as const,
      },
      {
        path: "apps/docs/src/content/docs/architecture/",
        trustLevel: "trusted-project-source" as const,
      },
    ],
    excludedSources: [
      {
        path: ".env*",
        trustLevel: "untrusted-retrieved-context" as const,
      },
      {
        path: "node_modules/**",
        trustLevel: "untrusted-retrieved-context" as const,
      },
    ],
    steps,
    validationCommands: PROFDOCS_VALIDATION_COMMANDS,
    suggestedCommitMessage: "feat(ai): add mock skill selector",
    suggestedPrTitle: "feat(ai): add mock skill selector",
    safetyNotes: [
      "Mock Provider only.",
      "No real AI/RAG.",
      "No command execution.",
      "Human approval required.",
    ],
    requiresHumanApproval: true as const,
  };

  if (!selectedSkillId) {
    return basePlan;
  }

  return {
    ...basePlan,
    selectedSkillId,
  };
}

export function createMockHumanApprovalRequest(
  responsePlan: ResponsePlan,
): HumanApprovalRequest {
  return {
    id: "human-approval-mock-001",
    responsePlan,
    status: "pending",
    availableActions: [
      "copy-plan",
      "copy-validation-commands",
      "request-safer-version",
      "approve-manually",
      "reject",
    ],
    riskLevel: "medium",
    requestedAt: new Date(0).toISOString(),
  };
}

export function createMockPromptOrchestratorPreview(
  input: MockPromptOrchestratorInput,
): MockPromptOrchestratorPreview {
  const stackReport = input.stackReport ?? PROFDOCS_CURRENT_STACK_REPORT;

  const skillSelection =
    input.skillSelection ??
    selectMockSkill({
      prompt: input.request.userPrompt,
      ...(input.request.projectArea
        ? { requestedArea: input.request.projectArea }
        : {}),
      stackReport,
      skills: PROFDOCS_LOCAL_SKILL_REGISTRY.skills,
    });

  const intent = createMockPromptIntent(input.request);
  const rewrite = createMockPromptRewrite(input.request);
  const responsePlan = createMockResponsePlan(skillSelection);
  const humanApproval = createMockHumanApprovalRequest(responsePlan);

  return {
    request: input.request,
    intent,
    stackReport,
    skillSelection,
    rewrite,
    responsePlan,
    humanApproval,
  };
}
