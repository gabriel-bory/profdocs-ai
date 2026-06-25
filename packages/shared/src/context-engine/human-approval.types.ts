import type { RiskLevel } from "./common.types.js";
import type { ResponsePlan } from "./prompt-orchestrator.types.js";

export type HumanApprovalStatus = "pending" | "approved" | "rejected" | "needs-safer-version";

export type HumanApprovalAction =
  | "copy-plan"
  | "copy-validation-commands"
  | "request-safer-version"
  | "approve-manually"
  | "reject";

export interface HumanApprovalRequest {
  readonly id: string;
  readonly responsePlan: ResponsePlan;
  readonly status: HumanApprovalStatus;
  readonly availableActions: HumanApprovalAction[];
  readonly riskLevel: RiskLevel;
  readonly requestedAt: string;
}

export interface HumanApprovalDecision {
  readonly requestId: string;
  readonly status: HumanApprovalStatus;
  readonly reviewerNote?: string;
  readonly decidedAt: string;
}
