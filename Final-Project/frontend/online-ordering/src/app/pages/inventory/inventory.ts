

import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { InventoryService } from '../../services/inventory';
import { OrderService } from '../../services/order';
import { Product } from '../../models/order';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private orderService = inject(OrderService);

  isMobileMenuOpen = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  openDropdownIndex: number | null = null;
  isLoading = true;


  totalProducts = 0;
  totalStock = 0;
  totalRevenue = 0;
  lowStockProducts = 0;

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.isLoading = true;
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.calculateStats();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading inventory', err);
        this.isLoading = false;
      }
    });
  }

  calculateStats() {
    this.totalProducts = this.products.length;
    this.totalStock = this.products.reduce((sum, p) => sum + p.totalStock, 0);
    this.totalRevenue = this.products.reduce((sum, p) => sum + p.totalRevenue, 0);
    this.lowStockProducts = this.products.filter(p => p.totalStock < 10).length;
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(term)
    );
  }

  toggleDropdown(index: number, event: Event) {
    event.stopPropagation();
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  closeDropdown() {
    this.openDropdownIndex = null;
  }

  deleteProduct(productName: string, event: Event) {
    event.stopPropagation();
    this.closeDropdown();
    
    if (confirm(`Are you sure you want to remove all orders for "${productName}"?`)) {
  
      this.inventoryService.getProductDetails(productName).subscribe({
        next: (orders) => {
         
          let deletedCount = 0;
          orders.forEach(order => {
            this.orderService.deleteOrder(order.orderID).subscribe({
              next: () => {
                deletedCount++;
                if (deletedCount === orders.length) {
                  alert(`Product "${productName}" and all its orders have been removed.`);
                  this.loadInventory();
                }
              }
            });
          });
        }
      });
    }
  }

  getStockStatus(stock: number): string {
    if (stock < 10) return 'low';
    if (stock < 50) return 'medium';
    return 'high';
  }

  getStockStatusText(stock: number): string {
    if (stock < 10) return 'Low Stock';
    if (stock < 50) return 'Medium Stock';
    return 'In Stock';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-dropdown')) {
      this.closeDropdown();
    }
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