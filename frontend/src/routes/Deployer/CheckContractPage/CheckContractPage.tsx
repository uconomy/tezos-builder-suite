import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';

import "./CheckContractPage.css";
import { CodeViewer } from "../../../shared/CodeViewer";
import { useDeployState } from "../state";

const {
  Header,
  Content,
} = Layout;

export const CheckContractPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [contract] = useDeployState('contract');

  const goBack = useCallback(() => {
    history.push('choose-contract');
  }, [history]);

  if (!contract) {
    goBack();

    return null;
  }
  
  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={t(`deployer.titles.checkContract`, { name: contract.name })} onBack={goBack} />
      </Header>
      <Content className="page-content">
        <CodeViewer className="code-viewer" fileName={contract.name} code={contract.code} />
      </Content>
    </Layout>
  );
}