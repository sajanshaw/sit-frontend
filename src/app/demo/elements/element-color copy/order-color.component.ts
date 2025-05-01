import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector:  'app-order-color',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule,NgbPaginationModule,FormsModule ],
  templateUrl: './order-color.component.html',
  styleUrls: ['./order-color.component.scss']
})
export default class OrdersComponent implements OnInit {
  filters = [
    { label: 'All', value: 'all', count: 6 },
    { label: 'Processing', value: 'processing', count: 2 },
    { label: 'Completed', value: 'completed', count: 2 },
    { label: 'Refund', value: 'refund', count: 2 }
  ];

  bulkActions = [
    { label: 'Mark as Processed', value: 'process' },
    { label: 'Refund Selected', value: 'refund' }
  ];

  selectedFilter = 'all';
  selectedBulkAction = '';
  searchTerm = '';

  allOrders: any[] = [];
  filteredOrders: any[] = [];
  pagedOrders: any[] = [];

  currentPage = 1;
  pageSize = 5;
  totalOrders = 0;

  ngOnInit() {
    this.loadDummyOrders();
    this.updateFilterCounts();
    this.filterOrders();
  }

  loadDummyOrders() {
    this.allOrders = [
      {
        id: 1001, customer: 'Alice Johnson', email: 'alice@example.com',
        address: '123 Elm St', date: new Date(), status: 'Processing',
        total: 120, paid: 120, discount: 10, tax: 5.5, shipping: 'Standard',
        payment: 'Credit Card', items: 3, origin: 'Online',
        notes: 'Leave at front door', selected: false
      },
      {
        id: 1002, customer: 'Bob Smith', email: 'bob@example.com',
        address: '456 Oak St', date: new Date(), status: 'Completed',
        total: 200, paid: 200, discount: 0, tax: 10, shipping: 'Express',
        payment: 'PayPal', items: 5, origin: 'Store',
        notes: '', selected: false
      },
      {
        id: 1003, customer: 'Charlie Brown', email: 'charlie@example.com',
        address: '789 Pine St', date: new Date(), status: 'Refund',
        total: 80, paid: 0, discount: 5, tax: 3, shipping: 'Standard',
        payment: 'Credit Card', items: 2, origin: 'Online',
        notes: 'Refund requested due to damage', selected: false
      },
      {
        id: 1004, customer: 'Diana Prince', email: 'diana@example.com',
        address: '1010 Paradise Island', date: new Date(), status: 'Processing',
        total: 150, paid: 150, discount: 15, tax: 7, shipping: 'Same Day',
        payment: 'Debit Card', items: 4, origin: 'Online',
        notes: '', selected: false
      },
      {
        id: 1005, customer: 'Eve Torres', email: 'eve@example.com',
        address: '2020 Star City', date: new Date(), status: 'Completed',
        total: 300, paid: 300, discount: 20, tax: 12, shipping: 'Express',
        payment: 'UPI', items: 6, origin: 'Store',
        notes: 'Gift wrapped', selected: false
      }
    ];
  }

  updateFilterCounts() {
    this.filters = this.filters.map(filter => {
      const count = filter.value === 'all'
        ? this.allOrders.length
        : this.allOrders.filter(order => order.status.toLowerCase() === filter.value).length;
      return { ...filter, count };
    });
  }

  onFilterChange(status: string) {
    this.selectedFilter = status;
    this.currentPage = 1;
    this.filterOrders();
  }

  onSearch() {
    this.currentPage = 1;
    this.filterOrders();
  }

  
filterOrders() {
  let orders = [...this.allOrders];

  if (this.selectedFilter !== 'all') {
    orders = orders.filter(order => order.status.toLowerCase() === this.selectedFilter);
  }

  if (this.searchTerm.trim()) {
    const term = this.searchTerm.trim().toLowerCase();
    orders = orders.filter(order =>
      order.customer.toLowerCase().includes(term) ||
      order.id.toString().includes(term)
    );
  }

  this.filteredOrders = orders;
  this.totalOrders = orders.length;
  this.updatePagedOrders();

  // Always refresh counts after any filtering change
  this.updateFilterCounts();
}

  updatePagedOrders() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedOrders = this.filteredOrders.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedOrders();
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.pagedOrders.forEach(order => order.selected = checked);
  }

  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-warning text-dark';
      case 'completed':
        return 'bg-success text-white';
      case 'refund':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  onApplyBulkAction() {
    if (!this.selectedBulkAction) return;

    const selectedOrders = this.allOrders.filter(o => o.selected);
    console.log('Applying bulk action:', this.selectedBulkAction, selectedOrders);
  }
}
