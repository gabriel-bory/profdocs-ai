import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { distinctUntilChanged, map } from 'rxjs';

import { ContextEnginePreviewPageComponent } from '../../../features/context-engine/pages/context-engine-preview-page/context-engine-preview-page';
import { DashboardPageComponent } from '../../../features/dashboard/pages/dashboard-page/dashboard-page';
import { DocumentLibraryPageComponent } from '../../../features/documents/pages/document-library-page/document-library-page';
import { ProductSectionComponent } from '../../../shared/ui/product-section/product-section';
import { ThemeService } from '../../theme/theme.service';

type NavigationIcon = 'workspace' | 'engine' | 'library' | 'ingestion' | 'roadmap';

interface NavigationItem {
  readonly label: string;
  readonly description: string;
  readonly headerLabel?: string;
  readonly href: string;
  readonly icon: NavigationIcon;
}

@Component({
  selector: 'app-shell',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    ProductSectionComponent,
    DashboardPageComponent,
    ContextEnginePreviewPageComponent,
    DocumentLibraryPageComponent,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly scrollAnimationDurationMs = 640;
  private readonly navigationFocusClass = 'section-navigation-focus';
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

  protected readonly desktopSidebarOpen = signal(false);
  protected readonly mobileSidebarOpen = signal(false);

  protected readonly sidenavMode = computed(() => (this.isDesktop() ? 'side' : 'over'));

  protected readonly activeSectionHref = signal('#workspace');

  protected readonly sidenavOpened = computed(() =>
    this.isDesktop() ? this.desktopSidebarOpen() : this.mobileSidebarOpen(),
  );

  protected readonly sidenavHasBackdrop = computed(() => !this.isDesktop());

  protected readonly sidebarToggleLabel = computed(() => {
    if (this.isDesktop()) {
      return this.desktopSidebarOpen() ? 'Hide product menu' : 'Show product menu';
    }

    return this.mobileSidebarOpen() ? 'Close product menu' : 'Open product menu';
  });

  protected readonly themeToggleIcon = computed(() => (this.theme.isDark() ? '☀' : '☾'));
  protected readonly themeToggleText = computed(() => (this.theme.isDark() ? 'Light' : 'Dark'));

  protected readonly navigationItems: NavigationItem[] = [
    {
      label: 'Workspace Control',
      headerLabel: 'Workspace',
      description: 'Operational overview',
      href: '#dashboard',
      icon: 'workspace',
    },
    {
      label: 'Context Engine',
      headerLabel: 'Engine',
      description: 'Mock orchestration layer',
      href: '#context-engine',
      icon: 'engine',
    },
    {
      label: 'Document Library',
      headerLabel: 'Library',
      description: 'Workspace data assets',
      href: '#documents',
      icon: 'library',
    },
    {
      label: 'Ingestion Pipeline',
      headerLabel: 'Pipeline',
      description: 'Future processing flow',
      href: '#upload-preview',
      icon: 'ingestion',
    },
    {
      label: 'AI Roadmap',
      headerLabel: 'Roadmap',
      description: 'Future RAG boundary',
      href: '#ai-preview',
      icon: 'roadmap',
    },
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

    this.activeSectionHref.set(href);

    this.closeMobileSidebar();
    this.smoothScrollToTarget(target);
    this.markNavigatedSection(target);

    if (this.document.defaultView?.history?.replaceState) {
      this.document.defaultView.history.replaceState(null, '', href);
    }
  }

  private smoothScrollToTarget(target: HTMLElement): void {
    const win = this.document.defaultView;
    const scrollContainer = this.document.querySelector<HTMLElement>('.shell__content');

    if (!win || !scrollContainer) {
      target.scrollIntoView({ block: 'start', inline: 'nearest' });
      return;
    }

    const prefersReducedMotion = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerHeight = this.document.querySelector<HTMLElement>('.topbar')?.offsetHeight ?? 0;
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const extraOffset = 20;
    const targetTop = Math.max(
      0,
      scrollContainer.scrollTop + targetRect.top - containerRect.top - headerHeight - extraOffset,
    );

    if (prefersReducedMotion) {
      scrollContainer.scrollTo({ top: targetTop, behavior: 'auto' });
      return;
    }

    this.animateScroll(scrollContainer, targetTop);
  }

  private animateScroll(container: HTMLElement, targetTop: number): void {
    const win = this.document.defaultView;

    if (!win) {
      container.scrollTop = targetTop;
      return;
    }

    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    const startedAt = win.performance.now();

    const easeInOutCubic = (progress: number): number => 1 - Math.pow(1 - progress, 4);

    const step = (now: number): void => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / this.scrollAnimationDurationMs, 1);

      container.scrollTop = startTop + distance * easeInOutCubic(progress);

      if (progress < 1) {
        win.requestAnimationFrame(step);
      }
    };

    win.requestAnimationFrame(step);
  }


  private markNavigatedSection(target: HTMLElement): void {
    const win = this.document.defaultView;

    if (!win) {
      return;
    }

    const highlightedSections =
      this.document.querySelectorAll<HTMLElement>(`.${this.navigationFocusClass}`);

    highlightedSections.forEach((section) => {
      section.classList.remove(this.navigationFocusClass);
    });

    target.classList.add(this.navigationFocusClass);

    win.setTimeout(() => {
      target.classList.remove(this.navigationFocusClass);
    }, 1350);
  }

  protected handleSidenavClosed(): void {
    this.closeMobileSidebar();
  }
}
