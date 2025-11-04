import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';
import { OrderStats } from '../../models/order';

@Component({
  selector: 'app-order-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderstats.html',
  styleUrls: ['./orderstats.css']
})
export class OrderStatsComponent implements OnInit {
  private orderService = inject(OrderService);
  
  stats: OrderStats = { 
    totalOrders: 0, 
    completedOrders: 0, 
    inProcessOrders: 0,
    pendingOrders: 0 
  };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.stats = {
          totalOrders: orders.length,
          completedOrders: orders.filter(o => o.status === 'Completed').length,
          inProcessOrders: orders.filter(o => o.status === 'In Process').length,
          pendingOrders: orders.filter(o => o.status === 'Pending').length
        };
      },
      error: (err) => console.error('Error loading stats', err)
    });
  }
}