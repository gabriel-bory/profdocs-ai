export type DocumentStatus = 'uploaded' | 'processing' | 'ready' | 'failed';

export interface ProfDocument {
  id: string;
  name: string;
  owner: string;
  status: DocumentStatus;
  type: string;
  updatedAt: string;
  chunks: number;
}
