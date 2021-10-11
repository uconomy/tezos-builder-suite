import React from 'react';
import { FormItemProps } from 'antd';
import { UnwrappedMichelsonObject } from '../../michelsonStorageParser';
import { MapBuilder } from './MapBuilder';
import { BoolBuilder } from './BoolBuilder';
import { StringBuilder } from './StringBuilder';
import { OrBuilder } from './OrBuilder';
import { UnitBuilder } from './UnitBuilder';
import { IntBuilder } from './IntBuilder';
import { NatBuilder } from './NatBuilder';
import { MutezBuilder } from './MutezBuilder';
import { TimestampBuilder } from './TimestampBuilder';
import { SetBuilder } from './SetBuilder';
import { RecordBuilder } from './RecordBuilder';

export const renderBuilder = (o: UnwrappedMichelsonObject, index: number, itemProps?: FormItemProps) => {
  switch (o.prim) {
    case 'unit':
      return <UnitBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'bool':
      return <BoolBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'int':
      return <IntBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'nat':
      return <NatBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'mutez':
      return <MutezBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'timestamp':
      return <TimestampBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'map':
    case 'big_map':
      return <MapBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'or':
      return <OrBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'set':
    case 'list':
      return <SetBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    case 'record':
      return <RecordBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    default:
      return <StringBuilder key={`storage-${index}`} object={o} index={index} itemProps={itemProps} />
    // default:
    //   return <div>Unknown prim {o.prim}</div>
  }
}