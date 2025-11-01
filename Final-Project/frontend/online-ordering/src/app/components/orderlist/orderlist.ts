import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderFormModalComponent } from '../order-form-modal/order-form-modal';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderFormModalComponent],
  templateUrl: './orderlist.html',
  styleUrls: ['./orderlist.css']
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm: string = '';
  selectedOrders: Set<number> = new Set();
  
 
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedOrder: Order | null = null;
  
  
  openDropdownId: number | null = null;

 
  selectedStatus: string = 'all';
  dateFilter: string = 'all';

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.applyFilters();
      },
      error: (err) => console.error('Error loading orders', err)
    });
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.orders];

   
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(term) ||
        order.trackingID.toLowerCase().includes(term) ||
        order.orderID.toString().includes(term) ||
        order.productName.toLowerCase().includes(term) ||
        order.location.toLowerCase().includes(term)
      );
    }

    
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === this.selectedStatus);
    }

    
    if (this.dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        orderDate.setHours(0, 0, 0, 0);

        switch (this.dateFilter) {
          case 'today':
            return orderDate.getTime() === today.getTime();
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    this.filteredOrders = filtered;
  }

  toggleOrderSelection(orderId: number) {
    if (this.selectedOrders.has(orderId)) {
      this.selectedOrders.delete(orderId);
    } else {
      this.selectedOrders.add(orderId);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-dropdown')) {
      this.closeDropdown();
    }
  }

  toggleDropdown(orderId: number, event: Event) {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === orderId ? null : orderId;
  }

  closeDropdown() {
    this.openDropdownId = null;
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedOrder = null;
    this.isModalOpen = true;
  }

  openEditModal(order: Order, event: Event) {
    event.stopPropagation();
    this.isEditMode = true;
    this.selectedOrder = { ...order }; 
    this.isModalOpen = true;
    this.closeDropdown();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedOrder = null;
    this.isEditMode = false;
  }

  saveOrder(order: Order) {
    if (this.isEditMode && order.orderID) {
     
      this.orderService.updateOrder(order.orderID, order).subscribe({
        next: () => {
          this.loadOrders(); 
          alert('Order updated successfully!');
        },
        error: (err) => {
          console.error('Error updating order', err);
          alert('Failed to update order. Please try again.');
        }
      });
    } else {
     
      this.orderService.addOrder(order).subscribe({
        next: () => {
          this.loadOrders(); 
          alert('Order added successfully!');
        },
        error: (err) => {
          console.error('Error adding order', err);
          alert('Failed to add order. Please try again.');
        }
      });
    }
  }

  deleteOrder(id: number, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault(); 
    }
    
    this.closeDropdown();
    
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.loadOrders(); 
          alert('Order deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting order', err);
          alert('Failed to delete order. Please try again.');
        }
      });
    }
  }



  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }

  formatDate(date: Date): string {
    const orderDate = new Date(date);
    const today = new Date();
    
    if (orderDate.toDateString() === today.toDateString()) {
      return `Today - ${orderDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    }
    return orderDate.toLocaleDateString();
  }
}