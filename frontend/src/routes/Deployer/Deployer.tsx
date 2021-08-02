import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader } from 'antd';
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from '@taquito/taquito';
import { useQuery } from '@apollo/client';
import { Contract, GET_CONTRACTS } from "../../graphql/contract";

import "./Deployer.css";
import { Summary } from "./Summary";
import { ContractsList } from "./ContractsList";
import { CodeViewer } from "../../shared/CodeViewer";

const {
  Header,
  Sider,
  Content,
  Footer,
} = Layout;

enum NetworkType {
  MAINNET = "mainnet",
  DELPHINET = "delphinet",
  EDONET = "edonet",
  FLORENCENET = "florencenet",
  GRANADANET = "granadanet",
  CUSTOM = "custom"
}

export const Deployer: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery<{ contracts: Contract[] }>(GET_CONTRACTS);
  const [selectedContract, setSelectedContract] = useState<Contract | undefined>();

  const handleDeploy = useCallback(() => {
    const options = { name: 'MyAwesomeDapp' };
    const wallet = new BeaconWallet(options);

    const Tezos = new TezosToolkit("");

    wallet
      .requestPermissions({ network: { type: NetworkType.FLORENCENET } })
      .then((_) => wallet.getPKH())
      .then((address: string) => console.log(`Your address: ${address}`));

    Tezos.setWalletProvider(wallet);
  }, []);

  if (loading) {
    return (
      <>Loading contracts...</>
    );
  }

  if (error) {
    return (
      <>
        <h1>Error loading contracts:</h1>
        <code>{ JSON.stringify(error, null, 2) }</code>
      </>
    )
  }

  const title = selectedContract ? `Deploying ${selectedContract.name}` : 'Select a contract';

  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={title} onBack={selectedContract && (() => setSelectedContract(undefined))} />
      </Header>
      <Layout>
        <Content className="page-content">
          { !selectedContract
            ? <ContractsList contracts={data?.contracts} onSelect={setSelectedContract} />
            : <CodeViewer language="pascaligo" code="type storage is int
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
              end)" />
          }
        </Content>
        <Sider className="page-sider">
          <Summary />
        </Sider>
      </Layout>
    </Layout>
  );

  // return (
  //   <>
  //     <h1>Deployer</h1>
  //     {data?.contracts.map(x => x.name)}
  //     <Button onClick={handleDeploy}>Deploy</Button>
  //   </>
  // )
}