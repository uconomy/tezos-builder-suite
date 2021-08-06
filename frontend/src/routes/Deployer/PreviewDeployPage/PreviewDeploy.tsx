import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout, PageHeader, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import { Estimate } from "@taquito/taquito/dist/types/contract/estimate";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";

import "./PreviewDeployPage.css";
import { CodeViewer } from "../../../shared/CodeViewer";
import { useDeployState } from "../state";
import { PreviewViewer } from "./PreviewViewer";
import { Endpoint, GET_ENDPOINT } from "../../../graphql/endpoint";
import { useQuery } from "@apollo/client";

const {
  Header,
  Content,
} = Layout;

const {
  TabPane,
} = Tabs;

export const PreviewDeployPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [contract] = useDeployState('contract');
  const [storageContent] = useDeployState('storageContent');
  const [initialStorage] = useDeployState('initialStorage');

  const [estimate, setEstimate] = useState<Estimate>();

  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);

  const goBack = useCallback(() => {
    history.push('prepare-storage');
  }, [history]);

  const handlePreviewRequest = useCallback(async () => {
    if (!contract || !initialStorage || !data) {
      return;
    }

    const LocalTezos = new TezosToolkit(data.endpoint.url);

    const faucet = {
      "mnemonic": [
        "home",
        "project",
        "ladder",
        "wrestle",
        "job",
        "opera",
        "diesel",
        "pelican",
        "abuse",
        "regret",
        "thought",
        "copy",
        "jar",
        "lens",
        "update"
      ],
      "secret": "8590ffddd7accb49fbb530ef24ff659b1f01314f",
      "amount": "8446026769",
      "pkh": "tz1PXAMbT7qszu7kzTCdbf6ZWJ5draAqSQCz",
      "password": "1VnbD0Fpmv",
      "email": "cxjfzamw.rpqmqqvb@tezos.example.org"
    };
    try {
      importKey(LocalTezos, faucet.email, faucet.password, faucet.mnemonic.join(' '), faucet.secret);
    } catch(err) {
      console.log('FAILED TO IMPORT KEY', err);
    }

    try {
      const op = await LocalTezos.estimate.originate({
        code: JSON.parse(contract.michelson),
        storage: initialStorage,
      });

      setEstimate(op);
    } catch(err) {
      alert('Deploy preview failed ' + JSON.stringify(err, null, 2));
    }
  }, [contract, initialStorage, data]);

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
            <PreviewViewer estimate={estimate} onRequestPreview={handlePreviewRequest} />
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