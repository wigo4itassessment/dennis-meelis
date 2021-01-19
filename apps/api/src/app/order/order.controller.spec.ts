import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';

describe('OrderController', () => {
  let controller: OrderController;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
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
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
