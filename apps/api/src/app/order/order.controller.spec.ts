import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockService } from '../stock/stock.service';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { mockYakRepository } from '../yak/lab-yak.mocks';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';

describe('OrderController', () => {
  let controller: OrderController;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(() => Promise.resolve([])),
      clear: jest.fn(() => Promise.resolve()),
      save: jest.fn(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(LabYakEntity),
          useValue: mockYakRepository,
        },
        {
          provide: StockService,
          useValue: { stockChanged: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should place an order', async () => {
    const order = await controller.placeOrder(14, {
      customer: 'test',
      order: { milk: 1000, skins: 3 },
    });
    expect(order).toEqual({
      customer: 'test',
      order: {
        milk: 1000,
        skins: 3,
      },
    });
  });

  it('should place a partial order', async () => {
    const order = await controller.placeOrder(14, {
      customer: 'test',
      order: { milk: 1200, skins: 3 },
    });
    expect(order).toEqual({
      customer: 'test',
      order: {
        skins: 3,
      },
    });
  });
});
