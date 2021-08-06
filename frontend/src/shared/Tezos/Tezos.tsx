

import React from 'react';
import currency from 'currency.js';

import './Tezos.css';

export interface TezosProps {
  value?: number;
  className?: string;
  mutez?: boolean;
}

const milliTezosOptions = {
  symbol: 'mꜩ',
  formatWithSymbol: true,
  pattern: '# !',
  negativePattern: '-# !'
};

const tezosOptions = {
  symbol: 'ꜩ',
  formatWithSymbol: true,
  pattern: '# !',
  negativePattern: '-# !',
  precision: 6,
};

export const Tezos = ({ value = 0, mutez, className }: TezosProps) => {
  let c: currency;

  if (mutez) {
    c = new currency(value, milliTezosOptions);
  } else {
    c = new currency(value, tezosOptions);
  }

  return <span className={`${className} tezos`}>{c.format()}</span>
};
