import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-block',
  imports: [],
  templateUrl: './skeleton-block.html',
  styleUrl: './skeleton-block.css',
})
export class SkeletonBlockComponent {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly radius = input('0.75rem');
}
