import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MongoRepository } from 'typeorm';

import { Stock, Order, LabYak } from '@yakshop/api-interfaces';

import { OrderEntity } from '../order/order.entity';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { herdProducedOnDay } from '../yak/lab-yak.utils';

const calculateStock = (stock: Stock, orders: Order[]) => ({
  milk: orders
    .filter((order) => !!order.order.milk)
    .reduce(
      (total, { order: { milk: ordered } }) => total - ordered,
      stock.milk
    ),
  skins: orders
    .filter((order) => !!order.order.skins)
    .reduce(
      (total, { order: { skins: ordered } }) => total - ordered,
      stock.skins
    ),
});

@Injectable()
export class StockService {
  private stockChangedSubject = new ReplaySubject(1);

  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: MongoRepository<Order>,

    @InjectRepository(LabYakEntity)
    private labYakRepository: MongoRepository<LabYak>
  ) {
    this.stockChangedSubject.next();
  }

  public async getStockOnDay(day: number) {
    const yaks = await this.labYakRepository.find();
    const produced = herdProducedOnDay(yaks, day);
    const orders = await this.orderRepository.find();

    return calculateStock(produced, orders);
  }

  public stockOnDayStream(day: number): Observable<Stock> {
    return this.stockChangedSubject.pipe(
      switchMap(() => from(this.getStockOnDay(day)))
    );
  }

  public stockChanged() {
    this.stockChangedSubject.next();
  }
}
