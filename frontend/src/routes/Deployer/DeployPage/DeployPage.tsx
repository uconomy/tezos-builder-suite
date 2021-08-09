import React, { useCallback } from "react";

import { Layout, PageHeader, Tabs } from 'antd';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { CodeViewer } from "../../../shared/CodeViewer";
import { useDeployState } from "../state";
import { DeployConsole } from "./DeployConsole";

import "./DeployPage.css";

const {
  Header,
  Content,
} = Layout;

const {
  TabPane,
} = Tabs;

export const DeployPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [contract] = useDeployState('contract');
  const [storageContent] = useDeployState('storageContent');

  const goBack = useCallback(() => {
    history.push('preview');
  }, [history]);

  if (!contract) {
    goBack();

    return null;
  }
  
  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={t(`deployer.titles.deploy`, { name: contract.name })} onBack={goBack} />
      </Header>
      <Content className="page-content">
        <Tabs defaultActiveKey="1" className="page-tabs">
          <TabPane tab={t('deployer.storage.deploy')} key="1">
            <DeployConsole />
          </TabPane>
          <TabPane tab={t('deployer.storage.storageContent')} key="2">
            <CodeViewer code={JSON.stringify(storageContent, null, 2)} language="json" className="code-viewer" />
          </TabPane>
          <TabPane tab={t('deployer.storage.contractCode')} key="3"> 
            <CodeViewer code={contract.code} fileName={contract.name} className="code-viewer" />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}