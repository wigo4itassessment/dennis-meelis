import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabYakEntity } from '../yak/lab-yak.entity';
import { mockYakRepository } from '../yak/lab-yak.mocks';
import { HerdController } from './herd.controller';

describe('HerdController', () => {
  let controller: HerdController;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = mockYakRepository;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HerdController],
      providers: [
        {
          provide: getRepositoryToken(LabYakEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<HerdController>(HerdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
