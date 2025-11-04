import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order';
import { HeaderComponent } from '../../components/header/header';
import { SidebarComponent } from '../../components/sidebar/sidebar';

interface ChartDataPoint {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface RevenueByMonth {
  month: string;
  revenue: number;
  orders: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './report-analytics.html',
  styleUrls: ['./report-analytics.css']
})
export class AnalyticsComponent implements OnInit {
  private orderService = inject(OrderService);

  isMobileMenuOpen = false;
  isLoading = true;


  statusData: ChartDataPoint[] = [];
  
  revenueByMonth: RevenueByMonth[] = [];
  maxRevenue = 0;

  topProducts: { name: string; revenue: number; orders: number; percentage: number }[] = [];

  topLocations: { location: string; orders: number; percentage: number }[] = [];

  totalRevenue = 0;
  totalOrders = 0;
  averageOrderValue = 0;
  totalCustomers = 0;

  ngOnInit() {
    this.loadAnalyticsData();
  }

  loadAnalyticsData() {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.calculateStatusDistribution(orders);
        // this.calculateRevenueByMonth(orders);
        this.calculateTopProducts(orders);
        this.calculateTopLocations(orders);
        this.calculateSummaryStats(orders);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading analytics', err);
        this.isLoading = false;
      }
    });
  }

  calculateStatusDistribution(orders: Order[]) {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const inProcess = orders.filter(o => o.status === 'In Process').length;
    const pending = orders.filter(o => o.status === 'Pending').length;

    this.statusData = [
      {
        label: 'Completed',
        value: completed,
        percentage: (completed / total) * 100,
        color: '#bac57aff'
      },
      {
        label: 'In Process',
        value: inProcess,
        percentage: (inProcess / total) * 100,
        color: '#eca062ff'
        
      },
      
      {
        label: 'Pending',
        value: pending,
        percentage: (pending / total) * 100,
        color: '#e95353ff'
        
      }
    ];
  }

  calculateTopProducts(orders: Order[]) {
    const productMap = new Map<string, { revenue: number; orders: number }>();
    
    orders.forEach(order => {
      if (productMap.has(order.productName)) {
        const data = productMap.get(order.productName)!;
        data.revenue += order.totalAmount;
        data.orders += 1;
      } else {
        productMap.set(order.productName, {
          revenue: order.totalAmount,
          orders: 1
        });
      }
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    this.topProducts = Array.from(productMap.entries())
      .map(([name, data]) => ({
        name,
        revenue: data.revenue,
        orders: data.orders,
        percentage: (data.revenue / totalRevenue) * 100
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }

  calculateTopLocations(orders: Order[]) {
    const locationMap = new Map<string, number>();
    
    orders.forEach(order => {
      const location = order.location || 'Unknown';
      locationMap.set(location, (locationMap.get(location) || 0) + 1);
    });

    const total = orders.length;

    this.topLocations = Array.from(locationMap.entries())
      .map(([location, orders]) => ({
        location,
        orders,
        percentage: (orders / total) * 100
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
  }

  calculateSummaryStats(orders: Order[]) {
    this.totalOrders = orders.length;
    this.totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    this.averageOrderValue = this.totalOrders > 0 ? this.totalRevenue / this.totalOrders : 0;
    this.totalCustomers = new Set(orders.map(o => o.customerName)).size;
  }

  getBarHeight(revenue: number): string {
    return ((revenue / this.maxRevenue) * 100) + '%';
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