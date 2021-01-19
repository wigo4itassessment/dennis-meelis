import { LabYak } from '@yakshop/api-interfaces';

export const babyYak = { name: 'Betty-1', age: 0, sex: 'f' } as LabYak;

export const yaks = [
  { name: 'Betty-1', age: 4, sex: 'f' },
  { name: 'Betty-2', age: 8, sex: 'f' },
  { name: 'Betty-3', age: 9.5, sex: 'f' },
] as LabYak[];

export const loadHerdBody = {
  herd: {
    labyak: [
      { $: { name: 'Betty-1', age: '4', sex: 'f' } },
      { $: { name: 'Betty-2', age: '8', sex: 'f' } },
      { $: { name: 'Betty-3', age: '9.5', sex: 'f' } },
    ],
  },
};

export const invalidAgeLoadHerdBody = {
  herd: {
    labyak: loadHerdBody.herd.labyak.map(({ $: yak }) => ({
      $: { ...yak, age: 'x' },
    })),
  },
};

export const invalidSexLoadHerdBody = {
  herd: {
    labyak: loadHerdBody.herd.labyak.map(({ $: yak }) => ({
      $: { ...yak, sex: 'x' },
    })),
  },
};

export const invalidNameLoadHerdBody = {
  herd: {
    labyak: loadHerdBody.herd.labyak.map(({ $: yak }) => ({
      $: { ...yak, name: undefined },
    })),
  },
};

export const mockYakRepository = {
  find: jest.fn(() => Promise.resolve(yaks)),
  clear: jest.fn(() => Promise.resolve()),
  save: jest.fn(() => Promise.resolve()),
};
