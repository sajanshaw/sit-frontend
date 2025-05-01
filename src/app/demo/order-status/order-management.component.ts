import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './order-management.component.html',

})
export default class OrdersComponent {
  orders = [
    { orderId: '1001', customerName: 'Alice Johnson', orderDate: '2024-04-01', estimatedDelivery: '2024-04-05', status: 'In Progress', quantity: 10, price: 150, paymentStatus: 'Paid', email: 'alice@sit.com', phone: '1234567890' },
    { orderId: '1002', customerName: 'Bob Smith', orderDate: '2024-03-28', estimatedDelivery: '2024-04-03', status: 'Delivered', quantity: 5, price: 75, paymentStatus: 'Pending', email: 'bob@sit.com', phone: '0987654321' },
    { orderId: '1003', customerName: 'Charlie Brown', orderDate: '2024-03-28', estimatedDelivery: '2024-04-03', status: 'Delivered', quantity: 5, price: 75, paymentStatus: 'Pending', email: 'charli@sit.com', phone: '0987654321' },
    { orderId: '1004', customerName: 'Diana Prince', orderDate: '2024-03-28', estimatedDelivery: '2024-04-03', status: 'Delivered', quantity: 5, price: 75, paymentStatus: 'Pending', email: 'dian@sit.com', phone: '0987654321' },
    { orderId: '1005', customerName: 'Eve Torres', orderDate: '2024-03-28', estimatedDelivery: '2024-04-03', status: 'Delivered', quantity: 5, price: 75, paymentStatus: 'Pending', email: 'eve@sit.com', phone: '0987654321' },
  ];

  filterText = '';
  currentPage = 1;
  pageSize = 5;
  selectedOrder: any = {};

  @ViewChild('viewModal') viewModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal, private orderService: OrderService) { };

  ngOnInit() {

    this.orderService.setInitialOrders(this.orders);
    this.orderService.orders$.subscribe(updatedOrders => {
      this.orders = updatedOrders;
    });
  }
  get filteredOrders() {
    const text = this.filterText.toLowerCase();
    return this.orders.filter(o =>
      o.customerName.toLowerCase().includes(text) ||
      o.orderId.toLowerCase().includes(text)
    );
  }

  openViewModal(order: any) {
    this.selectedOrder = { ...order };
    this.modalService.open(this.viewModal, { centered: true });
  }

  openEditModal(order: any) {
    this.selectedOrder = { ...order };
    this.modalService.open(this.editModal, { centered: true });
  }

  saveOrder() {
    const index = this.orders.findIndex(o => o.orderId === this.selectedOrder.orderId);
    if (index > -1) {
      this.orders[index] = { ...this.selectedOrder };
    }
    this.modalService.dismissAll();
  }

  deleteOrder(orderId: string) {
    this.orders = this.orders.filter(o => o.orderId !== orderId);
  }
}
