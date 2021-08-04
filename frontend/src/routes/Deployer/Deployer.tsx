import React from "react";
import { Layout } from 'antd';
// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { TezosToolkit } from '@taquito/taquito';

import "./Deployer.css";
import { Summary } from "./Summary";
import { Router } from "../../shared/Router";
import { routes } from "..";
import { defaultDeployerPage, deployerRoutes } from "./routes";

const {
  Sider,
} = Layout;

// enum NetworkType {
//   MAINNET = "mainnet",
//   DELPHINET = "delphinet",
//   EDONET = "edonet",
//   FLORENCENET = "florencenet",
//   GRANADANET = "granadanet",
//   CUSTOM = "custom"
// }

export const Deployer: React.FC = () => {
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

  return (
    <Layout className="page-container">
      <Router routerRoot={`/${routes[0].path}`} defaultRoute={defaultDeployerPage} routes={deployerRoutes} />
      <Sider className="page-sider" width={300}>
        <Summary />
      </Sider>
    </Layout>
  );
}