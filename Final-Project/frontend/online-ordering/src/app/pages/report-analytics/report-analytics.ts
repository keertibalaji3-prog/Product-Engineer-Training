import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-report-analytics',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './report-analytics.html',
  styleUrl: './report-analytics.css',
})
export class ReportAnalytics {

}

