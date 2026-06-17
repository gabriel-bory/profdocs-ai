import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { distinctUntilChanged, map } from 'rxjs';

import { DashboardPageComponent } from '../../../features/dashboard/pages/dashboard-page/dashboard-page';
import { DocumentLibraryPageComponent } from '../../../features/documents/pages/document-library-page/document-library-page';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-shell',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    DashboardPageComponent,
    DocumentLibraryPageComponent,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShellComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly document = inject(DOCUMENT);

  protected readonly theme = inject(ThemeService);

  protected readonly isDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 901px)').pipe(
      map((state) => state.matches),
      distinctUntilChanged(),
    ),
    {
      initialValue: this.breakpointObserver.isMatched('(min-width: 901px)'),
    },
  );

  protected readonly desktopSidebarOpen = signal(true);
  protected readonly mobileSidebarOpen = signal(false);

  protected readonly sidenavMode = computed(() => (this.isDesktop() ? 'side' : 'over'));

  protected readonly sidenavOpened = computed(() =>
    this.isDesktop() ? this.desktopSidebarOpen() : this.mobileSidebarOpen(),
  );

  protected readonly sidenavHasBackdrop = computed(() => !this.isDesktop());

  protected readonly sidebarToggleLabel = computed(() => {
    if (this.isDesktop()) {
      return this.desktopSidebarOpen() ? 'Hide navigation' : 'Show navigation';
    }

    return this.mobileSidebarOpen() ? 'Close navigation' : 'Open navigation';
  });

  protected readonly themeToggleIcon = computed(() => (this.theme.isDark() ? '☀' : '☾'));
  protected readonly themeToggleText = computed(() => (this.theme.isDark() ? 'Light' : 'Dark'));

  protected readonly navigationItems = [
    { label: 'Dashboard', href: '#dashboard', marker: '01' },
    { label: 'Documents', href: '#documents', marker: '02' },
    { label: 'Upload', href: '#upload-preview', marker: '03' },
    { label: 'AI Preview', href: '#ai-preview', marker: '04' },
  ];

  protected toggleTheme(): void {
    this.theme.toggleTheme();
  }

  protected toggleSidebar(): void {
    if (this.isDesktop()) {
      this.desktopSidebarOpen.update((isOpen) => !isOpen);
      return;
    }

    this.mobileSidebarOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileSidebar(): void {
    if (!this.isDesktop()) {
      this.mobileSidebarOpen.set(false);
    }
  }

  protected navigateToSection(event: MouseEvent, href: string): void {
    event.preventDefault();

    const target = this.document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    const prefersReducedMotion =
      this.document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
      inline: 'nearest',
    });

    this.closeMobileSidebar();

    if (this.document.defaultView?.history?.replaceState) {
      this.document.defaultView.history.replaceState(null, '', href);
    }
  }

  protected handleSidenavClosed(): void {
    this.closeMobileSidebar();
  }
}
