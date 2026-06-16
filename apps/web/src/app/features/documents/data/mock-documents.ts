import { ProfDocument } from '../models/document.model';

export const MOCK_DOCUMENTS: ProfDocument[] = [
  {
    id: 'DOC-001',
    name: 'clinical-research-protocol.pdf',
    owner: 'Research workspace',
    status: 'ready',
    type: 'PDF',
    updatedAt: '2026-06-16',
    chunks: 42,
  },
  {
    id: 'DOC-002',
    name: 'portfolio-architecture-notes.md',
    owner: 'Product workspace',
    status: 'processing',
    type: 'Markdown',
    updatedAt: '2026-06-15',
    chunks: 18,
  },
  {
    id: 'DOC-003',
    name: 'grant-review-summary.docx',
    owner: 'Academic workspace',
    status: 'uploaded',
    type: 'DOCX',
    updatedAt: '2026-06-14',
    chunks: 0,
  },
  {
    id: 'DOC-004',
    name: 'legacy-scanned-document.pdf',
    owner: 'Research workspace',
    status: 'failed',
    type: 'PDF',
    updatedAt: '2026-06-13',
    chunks: 0,
  },
];
