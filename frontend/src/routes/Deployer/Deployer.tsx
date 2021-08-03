import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader } from 'antd';
// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { TezosToolkit } from '@taquito/taquito';
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
} = Layout;

const steps = [
  "selectContract",
  "checkContract",
];

// enum NetworkType {
//   MAINNET = "mainnet",
//   DELPHINET = "delphinet",
//   EDONET = "edonet",
//   FLORENCENET = "florencenet",
//   GRANADANET = "granadanet",
//   CUSTOM = "custom"
// }

export const Deployer: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery<{ contracts: Contract[] }>(GET_CONTRACTS);

  const [selectedContract, setSelectedContract] = useState<Contract | undefined>();
  const [step, setStep] = useState<number>(0);

  const selectContract = useCallback((contract: Contract) => {
    setStep(1);
    setSelectedContract(contract);
  }, []);

  const delectContract = useCallback(() => {
    setStep(0);
    setSelectedContract(undefined);
  }, []);

  // const handleDeploy = useCallback(() => {
  //   const options = { name: 'MyAwesomeDapp' };
  //   const wallet = new BeaconWallet(options);

  //   const Tezos = new TezosToolkit("");

  //   wallet
  //     .requestPermissions({ network: { type: NetworkType.FLORENCENET } })
  //     .then((_) => wallet.getPKH())
  //     .then((address: string) => console.log(`Your address: ${address}`));

  //   Tezos.setWalletProvider(wallet);
  // }, []);

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

  const title = t(`deployer.titles.${steps[step]}`, {
    name: selectedContract?.name 
  });

  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={title} onBack={selectedContract && delectContract} />
      </Header>
      <Layout>
        <Content className="page-content">
          { !selectedContract
            ? <ContractsList contracts={data?.contracts} onSelect={selectContract} />
            : <CodeViewer fileName={selectedContract.name} code={selectedContract.code} lineNumbers />
          }
        </Content>
        <Sider className="page-sider" width={300}>
          <Summary step={step} contractNane={selectedContract && selectedContract.name} />
        </Sider>
      </Layout>
    </Layout>
  );
}