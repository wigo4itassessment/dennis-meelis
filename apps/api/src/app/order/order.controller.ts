import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { LabYak, Order } from '@yakshop/api-interfaces';

import { OrderEntity } from './order.entity';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { herdProducedOnDay } from '../yak/lab-yak.utils';

@Controller('order')
export class OrderController {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: MongoRepository<Order>,

    @InjectRepository(LabYakEntity)
    private labYakRepository: MongoRepository<LabYak>
  ) {}

  @Post(':day')
  async placeOrder(@Param('day') day: number, @Body() newOrder: Order) {
    const yaks = await this.labYakRepository.find();
    const produced = herdProducedOnDay(yaks, day);
    const orders = await this.orderRepository.find();

    const stock = {
      milk: orders
        .filter((order) => !!order.order.milk)
        .reduce(
          (total, { order: { milk: ordered } }) => total - ordered,
          produced.milk
        ),
      skins: orders
        .filter((order) => !!order.order.skins)
        .reduce(
          (total, { order: { skins: ordered } }) => total - ordered,
          produced.skins
        ),
    };

    if (
      (!newOrder.order.milk || newOrder.order.milk > stock.milk) &&
      (!newOrder.order.skins || newOrder.order.skins > stock.skins)
    ) {
      throw new NotFoundException();
    }

    let partialOrder = false;
    if (newOrder.order.milk > stock.milk) {
      delete newOrder.order.milk;
      partialOrder = true;
    }
    if (newOrder.order.skins > stock.skins) {
      delete newOrder.order.skins;
      partialOrder = true;
    }

    await this.orderRepository.save(newOrder);
    if (partialOrder) {
      console.log('206');
    }

    return newOrder;
  }
}
