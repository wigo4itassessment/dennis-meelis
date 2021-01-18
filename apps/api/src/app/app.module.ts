import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoadController } from './load/load.controller';

@Module({
  imports: [],
  controllers: [AppController, LoadController],
  providers: [AppService],
})
export class AppModule {}
