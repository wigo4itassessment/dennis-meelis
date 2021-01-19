import {
  loadHerdBody,
  invalidAgeLoadHerdBody,
  invalidNameLoadHerdBody,
  invalidSexLoadHerdBody,
} from '../yak/lab-yak.mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { LoadController } from './load.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { OrderEntity } from '../order/order.entity';
import { StockService } from '../stock/stock.service';

describe('LoadController', () => {
  let controller: LoadController;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      clear: jest.fn(() => Promise.resolve()),
      save: jest.fn(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadController],
      providers: [
        {
          provide: getRepositoryToken(LabYakEntity),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: mockRepository,
        },
        {
          provide: StockService,
          useValue: { stockChanged: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<LoadController>(LoadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should load the herd', async () => {
    await expect(controller.loadHerd(loadHerdBody)).resolves.not.toThrowError();
    expect(mockRepository.clear).toHaveBeenCalledTimes(2);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledWith([
      { age: 4, name: 'Betty-1', sex: 'f' },
      { age: 8, name: 'Betty-2', sex: 'f' },
      { age: 9.5, name: 'Betty-3', sex: 'f' },
    ]);
  });

  it('should not process invalid data', async () => {
    await expect(
      controller.loadHerd(invalidAgeLoadHerdBody)
    ).rejects.toMatchInlineSnapshot(
      `[Error: LabYak Betty-1: age 'x' is not a number]`
    );

    await expect(
      controller.loadHerd(invalidSexLoadHerdBody)
    ).rejects.toMatchInlineSnapshot(
      `[Error: LabYak Betty-1: sex must be either 'f' or 'm', found 'x']`
    );

    await expect(
      controller.loadHerd(invalidNameLoadHerdBody)
    ).rejects.toMatchInlineSnapshot(`[Error: LabYak name is required]`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(controller.loadHerd({} as any)).rejects.toMatchInlineSnapshot(
      `[Error: No labyaks found]`
    );

    expect(mockRepository.clear).not.toHaveBeenCalled();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
