import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'profdocs-ai.theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly mode = signal<ThemeMode>(this.getInitialTheme());

  readonly theme = this.mode.asReadonly();
  readonly isDark = computed(() => this.mode() === 'dark');
  readonly toggleLabel = computed(() => (this.isDark() ? 'Light' : 'Dark'));

  constructor() {
    effect(() => {
      const theme = this.mode();
      const root = this.document.documentElement;

      root.dataset['theme'] = theme;
      root.classList.toggle('dark-theme', theme === 'dark');
      root.style.colorScheme = theme;

      this.persistTheme(theme);
    });
  }

  toggleTheme(): void {
    this.mode.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: ThemeMode): void {
    this.mode.set(theme);
  }

  private getInitialTheme(): ThemeMode {
    const defaultView = this.document.defaultView;

    try {
      const storedTheme = defaultView?.localStorage.getItem(THEME_STORAGE_KEY);

      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    } catch {
      // Ignore storage access errors and fall back to system preference.
    }

    const prefersDark = defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }

  private persistTheme(theme: ThemeMode): void {
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage access errors. Theme still works for the current session.
    }
  }
}
