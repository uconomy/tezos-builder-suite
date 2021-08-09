import { launch } from ".";
import { NetworkType } from "./domain/endpoint";

const COUNTER_MICHELSON = "[ { \"prim\": \"parameter\",\n    \"args\":\n      [ { \"prim\": \"or\",\n          \"args\":\n            [ { \"prim\": \"or\",\n                \"args\":\n                  [ { \"prim\": \"int\", \"annots\": [ \"%decrement\" ] },\n                    { \"prim\": \"int\", \"annots\": [ \"%increment\" ] } ] },\n              { \"prim\": \"unit\", \"annots\": [ \"%reset\" ] } ] } ] },\n  { \"prim\": \"storage\", \"args\": [ { \"prim\": \"int\" } ] },\n  { \"prim\": \"code\",\n    \"args\":\n      [ [ { \"prim\": \"UNPAIR\" },\n          { \"prim\": \"IF_LEFT\",\n            \"args\":\n              [ [ { \"prim\": \"IF_LEFT\",\n                    \"args\":\n                      [ [ { \"prim\": \"SWAP\" }, { \"prim\": \"SUB\" } ],\n                        [ { \"prim\": \"ADD\" } ] ] } ],\n                [ { \"prim\": \"DROP\", \"args\": [ { \"int\": \"2\" } ] },\n                  { \"prim\": \"PUSH\",\n                    \"args\": [ { \"prim\": \"int\" }, { \"int\": \"0\" } ] } ] ] },\n          { \"prim\": \"NIL\", \"args\": [ { \"prim\": \"operation\" } ] },\n          { \"prim\": \"PAIR\" } ] ] } ]\n\n";

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

const endpoint = {
  url: "https://testnet-tezos.giganode.io/",
  protocolVersion: NetworkType.FLORENCENET,
};

const contracts = [
  {
    name: "My PascaLIGO Contract.ligo",
    code: PASCALIGO_EXAMPLE,
    michelson: COUNTER_MICHELSON,
  },
  {
    name: "My CameLIGO Contract.mligo",
    code: CAMELIGO_EXAMPLE,
    michelson: COUNTER_MICHELSON,
  },
  {
    name: "My ReasonLIGO Contract.religo",
    code: REASONLIGO_EXAMPLE,
    michelson: COUNTER_MICHELSON,
  },
  {
    name: "My JsLIGO Contract.jsligo",
    code: JSLIGO_EXAMPLE,
    michelson: COUNTER_MICHELSON,
  },
];

launch({ 
  endpoint,
  contracts
}, { openBrowser: false });