
import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private orderService = inject(OrderService);
  
  isMobileMenuOpen = false;
  isLoading = true;
  
  selectedFilter: string = 'all';
  showFilterDropdown = false;
  
  stats = {
    totalOrders: 0,
    completedOrders: 0,
    inProcessOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    CtotalRevenue: 0
  };


  recentOrders: Order[] = [];
  
  allOrders: Order[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    let filtered = [...this.allOrders];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (this.selectedFilter) {
      case 'today':
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.orderDate);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.getTime() === today.getTime();
        });
        break;
      
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(order => 
          new Date(order.orderDate) >= weekAgo
        );
        break;
      
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter(order => 
          new Date(order.orderDate) >= monthAgo
        );
        break;
      
      default:
      
        break;
    }

    this.calculateStats(filtered);
    this.recentOrders = filtered
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 5);
  }

  calculateStats(orders: Order[]) {
    this.stats.totalOrders = orders.length;
    this.stats.completedOrders = orders.filter(o => o.status === 'Completed').length;
    this.stats.inProcessOrders = orders.filter(o => o.status === 'In Process').length;
    this.stats.pendingOrders = orders.filter(o => o.status === 'Pending').length;
    this.stats.totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    this.stats.CtotalRevenue = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + o.totalAmount, 0);
    
    this.stats.averageOrderValue = this.stats.totalOrders > 0 
      ? this.stats.totalRevenue / this.stats.totalOrders 
      : 0;
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.showFilterDropdown = false;
    this.applyFilter();
  }

  getFilterLabel(): string {
    switch (this.selectedFilter) {
      case 'today': return 'Today';
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      default: return 'All Time';
    }
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}