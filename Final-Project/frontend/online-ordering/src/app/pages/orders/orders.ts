import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { OrderStatsComponent } from '../../components/orderstats/orderstats';
import { OrderListComponent } from '../../components/orderlist/orderlist';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    OrderStatsComponent,
    OrderListComponent
  ],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent {}