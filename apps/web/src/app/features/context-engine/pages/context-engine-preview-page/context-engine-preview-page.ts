import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  createMockPromptOrchestratorPreview,
  SAMPLE_PROMPT_REQUEST,
  type PromptRequest,
} from '@profdocs-ai/shared/context-engine';

interface EngineModuleCard {
  readonly label: string;
  readonly value: string;
  readonly helper: string;
  readonly tone: 'ready' | 'mock' | 'future';
}

@Component({
  selector: 'app-context-engine-preview-page',
  imports: [DecimalPipe, MatButtonModule, MatCardModule],
  templateUrl: './context-engine-preview-page.html',
  styleUrl: './context-engine-preview-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextEnginePreviewPageComponent {
  private readonly request: PromptRequest = {
    ...SAMPLE_PROMPT_REQUEST,
    id: 'context-engine-preview-001',
    userPrompt:
      'Analyze Playwright evidence, select a safe local skill, rewrite the prompt and prepare a human-reviewed response plan.',
    projectArea: 'context-engine',
    riskMode: 'review-required',
  };

  protected readonly preview = createMockPromptOrchestratorPreview({
    request: this.request,
  });

  protected readonly selectedSkill = this.preview.skillSelection.selectedSkill;

  protected readonly selectedSkillId = this.selectedSkill?.manifest.id ?? null;
  protected readonly selectedSkillName =
    this.selectedSkill?.manifest.name ?? 'No skill selected';
  protected readonly selectedSkillRationale =
    this.selectedSkill?.rationale ??
    'The mock selector did not find a safe candidate.';
  protected readonly selectedSkillScore = this.selectedSkill?.score ?? 0;

  protected readonly safetySnapshot = JSON.stringify(
    {
      providerMode: this.preview.skillSelection.providerMode,
      requiresHumanApproval: this.preview.responsePlan.requiresHumanApproval,
      suggestedCommit: this.preview.responsePlan.suggestedCommitMessage,
      realAI: false,
      rag: false,
      commandExecution: false,
    },
    null,
    2,
  );

  protected readonly readinessScore = 68;

  protected readonly moduleCards: EngineModuleCard[] = [
    {
      label: 'Stack Detector',
      value: 'Typed',
      helper: 'Project stack report is available as a shared contract.',
      tone: 'ready',
    },
    {
      label: 'Skill Selector',
      value: 'Mock',
      helper: 'Rule-based local skill scoring is deterministic and tested.',
      tone: 'mock',
    },
    {
      label: 'Human Approval',
      value: 'Required',
      helper: 'The mock response plan always waits for manual review.',
      tone: 'ready',
    },
    {
      label: 'Provider Mode',
      value: 'Mock',
      helper: 'No external provider or model call is made.',
      tone: 'mock',
    },
    {
      label: 'RAG',
      value: 'Future',
      helper: 'Embeddings and pgvector remain architecture-only.',
      tone: 'future',
    },
    {
      label: 'Real AI',
      value: 'Not active',
      helper: 'Ollama, GitHub Models and cloud providers are not wired yet.',
      tone: 'future',
    },
  ];

  protected readonly roadmap = [
    'Mock selector and contracts are implemented.',
    'Angular preview consumes typed shared data only.',
    'Future NestJS services can wrap these contracts later.',
    'Real RAG must wait for safe repository context retrieval.',
  ];
}
