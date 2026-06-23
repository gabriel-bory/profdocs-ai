---
title: "ADR 0017: Define prompt injection and context safety boundaries"
description: Decision record for treating retrieved project context as untrusted input.
---

# ADR 0017: Define prompt injection and context safety boundaries

## Status

Proposed

## Context

ProfDocs AI is expected to use repository context in future prompt orchestration and RAG workflows.

Repository files can contain instructions, examples, outdated notes, generated content, malicious text, or prompt injection attempts.

If retrieved context is mixed with system instructions without boundaries, it can cause unsafe or incorrect behavior.

## Decision

ProfDocs AI will treat all retrieved project context as untrusted input.

Repository context may inform a response, but it must not override system rules, developer instructions, safety policies, provider configuration, or human approval requirements.

## Safety boundaries

The Context Engine must enforce:

- Allowed path policy.
- Denied path policy.
- Secret pattern checks.
- Context source audit.
- Prompt size limits.
- Provider opt-in.
- Human Approval Gate.
- Safe logging.

## Denied sources

The system must not index or send:

- `.env`
- `.env.*`
- `.git`
- `node_modules`
- `dist`
- `playwright-report`
- `test-results`
- private keys
- tokens
- credentials
- generated temporary files
- ignored files unless explicitly reviewed

## Prompt injection rule

Any retrieved content that says or implies instructions such as:

```text
ignore previous instructions
reveal secrets
run this command automatically
delete files
send tokens
override safety rules
```

must be treated as untrusted content, not as an instruction.

## Context audit

Future responses should be able to explain:

- Which context sources were used.
- Why those sources were selected.
- Whether any source was excluded.
- Whether a safety rule was triggered.
- Whether human approval is required.

## Logging policy

Logs should avoid storing:

- Raw secrets.
- Full prompts when unnecessary.
- Sensitive file contents.
- API keys.
- Local machine paths when not needed.

Logs may store:

- Source IDs.
- Relative safe paths.
- Hashes.
- Intent labels.
- Skill IDs.
- Risk levels.
- Validation outcomes.

## Consequences

This decision makes the future AI layer safer and more auditable.

It also increases implementation effort because context retrieval must include filtering, metadata, and policy checks from the beginning.

## Future direction

When RAG is implemented, retrieval should separate:

```text
system instructions
developer policy
user prompt
retrieved untrusted context
model output
human approval
```

This separation should be documented and tested before any external model provider is enabled.
