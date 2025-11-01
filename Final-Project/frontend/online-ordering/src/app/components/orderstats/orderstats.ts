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
  stats: OrderStats = { totalOrders: 0, completedOrders: 0, inProcessOrders: 0 };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.orderService.getOrderStats().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error('Error loading stats', err)
    });
  }
}