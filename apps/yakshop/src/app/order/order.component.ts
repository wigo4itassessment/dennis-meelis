import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';

import { Order } from '@yakshop/api-interfaces';

import { OrderService } from './order.service';

@Component({
  selector: 'yakshop-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  day$ = this.route.params.pipe(map((params) => params.day as number));
  // stock$ = this.day$.pipe(switchMap((day) => this.orderService.getStock(day)));
  stock$ = this.day$.pipe(
    switchMap((day) => this.orderService.getStockStream(day))
  );
  orderData = { customer: '', order: { milk: 0, skins: 0 } } as Order;
  message = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  placeOrder() {
    this.day$
      .pipe(
        first(),
        switchMap((day) => this.orderService.placeOrder(day, this.orderData))
      )
      .subscribe(
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
