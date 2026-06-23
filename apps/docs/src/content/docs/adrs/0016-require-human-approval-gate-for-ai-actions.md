---
title: "ADR 0016: Require Human Approval Gate for AI-generated actions"
description: Decision record for preventing autonomous execution of AI-generated commands or changes.
---

# ADR 0016: Require Human Approval Gate for AI-generated actions

## Status

Proposed

## Context

ProfDocs AI may eventually generate plans, prompts, commands, documentation changes, or implementation suggestions.

AI-generated output can be wrong, unsafe, incomplete, destructive, or vulnerable to prompt injection.

The project must remain safe and understandable, especially because it is intended as a public professional portfolio project.

## Decision

ProfDocs AI will require a Human Approval Gate before any AI-generated action can affect the repository, the filesystem, external services, or user data.

The AI layer may propose actions, but it must not execute them automatically.

## Required behavior

The system may produce:

- Suggested commands.
- Suggested files to modify.
- Suggested commits.
- Suggested PR descriptions.
- Suggested issue breakdowns.
- Suggested validation steps.

The system must not automatically:

- Run shell commands.
- Modify repository files without explicit user action.
- Create commits.
- Push branches.
- Open PRs.
- Call external APIs with write permissions.
- Delete files.
- Change environment variables.
- Execute operating system automation.

## Approval model

Any future action should pass through:

```text
AI proposal
  -> Risk summary
  -> Human review
  -> Explicit approval
  -> Manual or controlled execution
  -> Audit record
```

## Security rationale

This protects against:

- Prompt injection.
- Unsafe command generation.
- Secret exfiltration.
- Accidental deletion.
- Incorrect dependency installation.
- Unreviewed repository changes.
- Overclaiming autonomous agent behavior.

## Consequences

This decision keeps ProfDocs AI:

- Safer.
- Easier to trust.
- Easier to explain.
- More suitable for public GitHub review.
- Compatible with future automation, but not dependent on it.

The trade-off is that workflows remain slower and more manual in early phases.

## Future direction

If controlled automation is added later, it should include:

- Allowlisted commands.
- Dry-run mode.
- Risk classification.
- Explicit confirmation.
- Audit logs.
- Rollback guidance.
- Clear separation between planning and execution.
