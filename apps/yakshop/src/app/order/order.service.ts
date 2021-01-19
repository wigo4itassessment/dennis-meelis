import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order, Stock } from '@yakshop/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getStock(day: number) {
    return this.http.get<Stock>(`/yak-shop/stock/${day}`);
  }

  placeOrder(day: number, order: Order) {
    return this.http.post(`/yak-shop/order/${day}`, order);
  }
}
