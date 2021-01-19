import { Order } from '@yakshop/api-interfaces';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export class StockEntity {
  @Column() milk?: number;
  @Column() skins?: number;
}

@Entity('order')
export class OrderEntity implements Order {
  @ObjectIdColumn() id: ObjectID;
  @Column() customer: string;
  @Column(() => StockEntity) order: StockEntity;
}
