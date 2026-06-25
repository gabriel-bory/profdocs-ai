import test from "node:test";
import assert from "node:assert/strict";

import {
  SAMPLE_PROMPT_REQUEST,
  createMockHumanApprovalRequest,
  createMockPromptIntent,
  createMockPromptOrchestratorPreview,
  createMockPromptRewrite,
  createMockResponsePlan,
  selectMockSkill,
  PROFDOCS_CURRENT_STACK_REPORT,
  PROFDOCS_LOCAL_SKILL_REGISTRY,
} from "../dist/context-engine/index.js";

test("createMockPromptIntent creates a reviewable mock intent", () => {
  const intent = createMockPromptIntent(SAMPLE_PROMPT_REQUEST);

  assert.equal(intent.primaryArea, SAMPLE_PROMPT_REQUEST.projectArea);
  assert.equal(intent.riskLevel, "medium");
  assert.match(intent.rationale, /No real AI provider/);
});

test("createMockPromptRewrite preserves original prompt and approval boundary", () => {
  const rewrite = createMockPromptRewrite(SAMPLE_PROMPT_REQUEST);

  assert.equal(rewrite.originalPrompt, SAMPLE_PROMPT_REQUEST.userPrompt);
  assert.equal(rewrite.requiresHumanApproval, true);
  assert.ok(rewrite.constraints.includes("No command execution."));
});

test("createMockResponsePlan keeps validation commands as suggestions only", () => {
  const skillSelection = selectMockSkill({
    prompt: SAMPLE_PROMPT_REQUEST.userPrompt,
    requestedArea: SAMPLE_PROMPT_REQUEST.projectArea,
    stackReport: PROFDOCS_CURRENT_STACK_REPORT,
    skills: PROFDOCS_LOCAL_SKILL_REGISTRY.skills,
  });

  const responsePlan = createMockResponsePlan(skillSelection);

  assert.equal(responsePlan.requiresHumanApproval, true);
  assert.ok(responsePlan.validationCommands.length >= 1);
  assert.equal(responsePlan.validationCommands[0].isSuggestionOnly, true);
  assert.ok(responsePlan.safetyNotes.includes("No command execution."));
});

test("createMockHumanApprovalRequest creates a pending review gate", () => {
  const skillSelection = selectMockSkill({
    prompt: SAMPLE_PROMPT_REQUEST.userPrompt,
    stackReport: PROFDOCS_CURRENT_STACK_REPORT,
    skills: PROFDOCS_LOCAL_SKILL_REGISTRY.skills,
  });
  const responsePlan = createMockResponsePlan(skillSelection);
  const approval = createMockHumanApprovalRequest(responsePlan);

  assert.equal(approval.status, "pending");
  assert.equal(approval.riskLevel, "medium");
  assert.ok(approval.availableActions.includes("approve-manually"));
  assert.ok(approval.availableActions.includes("reject"));
});

test("createMockPromptOrchestratorPreview returns a full safe mock flow", () => {
  const preview = createMockPromptOrchestratorPreview({
    request: SAMPLE_PROMPT_REQUEST,
  });

  assert.equal(preview.request.id, SAMPLE_PROMPT_REQUEST.id);
  assert.equal(preview.skillSelection.providerMode, "mock");
  assert.equal(preview.skillSelection.requiresHumanApproval, true);
  assert.equal(preview.responsePlan.requiresHumanApproval, true);
  assert.equal(preview.humanApproval.status, "pending");
});
