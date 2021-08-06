import React from "react";
import { Layout } from 'antd';

import "./Deployer.css";
import { Summary } from "./Summary";
import { Router } from "../../shared/Router";
import { routes } from "..";
import { defaultDeployerPage, deployerRoutes } from "./routes";

const {
  Sider,
} = Layout;

export const Deployer: React.FC = () => {
  return (
    <Layout className="page-container">
      <Router routerRoot={`/${routes[0].path}`} defaultRoute={defaultDeployerPage} routes={deployerRoutes} />
      <Sider className="page-sider" width={300}>
        <Summary />
      </Sider>
    </Layout>
  );
}