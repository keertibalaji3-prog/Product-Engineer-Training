
export interface Order {
  orderID: number;
  customerName: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  orderDate: Date;
  status: 'Pending' | 'In Process' | 'Completed';
  trackingID: string;
  location: string;
}

export interface OrderStats {
  totalOrders: number;
  completedOrders: number;
  inProcessOrders: number;
}