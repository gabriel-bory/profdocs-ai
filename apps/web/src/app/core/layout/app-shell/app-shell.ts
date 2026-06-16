import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  protected readonly theme = inject(ThemeService);

  protected readonly navigationItems = [
    { label: 'Dashboard', href: '#dashboard', marker: '01' },
    { label: 'Documents', href: '#documents', marker: '02' },
    { label: 'Upload', href: '#upload-preview', marker: '03' },
    { label: 'AI Preview', href: '#ai-preview', marker: '04' },
  ];

  protected toggleTheme(): void {
    this.theme.toggleTheme();
  }
}
