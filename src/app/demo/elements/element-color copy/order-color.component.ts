import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  email: string;
  phone: string;
  status: string;
  date: Date;
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string;
}

@Component({
  selector:  'app-order-color',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-color.component.html',
  styleUrls: ['./order-color.component.scss']

})
export default class OrderManagementComponent implements OnInit {
  @ViewChild('orderDialog') orderDialog!: TemplateRef<any>;

  orders: Order[] = [
    {
      id: 1,
      orderNumber: 'ORD-1001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      status: 'Pending',
      date: new Date(),
      totalAmount: 149.99,
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, City'
    },
    {
      id: 2,
      orderNumber: 'ORD-1002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-5678',
      status: 'Processing',
      date: new Date(),
      totalAmount: 299.95,
      paymentMethod: 'PayPal',
      shippingAddress: '456 Elm St, Town'
    }
  ];

  orderForm!: FormGroup;
  dialogOrder: Order | null = null;
  dialogEditable = false;
  step = 1;
  maxStep = 3;
  sortColumn: keyof Order = 'id';
  sortAsc = true;
  editingOrder: Order | null = null;
  editForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeEditForm();
  }

  initializeForm(): void {
    this.orderForm = this.fb.group({
      id: [null],
      orderNumber: ['', Validators.required],
      customer: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('[- +()0-9]+')],
      status: ['Pending', Validators.required],
      date: [new Date(), Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      paymentMethod: ['Credit Card', Validators.required],
      shippingAddress: ['', Validators.required]
    });
  }

  initializeEditForm(): void {
    this.editForm = this.fb.group({
      customer: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.pattern('[- +()0-9]+')),
      totalAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
      status: new FormControl('Pending', Validators.required)
    });
  }

  // Getter methods for edit form controls
  get customerControl(): FormControl {
    return this.editForm.get('customer') as FormControl;
  }

  get emailControl(): FormControl {
    return this.editForm.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.editForm.get('phone') as FormControl;
  }

  get totalAmountControl(): FormControl {
    return this.editForm.get('totalAmount') as FormControl;
  }

  get statusControl(): FormControl {
    return this.editForm.get('status') as FormControl;
  }

  sortedOrders(): Order[] {
    return this.orders.slice().sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortAsc ? 
          valA.localeCompare(valB) : 
          valB.localeCompare(valA);
      }
      return this.sortAsc ? 
        Number(valA) - Number(valB) : 
        Number(valB) - Number(valA);
    });
  }

  sort(column: keyof Order): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
  }

  openOrderDialog(order?: Order, editable = true): void {
    this.dialogEditable = editable;
    this.step = 1;

    if (order) {
      this.dialogOrder = { ...order };
      this.orderForm.patchValue({
        ...order,
        date: this.formatDateForInput(order.date)
      });
    } else {
      this.dialogOrder = null;
      this.orderForm.reset({
        status: 'Pending',
        date: this.formatDateForInput(new Date()),
        paymentMethod: 'Credit Card'
      });
    }

    this.modalService.open(this.orderDialog, { 
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
  }

  startEdit(order: Order): void {
    this.editingOrder = {...order};
    this.editForm.patchValue({
      customer: order.customer,
      email: order.email,
      phone: order.phone,
      totalAmount: order.totalAmount,
      status: order.status
    });
  }

  cancelEdit(): void {
    this.editingOrder = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editForm.invalid || !this.editingOrder) return;

    const updatedOrder = {
      ...this.editingOrder,
      ...this.editForm.value
    };

    const index = this.orders.findIndex(o => o.id === updatedOrder.id);
    if (index !== -1) {
      this.orders[index] = updatedOrder;
    }
    this.cancelEdit();
  }

  nextStep(): void {
    if (this.step < this.maxStep) {
      this.step++;
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  get isStepValid(): boolean {
    switch (this.step) {
      case 1:
        return this.orderForm.get('customer')?.valid && 
               this.orderForm.get('email')?.valid &&
               this.orderForm.get('phone')?.valid;
      case 2:
        return this.orderForm.get('paymentMethod')?.valid && 
               this.orderForm.get('totalAmount')?.valid;
      case 3:
        return this.orderForm.get('shippingAddress')?.valid;
      default:
        return false;
    }
  }

  saveOrder(modal: any): void {
    if (this.orderForm.invalid) return;

    const formValue = {
      ...this.orderForm.value,
      date: new Date(this.orderForm.value.date)
    };

    if (formValue.id) {
      const index = this.orders.findIndex(o => o.id === formValue.id);
      this.orders[index] = formValue;
    } else {
      formValue.id = this.generateOrderId();
      formValue.orderNumber = `ORD-${1000 + this.orders.length + 1}`;
      this.orders.push(formValue);
    }

    modal.close();
    this.orderForm.reset();
  }

  deleteOrder(order: Order): void {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private generateOrderId(): number {
    return this.orders.length > 0 ? 
      Math.max(...this.orders.map(o => o.id)) + 1 : 
      1;
  }
}
