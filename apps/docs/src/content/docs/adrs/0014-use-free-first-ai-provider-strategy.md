---
title: "ADR 0014: Use a free-first AI provider strategy"
description: Decision record for keeping AI providers optional, interchangeable, and cost-aware.
---

# ADR 0014: Use a free-first AI provider strategy

## Status

Proposed

## Context

ProfDocs AI is designed as a professional document intelligence platform, but the project must avoid paid infrastructure and paid AI APIs as initial dependencies.

The current product does not yet implement real AI, RAG, embeddings, or model provider calls. The next architecture phase should preserve that honesty while preparing the project for future model integration.

ProfDocs AI should be able to start with mock providers and later evolve toward local or free-tier providers when they are available and verified.

## Decision

ProfDocs AI will use a provider abstraction strategy for future LLM and embedding integrations.

The default provider for the first implementation phase will be a mock provider.

Future providers may include:

- Ollama local provider, if the user's hardware supports it.
- GitHub Models provider, only if free access and limits are verified at implementation time.
- Hugging Face provider, only if free-tier availability and limits are verified.
- OpenAI-compatible provider, optional and disabled by default.

The architecture must not require a paid API key to build, test, document, or validate the project.

## Provider levels

### Level 0: Mock Provider

The initial provider should work without internet access, API keys, models, or external services.

It should support:

- Deterministic test responses.
- Prompt rewriting simulation.
- Skill routing simulation.
- Contract tests.
- Documentation examples.

### Level 1: Local or verified free provider

Optional future providers may support:

- Local text generation.
- Local embeddings.
- Small classification models.
- Limited free-tier model calls.

These providers must remain optional and replaceable.

### Level 2: External scalable provider

External paid providers may be supported later through the same interface, but they must not become required for local development or CI validation.

## Consequences

This decision keeps ProfDocs AI:

- Cost-aware.
- Safe for local development.
- Testable without external APIs.
- Easier to explain in GitHub.
- Compatible with multiple future providers.
- Honest about current AI capabilities.

The trade-off is that early outputs will be simulated rather than model-generated.

## Alternatives considered

### Use a paid provider immediately

Rejected.

This would break the project's cost-zero constraint and make CI/local validation harder for a portfolio project.

### Use Ollama as a required provider

Rejected for the first implementation.

Ollama is a strong local-first option, but it depends on hardware and installed models. It should be optional.

### Use GitHub Models as the default provider

Rejected for the first implementation.

GitHub Models may be useful for prototypes, but availability, limits, and terms can change. It should be added only after verification.

### Use no provider abstraction

Rejected.

Without an abstraction, the project would become harder to evolve and easier to lock into one provider.

## Implementation guidance

When implementation begins, provider interfaces should be added before real providers.

The first provider should be:

```text
MockLlmProvider
```

Future providers should implement the same contract without changing the orchestrator domain logic.
