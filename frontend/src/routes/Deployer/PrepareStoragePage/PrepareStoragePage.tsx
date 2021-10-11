import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import "./PrepareStoragePage.css";
import { useDeployState } from "../state";
import { CodeViewer } from "../../../shared/CodeViewer";
import { MichelsonStorageParser } from "./michelsonStorageParser";
import { StorageBuilder } from "./StorageBuilder";

const {
  Header,
  Content,
} = Layout;

const {
  TabPane,
} = Tabs;

export const PrepareStoragePage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [contract] = useDeployState('contract');
  const [michelsonStorage, setMichelsonStoage] = useState<MichelsonStorageParser>();

  useEffect(() => {
    if (!contract) {
      return;
    }

    const storage = new MichelsonStorageParser(contract.michelson);

    setMichelsonStoage(storage);
  }, [contract]);

  const goBack = useCallback(() => {
    history.push('check-contract');
  }, [history]);

  const onFinish = useCallback(() => {
    history.push('preview');
  }, [history]);

  if (!contract) {
    history.push('choose-contract');

    return null;
  }

  const unwrappedMichelson = michelsonStorage?.unwrapStorage();
  
  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={t(`deployer.titles.prepareStorage`, { name: contract.name })} onBack={goBack} />
      </Header>
      <Content className="page-content">
        <Tabs defaultActiveKey="1" className="page-tabs">
          <TabPane tab={t('deployer.storage.content')} key="1">
            <StorageBuilder unwrappedMichelson={unwrappedMichelson} onFinish={onFinish} />
          </TabPane>
          <TabPane tab={t('deployer.storage.jsonMichelson')} key="2">
            <CodeViewer code={michelsonStorage?.getMichelsonStorage() || "..."} language="json" className="code-viewer" />
          </TabPane>
          <TabPane tab={t('deployer.storage.unwrappedMichelson')} key="3">
            <CodeViewer code={JSON.stringify(unwrappedMichelson || "...", null, 2)} language="json" className="code-viewer" />
          </TabPane>
          <TabPane tab={t('deployer.storage.contractCode')} key="4">
            <CodeViewer code={contract.code} fileName={contract.name} className="code-viewer" />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}