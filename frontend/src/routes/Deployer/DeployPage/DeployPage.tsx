import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import "./DeployPage.css";
import { CodeViewer } from "../../../shared/CodeViewer";
import { useDeployState } from "../state";
import { Endpoint, GET_ENDPOINT } from "../../../graphql/endpoint";
import { useQuery } from "@apollo/client";
import { DeployConsole } from "./DeployConsole";

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
  const [initialStorage] = useDeployState('initialStorage');

  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);

  const goBack = useCallback(() => {
    history.push('preview');
  }, [history]);

  if (!contract) {
    goBack();

    return null;
  }

  if (loading) {
    return <>{t('loadingEndpointSettings')}</>;
  }

  if (error) {
    return <>
      <h1>{t('endpointSettingsError')}</h1>
      <code>{JSON.stringify(error, null, 2)}</code>
    </>;
  }
  
  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={t(`deployer.titles.preview`, { name: contract.name })} onBack={goBack} />
      </Header>
      <Content className="page-content">
        <Tabs defaultActiveKey="1" className="page-tabs">
          <TabPane tab={t('deployer.storage.preview')} key="1">
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