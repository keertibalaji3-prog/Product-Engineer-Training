

import { Component, Input, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  @Input() title: string = 'Order Summary';
  @Input() breadcrumb: string = 'Home / Order';
  
  private router = inject(Router);
  showProfileDropdown: boolean = false;
  userEmail: string = '';

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.showProfileDropdown = false;
    }
  }

  toggleProfileDropdown(event: Event) {
    event.stopPropagation();
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      this.router.navigate(['/login']);
    }
    this.showProfileDropdown = false;
  }
}
