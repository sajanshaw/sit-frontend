import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './order-create.component.html'
})
export default class OrderCreateComponent {
  order: Order = {
    orderId: '',
    customerName: '',
    orderDate: '',
    estimatedDelivery: '',
    status: 'In Progress',
    quantity: 1,
    price: 0,
    paymentStatus: 'Pending',
    email: '',
    phone: ''
  };

  constructor(private orderService: OrderService, private router: Router) { }

  submit() {
    //   this.orderService.create(this.order).subscribe(() => this.router.navigate(['/orders/status']));
    this.orderService.addOrder(this.order); // update BehaviorSubject
    this.router.navigate(['/orders/status']); // navigate after update
  }
}
