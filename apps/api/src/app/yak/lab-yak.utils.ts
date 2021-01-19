import { LabYak, Stock } from '@yakshop/api-interfaces';

export const DAYS_IN_YEAR = 100;
export const MAX_AGE = 10;

export const MAX_MILK_PER_DAY = 50;
export const MILK_PRODUCTION_FACTOR_PER_DAY = -0.03;

export const FIRST_SHAVE_DAY = 100;
export const MIN_DAYS_BETWEEN_SHAVE = 8;
export const DAYS_BETWEEN_SHAVE_FACTOR_PER_DAY = 0.01;

export function yakOnDay(yak: LabYak, day: number): LabYak {
  const newAge = Math.min(yak.age + day / DAYS_IN_YEAR, MAX_AGE);
  const newYak = { ...yak, age: newAge };
  if (newAge === MAX_AGE) {
    newYak.deceased = true;
  }
  return newYak;
}

export function producedOnDay({ age, sex }: LabYak, day: number): Stock {
  const produced = { milk: 0, skins: 0 };
  const ageOnDays = Array.from(
    { length: Math.min(day, MAX_AGE * DAYS_IN_YEAR - 1) },
    (_, i) => age * DAYS_IN_YEAR + i
  );

  if (sex === 'f') {
    const milkPerDay = ageOnDays.map(
      (days) => MAX_MILK_PER_DAY + days * MILK_PRODUCTION_FACTOR_PER_DAY
    );
    produced.milk = milkPerDay.reduce((sum, curr) => sum + curr, 0);
    produced.milk = Math.round(produced.milk * 100) / 100;
  }

  const firstShavingDay =
    ageOnDays[0] > FIRST_SHAVE_DAY ? 0 : FIRST_SHAVE_DAY - ageOnDays[0];
  let lastShavingDay = 0;

  const skinsPerDay = ageOnDays.map((ageOnDay, i) => {
    if (i === firstShavingDay) {
      return 1;
    }

    if (i < firstShavingDay - 1) {
      return 0;
    }

    const daysNotShaven = i - lastShavingDay;
    const minDaysRequired =
      MIN_DAYS_BETWEEN_SHAVE + ageOnDay * DAYS_BETWEEN_SHAVE_FACTOR_PER_DAY;
    const isShavingDay = minDaysRequired < daysNotShaven;
    if (!isShavingDay) {
      return 0;
    }
    lastShavingDay = i;
    return 1;
  });
  produced.skins = skinsPerDay.reduce((sum, curr) => sum + curr, 0);

  return produced;
}
