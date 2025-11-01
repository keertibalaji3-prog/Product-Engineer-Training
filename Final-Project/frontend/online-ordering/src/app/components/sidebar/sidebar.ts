import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  menuItems = [
    { icon: 'bx bx-grid-alt', label: 'Dashboard', route: '/dashboard' },
    { icon: 'bx bx-package', label: 'Inventory', route: '/inventory' },
    { icon: 'bx bx-map', label: 'Tracking', route: '/tracking' },
    { icon: 'bx bx-receipt', label: 'Orders', route: '/orders', active: true },
    { icon: 'bx bx-bar-chart', label: 'Report Analytics', route: '/analytics' },
    { icon: 'bx bx-user', label: 'User Authentication', route: '/auth' },
    { icon: 'bx bx-cog', label: 'Setting', route: '/settings' }
  ];
}

