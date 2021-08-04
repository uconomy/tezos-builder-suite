import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader } from 'antd';
import { useQuery } from '@apollo/client';
import { Contract, GET_CONTRACTS } from "../../../graphql/contract";
import { useHistory } from 'react-router-dom';

import "./ChooseContractPage.css";
import { ContractsList } from "./ContractsList";
import { deployerRoutes } from "../routes";
import { useDeployState } from "../state";

const {
  Header,
  Content,
} = Layout;

export const ChooseContractPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [, setContract] = useDeployState('contract');

  const { data, loading, error } = useQuery<{ contracts: Contract[] }>(GET_CONTRACTS);

  useEffect(() => {
    setContract(undefined);
  }, [setContract]);

  const selectContract = useCallback((contract: Contract) => {
    setContract(contract);

    history.push(deployerRoutes[1].path);
  }, [setContract, history]);

  if (loading) {
    return (
      <Layout>
        <Content className="page-content">
          <>{t('deployer.loadingContracts')}</>
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Content className="page-content">
          <h1>{t('deployer.errorLoadingContracts')}</h1>
          <code>{ JSON.stringify(error, null, 2) }</code>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header className="page-header">
        <PageHeader title={t(`deployer.titles.selectContract`)} />
      </Header>
      <Content className="page-content">
        <ContractsList contracts={data?.contracts} onSelect={selectContract} />
      </Content>
    </Layout>
  );
}