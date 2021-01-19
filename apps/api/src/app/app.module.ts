import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoadController } from './load/load.controller';
import { LabYakEntity } from './yak/lab-yak.entity';
import { HerdController } from './herd/herd.controller';
import { OrderController } from './order/order.controller';
import { OrderEntity } from './order/order.entity';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';

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
    TypeOrmModule.forFeature([LabYakEntity, OrderEntity]),
  ],
  controllers: [
    LoadController,
    StockController,
    HerdController,
    OrderController,
  ],
  providers: [StockService],
})
export class AppModule {}
