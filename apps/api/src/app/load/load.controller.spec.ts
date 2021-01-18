import {
  herd,
  invalidAgeHerd,
  invalidNameHerd,
  invalidSexHerd,
} from './herd.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { LoadController } from './load.controller';

describe('LoadController', () => {
  let controller: LoadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadController],
    }).compile();

    controller = module.get<LoadController>(LoadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should load the herd', () => {
    expect(() => controller.loadHerd(herd)).not.toThrowError();
  });

  it('should validate the posted herd', () => {
    expect(() =>
      controller.loadHerd(invalidAgeHerd)
    ).toThrowErrorMatchingInlineSnapshot(
      `"LabYak Betty-1: age 'x' is not a number"`
    );
    expect(() =>
      controller.loadHerd(invalidSexHerd)
    ).toThrowErrorMatchingInlineSnapshot(
      `"LabYak Betty-1: sex must be either 'f' or 'm', found 'x'"`
    );
    expect(() =>
      controller.loadHerd(invalidNameHerd)
    ).toThrowErrorMatchingInlineSnapshot(`"LabYak name is required"`);

    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      controller.loadHerd({} as any)
    ).toThrowErrorMatchingInlineSnapshot(`"No labyaks found"`);
  });
});
