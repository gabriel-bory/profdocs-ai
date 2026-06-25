import type { ProjectArea, RiskLevel } from "./common.types.js";
import type { ProjectStackReport } from "./stack-detector.types.js";
import type {
  RejectedSkillCandidate,
  SkillCandidate,
  SkillManifest,
  SkillSelectionResult,
} from "./skill-registry.types.js";

export interface MockSkillSelectorInput {
  readonly prompt: string;
  readonly stackReport: ProjectStackReport;
  readonly skills: SkillManifest[];
  readonly requestedArea?: ProjectArea;
}

export interface MockSkillSelectorOptions {
  readonly minimumScore: number;
  readonly maximumCandidates: number;
}

export const DEFAULT_MOCK_SKILL_SELECTOR_OPTIONS: MockSkillSelectorOptions = {
  minimumScore: 0.2,
  maximumCandidates: 5,
};

const RISK_WEIGHT: Record<RiskLevel, number> = {
  low: 0.05,
  medium: 0,
  high: -0.05,
};

export function normalizePromptForMockSelection(prompt: string): string {
  return prompt.trim().toLowerCase();
}

export function scoreSkillForPrompt(
  skill: SkillManifest,
  input: MockSkillSelectorInput,
): SkillCandidate {
  const normalizedPrompt = normalizePromptForMockSelection(input.prompt);
  const matchedTriggers = skill.triggers.filter((trigger) =>
    normalizedPrompt.includes(trigger.toLowerCase()),
  );

  const areaScore = input.requestedArea
    ? skill.projectAreas.includes(input.requestedArea)
      ? 0.35
      : 0
    : 0;

  const stackScore = skill.projectAreas.some((area) =>
    input.stackReport.projectAreas.includes(area),
  )
    ? 0.25
    : 0;

  const triggerScore = Math.min(matchedTriggers.length * 0.18, 0.45);
  const riskAdjustment = RISK_WEIGHT[skill.riskLevel];

  const score = Math.max(
    0,
    Math.min(1, areaScore + stackScore + triggerScore + riskAdjustment),
  );

  const rationale =
    matchedTriggers.length > 0
      ? `Matched triggers: ${matchedTriggers.join(", ")}.`
      : "No direct trigger match; selected only if stack or requested area is relevant.";

  return {
    manifest: skill,
    score: Number(score.toFixed(2)),
    matchedTriggers,
    rationale,
  };
}

export function selectMockSkill(
  input: MockSkillSelectorInput,
  options: MockSkillSelectorOptions = DEFAULT_MOCK_SKILL_SELECTOR_OPTIONS,
): SkillSelectionResult {
  const scoredCandidates = input.skills
    .map((skill) => scoreSkillForPrompt(skill, input))
    .sort((left, right) => right.score - left.score);

  const candidates = scoredCandidates
    .filter((candidate) => candidate.score >= options.minimumScore)
    .slice(0, options.maximumCandidates);

  const selectedSkill = candidates.at(0);
  const rejectedCandidates: RejectedSkillCandidate[] = scoredCandidates
    .filter((candidate) => candidate.score < options.minimumScore)
    .map((candidate) => ({
      skillId: candidate.manifest.id,
      reason: `Score ${candidate.score} is below the minimum threshold ${options.minimumScore}.`,
    }));

  const resultBase = {
    candidates,
    rejectedCandidates,
    requiresHumanApproval: true as const,
    providerMode: "mock" as const,
  };

  if (!selectedSkill) {
    return resultBase;
  }

  return {
    ...resultBase,
    selectedSkill,
  };
}

export function explainMockSkillSelection(result: SkillSelectionResult): string {
  if (!result.selectedSkill) {
    return "No local skill passed the mock selector threshold. Human review is required.";
  }

  return [
    `Selected local skill: ${result.selectedSkill.manifest.id}.`,
    `Score: ${result.selectedSkill.score}.`,
    result.selectedSkill.rationale,
    "Mock Provider only. No command execution. Human approval required.",
  ].join(" ");
}
