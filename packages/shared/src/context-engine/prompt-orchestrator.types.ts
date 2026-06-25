import type {
  ProjectArea,
  RiskLevel,
  SourceReference,
  ValidationCommand,
} from "./common.types.js";
import type { ProjectStackReport } from "./stack-detector.types.js";
import type { SkillSelectionResult } from "./skill-registry.types.js";

export type PromptRiskMode = "safe" | "review-required";

export interface PromptRequest {
  readonly id: string;
  readonly userPrompt: string;
  readonly projectArea?: ProjectArea;
  readonly currentBranch?: string;
  readonly allowedSources?: string[];
  readonly deniedSources?: string[];
  readonly riskMode: PromptRiskMode;
  readonly createdAt?: string;
}

export interface PromptIntent {
  readonly primaryArea: ProjectArea;
  readonly secondaryAreas: ProjectArea[];
  readonly confidence: number;
  readonly riskLevel: RiskLevel;
  readonly rationale: string;
}

export interface PromptRewriteResult {
  readonly originalPrompt: string;
  readonly rewrittenPrompt: string;
  readonly assumptions: string[];
  readonly constraints: string[];
  readonly validationPlan: string[];
  readonly requiresHumanApproval: true;
}

export interface ResponsePlanStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly riskLevel: RiskLevel;
}

export interface ResponsePlan {
  readonly summary: string;
  readonly selectedSkillId?: string;
  readonly contextSources: SourceReference[];
  readonly excludedSources: SourceReference[];
  readonly steps: ResponsePlanStep[];
  readonly validationCommands: ValidationCommand[];
  readonly suggestedCommitMessage?: string;
  readonly suggestedPrTitle?: string;
  readonly safetyNotes: string[];
  readonly requiresHumanApproval: true;
}

export interface PromptOrchestratorResult {
  readonly request: PromptRequest;
  readonly intent: PromptIntent;
  readonly stackReport: ProjectStackReport;
  readonly skillSelection: SkillSelectionResult;
  readonly rewrite: PromptRewriteResult;
  readonly responsePlan: ResponsePlan;
}
