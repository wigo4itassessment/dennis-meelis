import { mockYakRepository } from './../yak/lab-yak.mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { StockController } from './stock.controller';

describe('StockController', () => {
  let controller: StockController;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = mockYakRepository;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: getRepositoryToken(LabYakEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate the stock for the entire herd', async () => {
    const result = await controller.getStockOnDay(13);
    expect(result).toEqual({
      milk: 1104.48,
      skins: 3,
    });
  });
});
