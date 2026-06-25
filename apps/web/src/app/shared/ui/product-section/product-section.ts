import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type ProductSectionVariant = 'default' | 'hero' | 'future';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.html',
  styleUrl: './product-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSectionComponent {
  readonly sectionId = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly variant = input<ProductSectionVariant>('default');

  protected readonly headingId = computed(() => `${this.sectionId()}-title`);
}
