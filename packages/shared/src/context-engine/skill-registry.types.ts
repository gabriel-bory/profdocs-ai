import type {
  ContextRule,
  ProjectArea,
  ProviderMode,
  RiskLevel,
  ValidationCommand,
} from "./common.types.js";

export interface SkillManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly projectAreas: ProjectArea[];
  readonly triggers: string[];
  readonly allowedContext: ContextRule[];
  readonly deniedContext: ContextRule[];
  readonly outputContract: string;
  readonly validationCommands: ValidationCommand[];
  readonly riskLevel: RiskLevel;
  readonly requiresHumanApproval: true;
  readonly providerMode: ProviderMode;
}

export interface SkillCandidate {
  readonly manifest: SkillManifest;
  readonly score: number;
  readonly matchedTriggers: string[];
  readonly rationale: string;
}

export interface RejectedSkillCandidate {
  readonly skillId: string;
  readonly reason: string;
}

export interface SkillSelectionResult {
  readonly selectedSkill?: SkillCandidate;
  readonly candidates: SkillCandidate[];
  readonly rejectedCandidates: RejectedSkillCandidate[];
  readonly requiresHumanApproval: true;
  readonly providerMode: ProviderMode;
}

export interface SkillRegistrySnapshot {
  readonly source: "local";
  readonly externalSkillsEnabled: false;
  readonly skills: SkillManifest[];
}
