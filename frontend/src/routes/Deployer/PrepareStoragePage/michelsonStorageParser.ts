export enum MichelsonPrims {
  UNIT = 'unit',
  BOOL = 'bool',
  BYTES = 'bytes',
  NAT = 'nat',
  INT = 'int',
  MUTEZ = 'mutez',
  TIMESTAMP = 'timestamp',
  STRING = 'string',
  ADDRESS = 'address',
  KEY = 'key',
  KEY_HASH = 'key_hash',
  SIGNATURE = 'signature',
  STORAGE = 'storage',
  LIST = 'list',
  SET = 'set',
  MAP = 'map',
  BIG_MAP = 'big_map',
  PAIR = 'pair',
  OR = 'or',
}

export type PlainMichelsonObject = {
  prim: 'unit' | 'bool' | 'bytes' | 'nat' | 'int' | 'mutez' | 'timestamp' | 'string' | 'address' | 'key' | 'key_hash' | 'signature';
  annots?: string[];
}

export type SimpleMichelsonObject = {
  prim: 'storage' | 'list' | 'set';
  args: [MichelsonObject],
  annots?: string[];
}

export type ComplexMichelsonObject = {
  prim: 'map' | 'big_map' | 'pair' | 'or';
  args: [MichelsonObject, MichelsonObject],
  annots?: string[];
}

export type MichelsonObject = (PlainMichelsonObject | SimpleMichelsonObject | ComplexMichelsonObject);

/**
 * Unwrapped Michelson Objects
 */
export type UnwrappedSimpleMichelsonObject = SimpleMichelsonObject & {
  value: UnwrappedMichelsonObject[];
};

export type UnwrappedComplexMichelsonObject = ComplexMichelsonObject & {
  key: UnwrappedMichelsonObject[];
  value: UnwrappedMichelsonObject[];
};

export type UnwrappedRecord = {
  prim: 'record';
  args: UnwrappedMichelsonObject[],
  annots: string[];
};

export type UnwrappedMichelsonObject = MichelsonObject | UnwrappedSimpleMichelsonObject | UnwrappedComplexMichelsonObject | UnwrappedRecord;

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
    switch(block.prim) {
      case 'list':
      case 'set':
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
      case 'or':
          const or = block as ComplexMichelsonObject;
  
          const or_args = or.args;
          const or_args1 = Array.isArray(or_args[0]) ? this.unwrapBlock(or_args[0]) : this.unwrapBlock([or_args[0]]);
          const or_args2 = Array.isArray(or_args[1]) ? this.unwrapBlock(or_args[1]) : this.unwrapBlock([or_args[1]]);
  
          return [{
            ...or,
            value: [...or_args1, ...or_args2],
          }];
      default:
        return [block];
    }
  }

  private unwrapPair(block: ComplexMichelsonObject): UnwrappedMichelsonObject[] {
    if (block.annots) {
      return [{
        prim: 'record',
        annots: block.annots,
        args: [
          ...this.unwrapBlock([ block.args[0] ]),
          ...this.unwrapBlock([ block.args[1] ]),
        ]
      }]
    } else {
      return this.unwrapBlock(block.args);
    }
  }

  private unwrapBlock(block: UnwrappedMichelsonObject[]): UnwrappedMichelsonObject[] {
    let res: UnwrappedMichelsonObject[] = [];

    block.forEach(x => {
      if (x.prim === 'pair') {
        res.push(...this.unwrapPair(x))
      } else {
        res.push(...this.processBlock(x));
      }
    });

    return res;
  }

  unwrapStorage() {
    const res = this.unwrapBlock(this.michelsonStorage.args);

    return res;
  }
}
