import type { ProviderMode } from "./common.types.js";
import type { ResponsePlan } from "./prompt-orchestrator.types.js";

export const MOCK_PROVIDER_LABEL = "Mock Provider" as const;

export interface MockProviderResponse {
  readonly id: string;
  readonly providerMode: Extract<ProviderMode, "mock">;
  readonly message: string;
  readonly responsePlan: ResponsePlan;
  readonly warnings: string[];
  readonly generatedAt: string;
}
