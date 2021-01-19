import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Herd, LabYak } from '@yakshop/api-interfaces';
import { MongoRepository } from 'typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { yakOnDay } from '../yak/lab-yak.utils';

@Controller('herd')
export class HerdController {
  constructor(
    @InjectRepository(LabYakEntity)
    private labYakRepository: MongoRepository<LabYak>
  ) {}

  @Get(':day')
  async getHerdOnDay(@Param('day') day: number) {
    const yaks = await this.labYakRepository.find();
    const yaksOnDay = yaks.map((yak) => yakOnDay(yak, day));

    return {
      herd: yaksOnDay.map(({ name, age, sex, deceased }) => ({
        name,
        age,
        sex,
        deceased,
      })),
    } as Herd;
  }
}
