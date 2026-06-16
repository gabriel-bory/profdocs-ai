import { Component, computed, input } from '@angular/core';

import { DocumentStatus } from '../../models/document.model';

@Component({
  selector: 'app-document-status-chip',
  imports: [],
  templateUrl: './document-status-chip.html',
  styleUrl: './document-status-chip.css',
})
export class DocumentStatusChipComponent {
  readonly status = input.required<DocumentStatus>();

  protected readonly label = computed(() => {
    switch (this.status()) {
      case 'uploaded':
        return 'Uploaded';
      case 'processing':
        return 'Processing';
      case 'ready':
        return 'Ready';
      case 'failed':
        return 'Failed';
    }
  });

  protected readonly icon = computed(() => {
    switch (this.status()) {
      case 'uploaded':
        return '↑';
      case 'processing':
        return '…';
      case 'ready':
        return '✓';
      case 'failed':
        return '!';
    }
  });
}
