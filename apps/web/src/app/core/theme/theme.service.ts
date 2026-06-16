import { computed, effect, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly mode = signal<ThemeMode>('light');

  readonly isDark = computed(() => this.mode() === 'dark');
  readonly currentMode = computed(() => this.mode());

  constructor() {
    effect(() => {
      const mode = this.mode();

      document.documentElement.dataset['theme'] = mode;
      document.documentElement.classList.toggle('dark-theme', mode === 'dark');
    });
  }

  toggleTheme(): void {
    this.mode.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }
}
