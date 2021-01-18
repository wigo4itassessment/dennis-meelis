export const herd = {
  herd: {
    labyak: [
      { $: { name: 'Betty-1', age: '4', sex: 'f' } },
      { $: { name: 'Betty-2', age: '8', sex: 'f' } },
      { $: { name: 'Betty-3', age: '9.5', sex: 'f' } },
    ],
  },
};

export const invalidAgeHerd = {
  herd: {
    labyak: herd.herd.labyak.map(({ $: yak }) => ({
      $: { ...yak, age: 'x' },
    })),
  },
};

export const invalidSexHerd = {
  herd: {
    labyak: herd.herd.labyak.map(({ $: yak }) => ({
      $: { ...yak, sex: 'x' },
    })),
  },
};

export const invalidNameHerd = {
  herd: {
    labyak: herd.herd.labyak.map(({ $: yak }) => ({
      $: { ...yak, name: undefined },
    })),
  },
};
