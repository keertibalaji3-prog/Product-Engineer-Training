import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form-modal.html',
  styleUrls: ['./order-form-modal.css']
})
export class OrderFormModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() order: Order | null = null;
  @Input() isEditMode: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveOrder = new EventEmitter<Order>();

  formData: Order = {
    orderID: 0,
    customerName: '',
    email: '',
    phone: '',
    productName: '',
    quantity: 1,
    price: 0,
    totalAmount: 0,
    orderDate: new Date(),
    status: 'Pending',
    trackingID: '',
    location: ''
  };

  ngOnInit() {
    if (this.isEditMode && this.order) {
      this.formData = { ...this.order };
    } else {
      this.generateTrackingID();
    }
  }

  ngOnChanges() {
    if (this.isEditMode && this.order) {
      this.formData = { ...this.order };
    } else if (!this.isEditMode) {
      this.resetForm();
      this.generateTrackingID();
    }
  }

  generateTrackingID() {
    this.formData.trackingID = '#TS' + Math.floor(100000 + Math.random() * 900000);
  }

  calculateTotal() {
    this.formData.totalAmount = this.formData.quantity * this.formData.price;
  }

  onSubmit() {
    this.calculateTotal();
    this.saveOrder.emit(this.formData);
    this.close();
  }

  close() {
    this.resetForm();
    this.closeModal.emit();
  }

  resetForm() {
    this.formData = {
      orderID: 0,
      customerName: '',
      email: '',
      phone: '',
      productName: '',
      quantity: 1,
      price: 0,
      totalAmount: 0,
      orderDate: new Date(),
      status: 'Pending',
      trackingID: '',
      location: ''
    };
    this.generateTrackingID();
  }
}