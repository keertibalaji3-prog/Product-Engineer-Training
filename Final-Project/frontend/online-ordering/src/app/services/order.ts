

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Order, OrderStats } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Orders`;

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: Order): Observable<any> {
    return this.http.post(this.apiUrl, order, { responseType: 'text' });
  }

  updateOrder(id: number, order: Order): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, order, { responseType: 'text' });
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  getOrderStats(): Observable<OrderStats> {
    return this.getAllOrders().pipe(
      map(orders => ({
        totalOrders: orders.length,
        completedOrders: orders.filter(o => o.status === 'Completed').length,
        inProcessOrders: orders.filter(o => o.status === 'In Process').length,
        pendingOrders: orders.filter(o => o.status === 'Pending').length
      }))
    );
  }
}