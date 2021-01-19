import { mockYakRepository } from './../yak/lab-yak.mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { StockController } from './stock.controller';
import { OrderEntity } from '../order/order.entity';
import { StockService } from './stock.service';

describe('StockController', () => {
  let controller: StockController;
  let mockRepository;
  let mockStockService;

  beforeEach(async () => {
    mockRepository = {
      clear: jest.fn(() => Promise.resolve()),
      find: jest.fn(() => Promise.resolve([])),
    };
    mockStockService = { getStockOnDay: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: getRepositoryToken(LabYakEntity),
          useValue: mockYakRepository,
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: mockRepository,
        },
        {
          provide: StockService,
          useValue: mockStockService,
        },
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate the stock for the entire herd', async () => {
    await controller.getStockOnDay(13);
    expect(mockStockService.getStockOnDay).toHaveBeenCalledWith(13);
  });
});
