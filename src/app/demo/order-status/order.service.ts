import { Injectable } from '@angular/core';
import { Order } from './order';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSource = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSource.asObservable();
  private orders: Order[] = [
    {
      orderId: '1001',
      customerName: 'John Doe',
      orderDate: '2024-04-01',
      estimatedDelivery: '2024-04-05',
      status: 'In Progress',
      quantity: 2,
      price: 50.00,
      paymentStatus: 'Paid',
      email: 'john@example.com',
      phone: '9876543210'
    },
    {
      orderId: '1002',
      customerName: 'Jane Smith',
      orderDate: '2024-03-28',
      estimatedDelivery: '2024-04-03',
      status: 'Delivered',
      quantity: 1,
      price: 30.00,
      paymentStatus: 'Paid',
      email: 'jane@example.com',
      phone: '9123456780'
    },
    {
      orderId: '1003',
      customerName: 'Mike Brown',
      orderDate: '2024-04-02',
      estimatedDelivery: '2024-04-07',
      status: 'Cancelled',
      quantity: 3,
      price: 90.00,
      paymentStatus: 'Refunded',
      email: 'mike@example.com',
      phone: '9988776655'
    }
  ];

  getAll(): Observable<Order[]> {
    return of(this.orders);
  }

  getById(orderId: string): Observable<Order | undefined> {
    return of(this.orders.find(o => o.orderId === orderId));
  }

  create(order: Order): Observable<void> {
    this.orders.unshift(order);
    return of();
  }

  update(orderId: string, order: Order): Observable<void> {
    const idx = this.orders.findIndex(o => o.orderId === orderId);
    if (idx > -1) this.orders[idx] = order;
    return of();
  }

  delete(orderId: string): Observable<void> {
    this.orders = this.orders.filter(o => o.orderId !== orderId);
    return of();
  }

  setInitialOrders(orders: any[]) {
    if (this.ordersSource.value.length === 0) {
      this.ordersSource.next(orders);
    }
  }
  addOrder(newOrder: any) {
    const current = this.ordersSource.value;
    this.ordersSource.next([...current, newOrder]);
  }
}
