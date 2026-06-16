import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { SkeletonBlockComponent } from '../../../../shared/ui/skeleton-block/skeleton-block';
import { MOCK_DOCUMENTS } from '../../data/mock-documents';
import { DocumentStatus } from '../../models/document.model';
import { DocumentStatusChipComponent } from '../../ui/document-status-chip/document-status-chip';

type StatusFilter = DocumentStatus | 'all';

@Component({
  selector: 'app-document-library-page',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    DocumentStatusChipComponent,
    SkeletonBlockComponent,
  ],
  templateUrl: './document-library-page.html',
  styleUrl: './document-library-page.scss',
})
export class DocumentLibraryPageComponent {
  protected readonly isLoading = signal(true);
  protected readonly displayedColumns: string[] = ['id', 'name', 'status', 'type', 'chunks', 'updatedAt'];

  protected readonly documents = signal(MOCK_DOCUMENTS);
  protected readonly query = signal('');
  protected readonly statusFilter = signal<StatusFilter>('all');

  protected readonly filteredDocuments = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.statusFilter();

    return this.documents().filter((document) => {
      const matchesQuery =
        !query ||
        document.id.toLowerCase().includes(query) ||
        document.name.toLowerCase().includes(query) ||
        document.owner.toLowerCase().includes(query);

      const matchesStatus = status === 'all' || document.status === status;

      return matchesQuery && matchesStatus;
    });
  });

  constructor() {
    window.setTimeout(() => this.isLoading.set(false), 1250);
  }

  protected updateQuery(value: string): void {
    this.query.set(value);
  }

  protected updateStatus(value: StatusFilter): void {
    this.statusFilter.set(value);
  }
}
