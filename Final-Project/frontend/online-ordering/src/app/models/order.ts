
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
  pendingOrders: number;
}

export interface Product {
  productName: string;
  totalStock: number;
  totalOrders: number;
  totalRevenue: number;
  lastOrderDate: Date;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}