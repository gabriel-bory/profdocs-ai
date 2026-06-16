import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type MetricTone = 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-metric-card',
  imports: [MatCardModule],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.scss',
})
export class MetricCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly helper = input.required<string>();
  readonly tone = input<MetricTone>('primary');
}
