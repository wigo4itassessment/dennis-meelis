import { Controller, Get, Param, Sse } from '@nestjs/common';
import { Stock } from '@yakshop/api-interfaces';
import { map } from 'rxjs/operators';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Sse('updates/:day')
  updates(@Param('day') day: number) {
    return this.stockService.stockOnDayStream(day).pipe(
      map(
        (stock) =>
          ({
            data: stock,
          } as MessageEvent<Stock>)
      )
    );
  }

  @Get(':day')
  async getStockOnDay(@Param('day') day: number) {
    return await this.stockService.getStockOnDay(day);
  }
}
