import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

import { LabYak } from '@yakshop/api-interfaces';

@Entity('lab-yak')
export class LabYakEntity implements LabYak {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() age: number;
  @Column() sex: 'f' | 'm';

  constructor(labYak?: Partial<LabYak>) {
    Object.assign(this, labYak);
  }
}
