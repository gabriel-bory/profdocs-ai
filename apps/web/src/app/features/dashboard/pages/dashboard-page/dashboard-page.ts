import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SkeletonBlockComponent } from '../../../../shared/ui/skeleton-block/skeleton-block';
import { MetricCardComponent } from '../../ui/metric-card/metric-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [MatCardModule, MatProgressBarModule, MetricCardComponent, SkeletonBlockComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPageComponent {
  protected readonly isLoading = signal(true);

  protected readonly metrics = [
    {
      label: 'Total documents',
      value: '128',
      helper: 'Mocked documents in the workspace',
      tone: 'primary' as const,
    },
    {
      label: 'Ready',
      value: '96',
      helper: 'Available for future grounded answers',
      tone: 'success' as const,
    },
    {
      label: 'Processing',
      value: '24',
      helper: 'Queued for the future ingestion pipeline',
      tone: 'warning' as const,
    },
    {
      label: 'Failed',
      value: '8',
      helper: 'Need review before retrying',
      tone: 'danger' as const,
    },
  ];

  protected readonly readinessScore = 74;

  protected readonly activity = [
    'Knowledge base readiness score recalculated',
    'Clinical protocol uploaded as mock document',
    'Three files marked as ready',
  ];

  constructor() {
    window.setTimeout(() => this.isLoading.set(false), 900);
  }
}
