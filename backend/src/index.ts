import express from 'express';
import { Contract } from './domain/contract';
import { Endpoint, NetworkType } from './domain/endpoint';
import { createApolloServer, schema } from './graphql';

async function init(endpoint: Endpoint, contracts: Contract[]) {
  const app = express();

  // Instance Graphql server
  const server = await createApolloServer(app, schema, () => ({
    endpoint,
    contracts
  }));

  // Server startup
  await new Promise<void>(resolve => app.listen({ port: 4000 }, () => resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const PASCALIGO_EXAMPLE = 
`type storage is int

type parameter is
  Increment of int
| Decrement of int
| Reset

type return is list (operation) * storage

// Two entrypoints

function add (const store : storage; const delta : int) : storage is 
  store + delta

function sub (const store : storage; const delta : int) : storage is 
  store - delta

(* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. *)

function main (const action : parameter; const store : storage) : return is
 ((nil : list (operation)),    // No operations
  case action of
    Increment (n) -> add (store, n)
  | Decrement (n) -> sub (store, n)
  | Reset         -> 0
  end)
`;

const CAMELIGO_EXAMPLE = 
`type storage = int

type parameter =
  Increment of int
| Decrement of int
| Reset

type return = operation list * storage

// Two entrypoints

let add (store, delta : storage * int) : storage = store + delta
let sub (store, delta : storage * int) : storage = store - delta

(* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. *)

let main (action, store : parameter * storage) : return =
 ([] : operation list),    // No operations
 (match action with
   Increment (n) -> add (store, n)
 | Decrement (n) -> sub (store, n)
 | Reset         -> 0)
`;


const REASONLIGO_EXAMPLE = 
`type storage = int;

type parameter =
  Increment (int)
| Decrement (int)
| Reset;

type return = (list (operation), storage);

// Two entrypoints

let add = ((store, delta) : (storage, int)) : storage => store + delta;
let sub = ((store, delta) : (storage, int)) : storage => store - delta;

/* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. */

let main = ((action, store) : (parameter, storage)) : return => {
 (([] : list (operation)),    // No operations
 (switch (action) {
  | Increment (n) => add ((store, n))
  | Decrement (n) => sub ((store, n))
  | Reset         => 0}))
};
`;

const JSLIGO_EXAMPLE = 
`type storage = int;

type parameter =
| ["Increment", int]
| ["Decrement", int]
| ["Reset"];

type return_ = [list <operation>, storage];

/* Two entrypoints */

let add = ([store, delta] : [storage, int]) : storage => store + delta;
let sub = ([store, delta] : [storage, int]) : storage => store - delta;

/* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. */

let main = ([action, store] : [parameter, storage]) : return_ => {
 return [
   (list([]) as list <operation>),    // No operations
   (match (action, {
    Increment: (n: int) => add ([store, n]),
    Decrement: (n: int) => sub ([store, n]),
    Reset:     ()  => 0}))
  ]
};
`;


init({
    url: "https://testnet-tezos.giganode.io/",
    protocolVersion: NetworkType.GRANADANET,
  },
  [{
    name: "My PascaLIGO Contract.ligo",
    code: PASCALIGO_EXAMPLE,
    michelson: JSON.stringify([{}, {}, {}]),
  },
  {
    name: "My CameLIGO Contract.mligo",
    code: CAMELIGO_EXAMPLE,
    michelson: JSON.stringify([{}, {}, {}]),
  },
  {
    name: "My ReasonLIGO Contract.religo",
    code: REASONLIGO_EXAMPLE,
    michelson: JSON.stringify([{}, {}, {}]),
  },
  {
    name: "My JsLIGO Contract.jsligo",
    code: JSLIGO_EXAMPLE,
    michelson: JSON.stringify([{}, {}, {}]),
  }]
]);