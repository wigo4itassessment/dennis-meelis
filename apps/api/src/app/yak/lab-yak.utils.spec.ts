import { yaks, babyYak } from './lab-yak.mocks';
import {
  DAYS_IN_YEAR,
  MAX_AGE,
  producedOnDay,
  yakOnDay,
} from './lab-yak.utils';

describe('lab-yak utils', () => {
  describe('yakOnDay', () => {
    it('should calculate the age of a yak in standard yak years', () => {
      let yak = yakOnDay(yaks[0], 0);
      expect(yak).toEqual({
        age: 4,
        name: 'Betty-1',
        sex: 'f',
      });

      yak = yakOnDay(yaks[0], 13);
      expect(yak).toEqual({
        age: 4.13,
        name: 'Betty-1',
        sex: 'f',
      });

      yak = yakOnDay(yaks[0], 100);
      expect(yak).toEqual({
        age: 5,
        name: 'Betty-1',
        sex: 'f',
      });

      yak = yakOnDay(yaks[0], 250);
      expect(yak).toEqual({
        age: 6.5,
        name: 'Betty-1',
        sex: 'f',
      });
    });

    it('should take into account the maximum lifespan of a yak', () => {
      const { age } = yakOnDay(yaks[0], 0);
      const daysTillDeath = (MAX_AGE - age) * DAYS_IN_YEAR;

      let yak = yakOnDay(yaks[0], daysTillDeath - 1);
      expect(yak.deceased).not.toEqual(true);

      yak = yakOnDay(yaks[0], daysTillDeath);
      expect(yak.deceased).toEqual(true);

      yak = yakOnDay(yaks[0], daysTillDeath + 150);
      expect(yak.deceased).toEqual(true);
      expect(yak.age).toEqual(10);
    });
  });

  describe('producedOnDay', () => {
    it('should calculate the total amount of milk produced on the specified day', () => {
      let stock = producedOnDay(babyYak, 1);
      expect(stock.milk).toEqual(50);

      stock = producedOnDay(babyYak, 13);
      expect(stock.milk).toEqual(647.66);
    });

    it('should calculate the total amount of skins produced on the specified day', () => {
      let stock = producedOnDay(yaks[0], 13);
      expect(stock.skins).toEqual(1);

      stock = producedOnDay(yaks[0], 14);
      expect(stock.skins).toEqual(2);
    });

    it('should not be able to produce stock beyond a LabYaks maximum age', () => {
      let stock = producedOnDay(babyYak, 10000);
      expect(stock).toEqual({ milk: 34994.97, skins: 68 });

      stock = producedOnDay(babyYak, 20000);
      expect(stock).toEqual({ milk: 34994.97, skins: 68 });
    });
  });
});
