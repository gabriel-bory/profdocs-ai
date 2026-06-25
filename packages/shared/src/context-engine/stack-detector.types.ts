import type { ConfidenceLevel, ProjectArea } from "./common.types.js";

export type PackageManager = "pnpm" | "npm" | "yarn" | "unknown";

export type StackCategory =
  | "frontend"
  | "backend"
  | "documentation"
  | "database"
  | "testing"
  | "ci"
  | "architecture-practice";

export interface StackEvidence {
  readonly technology: string;
  readonly sourceFile: string;
  readonly matchedSignal: string;
  readonly confidence: ConfidenceLevel;
}

export interface DetectedTechnology {
  readonly name: string;
  readonly category: StackCategory;
  readonly version?: string;
  readonly evidence: StackEvidence[];
}

export interface ProjectStackReport {
  readonly packageManager: PackageManager;
  readonly projectAreas: ProjectArea[];
  readonly frontend: string[];
  readonly backend: string[];
  readonly documentation: string[];
  readonly database: string[];
  readonly testing: string[];
  readonly ci: string[];
  readonly architecturePractices: string[];
  readonly confidence: ConfidenceLevel;
  readonly evidence: StackEvidence[];
  readonly deniedSources: string[];
  readonly generatedAt?: string;
}
