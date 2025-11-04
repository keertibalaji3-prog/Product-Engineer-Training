import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product, Order } from '../models/order';
import { OrderService } from './order';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private orderService = inject(OrderService);

  getInventory(): Observable<Product[]> {
    return this.orderService.getAllOrders().pipe(
      map(orders => {
 
        const productMap = new Map<string, Product>();

        orders.forEach(order => {
          const productName = order.productName;
          
          if (productMap.has(productName)) {
            const product = productMap.get(productName)!;
            product.totalStock += order.quantity;
            product.totalOrders += 1;
            product.totalRevenue += order.totalAmount;
            
            
            if (new Date(order.orderDate) > product.lastOrderDate) {
              product.lastOrderDate = new Date(order.orderDate);
            }
          } else {
            productMap.set(productName, {
              productName: productName,
              totalStock: order.quantity,
              totalOrders: 1,
              totalRevenue: order.totalAmount,
              lastOrderDate: new Date(order.orderDate)
            });
          }
        });

        return Array.from(productMap.values()).sort((a, b) => 
          b.totalRevenue - a.totalRevenue
        );
      })
    );
  }

  getProductDetails(productName: string): Observable<Order[]> {
    return this.orderService.getAllOrders().pipe(
      map(orders => orders.filter(order => order.productName === productName))
    );
  }
}