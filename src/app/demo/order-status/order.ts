export interface Order {
    orderId: string;
    customerName: string;
    orderDate: string;
    estimatedDelivery: string;
    status: 'In Progress' | 'Delivered' | 'Cancelled';
    quantity: number;
    price: number;
    paymentStatus: 'Paid' | 'Pending' | 'Refunded';
    email: string;
    phone: string;
  }
  