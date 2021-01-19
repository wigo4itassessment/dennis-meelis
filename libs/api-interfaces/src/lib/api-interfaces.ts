export interface LabYak {
  name: string;
  age: number;
  sex: 'f' | 'm';
  deceased?: true;
}

export interface Herd {
  herd: LabYak[];
}

export interface Stock {
  milk?: number;
  skins?: number;
}
