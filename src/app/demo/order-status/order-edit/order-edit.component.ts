import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './order-edit.component.html'
})
export class OrderEditComponent implements OnInit {
  order: Order | undefined;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId')!;
    this.orderService.getById(orderId).subscribe(order => this.order = order);
  }

  submit() {
    if (this.order) {
      this.orderService.update(this.order.orderId, this.order).subscribe(() => this.router.navigate(['/orders']));
    }
  }
}
