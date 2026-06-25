import test from "node:test";
import assert from "node:assert/strict";

import {
  PROFDOCS_CURRENT_STACK_REPORT,
  PROFDOCS_LOCAL_SKILL_REGISTRY,
  explainMockSkillSelection,
  normalizePromptForMockSelection,
  selectMockSkill,
} from "../dist/context-engine/index.js";

test("normalizePromptForMockSelection trims and lowercases prompts", () => {
  assert.equal(
    normalizePromptForMockSelection("  Improve Angular UI  "),
    "improve angular ui",
  );
});

test("selectMockSkill selects an Angular skill for Angular UI prompts", () => {
  const result = selectMockSkill({
    prompt: "Improve the Angular Material UI shell with signals and SCSS.",
    requestedArea: "angular",
    stackReport: PROFDOCS_CURRENT_STACK_REPORT,
    skills: PROFDOCS_LOCAL_SKILL_REGISTRY.skills,
  });

  assert.equal(result.providerMode, "mock");
  assert.equal(result.requiresHumanApproval, true);
  assert.equal(result.selectedSkill?.manifest.id, "angular-material-ui-review");
  assert.ok(result.candidates.length >= 1);
  assert.ok((result.selectedSkill?.score ?? 0) > 0);
});

test("selectMockSkill keeps unselected skills in rejectedCandidates when threshold is high", () => {
  const result = selectMockSkill(
    {
      prompt: "Review a generic request.",
      stackReport: PROFDOCS_CURRENT_STACK_REPORT,
      skills: PROFDOCS_LOCAL_SKILL_REGISTRY.skills,
    },
    {
      minimumScore: 0.95,
      maximumCandidates: 5,
    },
  );

  assert.equal(result.providerMode, "mock");
  assert.equal(result.requiresHumanApproval, true);
  assert.equal(result.selectedSkill, undefined);
  assert.ok(result.rejectedCandidates.length >= 1);
});

test("explainMockSkillSelection includes safety boundaries", () => {
  const result = selectMockSkill({
    prompt: "Review context safety and prompt injection boundaries.",
    requestedArea: "context-engine",
    stackReport: PROFDOCS_CURRENT_STACK_REPORT,
    skills: PROFDOCS_LOCAL_SKILL_REGISTRY.skills,
  });

  const explanation = explainMockSkillSelection(result);

  assert.match(explanation, /Mock Provider only/);
  assert.match(explanation, /No command execution/);
  assert.match(explanation, /Human approval required/);
});
