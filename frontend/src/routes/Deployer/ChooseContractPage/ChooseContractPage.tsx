import React, { useCallback, useEffect, useState } from "react";
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

  const [selectedContract, setContract] = useDeployState('contract');
  const [isComingBack, setIsComingBack] = useState<boolean>(true);

  const { data, loading, error } = useQuery<{ contracts: Contract[] }>(GET_CONTRACTS);

  useEffect(() => {
    setIsComingBack(!!selectedContract);

    setContract(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setContract]);

  const selectContract = useCallback((contract: Contract) => {
    setContract(contract);

    history.push(deployerRoutes[1].path);
  }, [setContract, history]);

  useEffect(() => {
    if (isComingBack) {
      return;
    }

    if (!data || !data.contracts || !data.contracts.length || data.contracts.length > 1) {
      return;
    }

    // Yeah, this if is unuseful, but it makes the code much more readable
    if (data.contracts.length === 1) {
      selectContract(data.contracts[0]);
    }
  }, [isComingBack, data, loading, error, selectContract]);

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