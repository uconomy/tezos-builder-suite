type PlainMichelsonObject = {
  prim: 'unit' | 'bool' | 'byte' | 'nat' | 'int' | 'string' | 'address';
  annots?: string;
}

type SimpleMichelsonObject = {
  prim: 'storage' | 'list';
  args: [MichelsonObject],
  annots?: string;
}

type ComplexMichelsonObject = {
  prim: 'map' | 'big_map' | 'pair' | 'or';
  args: [MichelsonObject, MichelsonObject],
  annots?: string;
}

type MichelsonObject = (PlainMichelsonObject | SimpleMichelsonObject | ComplexMichelsonObject);

export type UnwrappedMichelsonObject = MichelsonObject & {
  key?: MichelsonObject[];
  value?: MichelsonObject[];
};

export class MichelsonStorageParser {
  michelsonStorage: SimpleMichelsonObject;

  constructor(michelson: string) {
    const json = JSON.parse(michelson);

    this.michelsonStorage = json.find((x: any) => x.prim === 'storage') as SimpleMichelsonObject;
  }

  getMichelsonStorage() {
    return JSON.stringify(this.michelsonStorage, null, 2);
  }

  private processBlock(block: UnwrappedMichelsonObject): UnwrappedMichelsonObject[] {
    console.log('PROCESS BLOCK', block.prim);

    switch(block.prim) {
      case 'list':
        const list = block as SimpleMichelsonObject;

        const list_args = list.args;
        const list_value = Array.isArray(list_args[0]) ? this.unwrapBlock(list_args[0]) : this.unwrapBlock([list_args[0]]);

        return [{
          ...list,
          value: list_value,
        }];
      case 'map':
      case 'big_map':
        const big_map = block as ComplexMichelsonObject;

        const big_map_args = big_map.args;
        const big_map_key = Array.isArray(big_map_args[0]) ? this.unwrapBlock(big_map_args[0]) : this.unwrapBlock([big_map_args[0]]);
        const big_map_value = Array.isArray(big_map_args[1]) ? this.unwrapBlock(big_map_args[1]) : this.unwrapBlock([big_map_args[1]]);

        return [{
          ...big_map,
          key: big_map_key,
          value: big_map_value,
        }];
      case 'pair':
        return block.args as [MichelsonObject, MichelsonObject];
      default:
        return [block];
    }
  }

  private unwrapBlock(block: UnwrappedMichelsonObject[]): UnwrappedMichelsonObject[] {
    let res: UnwrappedMichelsonObject[] = [];

    block.forEach(x => {
      res.push(...this.processBlock(x));
    });

    // If there are pairs, process those before
    if (res.find(x => x.prim === 'pair')) {
      return this.unwrapBlock(res);
    }

    // ...and the process the rest
    const finalCicle: UnwrappedMichelsonObject[] = [];
    res.forEach(x => {
      finalCicle.push(...this.processBlock(x));
    });

    return finalCicle;
  }

  unwrapStorage() {
    const res = this.unwrapBlock(this.michelsonStorage.args);

    return res;
  }
}
