import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { Order, Stock } from '@yakshop/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private _zone: NgZone) {}

  getStock(day: number) {
    return this.http.get<Stock>(`/yak-shop/stock/${day}`);
  }

  getStockStream(day: number) {
    return new Observable<Stock>((observer) => {
      const eventSource = new EventSource(`/yak-shop/stock/updates/${day}`);
      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          observer.next(JSON.parse(event.data) as Stock);
        });
      };

      eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  placeOrder(day: number, order: Order) {
    return this.http.post(`/yak-shop/order/${day}`, order);
  }
}
