export type RiskLevel = "low" | "medium" | "high";

export type ConfidenceLevel = "low" | "medium" | "high";

export type ProviderMode = "mock" | "disabled" | "future-provider";

export type ProjectArea =
  | "angular"
  | "nestjs"
  | "astro-docs"
  | "playwright"
  | "postgresql"
  | "github-actions"
  | "context-engine"
  | "skill-registry"
  | "security"
  | "documentation"
  | "deployment"
  | "unknown";

export type ContextAccess = "allowed" | "denied";

export type SourceTrustLevel =
  | "trusted-project-source"
  | "untrusted-retrieved-context"
  | "user-provided";

export interface ContextRule {
  readonly pattern: string;
  readonly access: ContextAccess;
  readonly reason: string;
}

export interface SourceReference {
  readonly path: string;
  readonly title?: string;
  readonly excerpt?: string;
  readonly trustLevel: SourceTrustLevel;
}

export interface ValidationCommand {
  readonly command: string;
  readonly description: string;
  readonly isSuggestionOnly: true;
}

export interface SafetyBoundary {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly riskLevel: RiskLevel;
}
