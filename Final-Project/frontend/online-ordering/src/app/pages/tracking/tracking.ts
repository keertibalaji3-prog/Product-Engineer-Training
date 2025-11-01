import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-tracking',
  standalone: true,

  imports: [CommonModule, SidebarComponent, HeaderComponent],

  templateUrl: './tracking.html',
  styleUrl: './tracking.css',
})
export class Tracking {

}

