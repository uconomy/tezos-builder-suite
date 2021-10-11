import { MichelsonMap } from "@taquito/taquito";
import { BigNumber } from 'bignumber.js';
import { 
  MichelsonStorageParser,
  UnwrappedMichelsonObject,
  UnwrappedSimpleMichelsonObject,
  UnwrappedComplexMichelsonObject,
} from "./michelsonStorageParser";

export class StorageImporter {
  private unwrappedStorage: UnwrappedMichelsonObject[];

  constructor(michelsonString: string) {
    const structure = new MichelsonStorageParser(michelsonString);

    this.unwrappedStorage = structure.unwrapStorage();
  }

  private _buildList(el: any[], structure: UnwrappedSimpleMichelsonObject) {
    const { value } = structure;

    if (!value || !el || !el.length) {
      return [];
    }

    return el;
  }

  private _buildMap(el: any[], structure: UnwrappedComplexMichelsonObject) {
    const { prim, args, annots, value, key } = structure;

    // Provide typecheck to MichelsonMap
    const map = new MichelsonMap({ prim, args, annots });

    if (!key || !value || !el || !el.length) {
      return map;
    } 

    // Fill the map/big_map
    el.forEach((item) => {
      // Parse eventual sub-structures
      let iValue = this.fromJSON(item[1], structure.value, false);

      map.set(item[0], iValue);
    });

    return map;
  }

  _buildOr(el: any, structure: UnwrappedComplexMichelsonObject) {
    if (structure.value) {
      const found = structure.value.find(x => x.prim === 'unit' && x.annots?.join(' ') === `${el}`);
      if (found) {
        return { [`${el}`.substring(1)]: Symbol() };
      }

      throw new Error('OR processing failed, no valid option found');
    }

    return null;
  }

  private _parse(el: any, structure: UnwrappedMichelsonObject): any {
    switch (structure.prim) {
      case 'list':
      case 'set':
        return this._buildList(el, structure as UnwrappedSimpleMichelsonObject);
      case 'map':
      case 'big_map':
        return this._buildMap(el, structure as UnwrappedComplexMichelsonObject);
      case 'or':
        return this._buildOr(el, structure as UnwrappedComplexMichelsonObject);
      case 'unit':
        return null;
      case 'nat':
      case 'int':
      case 'mutez':
        return new BigNumber(el);
      case 'record':
        return this.fromJSON(el, structure.args);
      default:
        return el; 
    }
  }

  fromJSON(json: any, structure: UnwrappedMichelsonObject[] = this.unwrappedStorage, isFirstLevel: boolean = true) {
    const storage: any = {};
    if (Array.isArray(json) || typeof json === 'object') {
      const firsLevelKeys = Object.keys(json);
      firsLevelKeys.forEach(prop => {
        let propStructure = structure.find(x => x.annots?.join(' ') === `%${prop}`);
        const asIndex = parseInt(prop);

        if (!isNaN(asIndex)) {
          propStructure = structure[asIndex];
        }
        
        if (!propStructure) {
          console.log('Failed to find a strucure for prop', prop, structure);
          throw new Error('Invalid JSON provided.');
        }

        storage[prop] = this._parse(json[prop], propStructure);
      });
    } else {
      return this._parse(json, structure[0]);
    }

    if (isFirstLevel && typeof storage === 'object') {
      const keys = Object.keys(storage);

      // If we have a single-value storage, IT IS the storage (eg. example LIGO counter)
      if (keys.length === 1 && keys[0] === '0') {
        return storage[0];
      }
    }

    return storage;
  }
}