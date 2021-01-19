import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '@yakshop/api-interfaces';

import { OrderService } from './order.service';

@Component({
  selector: 'yakshop-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  day = 13;
  stock$ = this.orderService.getStock(this.day);
  orderData = { customer: '', order: { milk: 0, skins: 0 } } as Order;
  message = '';

  constructor(private router: Router, private orderService: OrderService) {}

  placeOrder() {
    this.orderService.placeOrder(this.day, this.orderData).subscribe(
      () => this.router.navigate(['thank-you']),
      ({ status }) => {
        switch (status) {
          case 404:
            this.message = 'Items not in stock, please modify your order';
            break;
          default:
            this.message =
              'Cannot place your order at this time, please try again some other time';
        }
      }
    );
  }
}
