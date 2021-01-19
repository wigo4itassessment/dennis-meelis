import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabYak, Order } from '@yakshop/api-interfaces';
import { MongoRepository } from 'typeorm';
import { OrderEntity } from '../order/order.entity';

import { LabYakEntity } from '../yak/lab-yak.entity';

const parseXmlYak = ({
  $: { name, age, sex },
}: {
  $: Record<string, string>;
}): LabYak => {
  if (!name) {
    throw new InternalServerErrorException(`LabYak name is required`);
  }

  if (isNaN(+age)) {
    throw new InternalServerErrorException(
      `LabYak ${name}: age '${age}' is not a number`
    );
  }
  if (sex !== 'f' && sex !== 'm') {
    throw new InternalServerErrorException(
      `LabYak ${name}: sex must be either 'f' or 'm', found '${sex}'`
    );
  }

  return { name, age: +age, sex };
};

@Controller('load')
export class LoadController {
  constructor(
    @InjectRepository(LabYakEntity)
    private readonly labYakRepository: MongoRepository<LabYak>,
    @InjectRepository(OrderEntity)
    private orderRepository: MongoRepository<Order>
  ) {}

  @Post()
  @HttpCode(205)
  async loadHerd(
    @Body() body: { herd: { labyak: { $: Record<string, string> }[] } }
  ) {
    if (!body?.herd?.labyak?.length) {
      throw new InternalServerErrorException(`No labyaks found`);
    }

    const labYaks = body.herd.labyak.map(parseXmlYak);

    try {
      await this.orderRepository.clear();
    } catch (error) {
      console.log(error);
    }
    await this.labYakRepository.clear();
    await this.labYakRepository.save(labYaks);
  }
}
