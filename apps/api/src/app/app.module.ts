import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoadController } from './load/load.controller';
import { LabYakEntity } from './yak/lab-yak.entity';
import { StockController } from './stock/stock.controller';
import { HerdController } from './herd/herd.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DATABASE,
      entities: [LabYakEntity],
      autoLoadEntities: true,
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([LabYakEntity]),
  ],
  controllers: [LoadController, StockController, HerdController],
  providers: [],
})
export class AppModule {}
