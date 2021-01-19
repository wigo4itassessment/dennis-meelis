import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabYak } from '@yakshop/api-interfaces';
import { MongoRepository } from 'typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { producedOnDay } from '../yak/lab-yak.utils';

@Controller('stock')
export class StockController {
  constructor(
    @InjectRepository(LabYakEntity)
    private labYakRepository: MongoRepository<LabYak>
  ) {}

  @Get(':day')
  async getStockOnDay(@Param('day') day: number) {
    const yaks = await this.labYakRepository.find();
    const produced = yaks.map((yak) => producedOnDay(yak, day));
    const stock = produced.reduce(
      (
        { milk: totalMilk, skins: totalSkins },
        { milk: stockMilk, skins: stockSkins }
      ) => ({
        milk: totalMilk + stockMilk,
        skins: totalSkins + stockSkins,
      })
    );

    return stock;
  }
}
