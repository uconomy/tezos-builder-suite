import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { Endpoint, GET_ENDPOINT } from '../../../../graphql/endpoint';
import { ProgressCard } from '../../../../shared/ProgressCard';
import { DeployManager } from './DeployManager';
import { SignerManager } from './SignerManager';

import "./DeployConsole.css";

export const DeployConsole: React.FC = () => {
  const { data, loading } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);
  
  const { t } = useTranslation();

  return (
    <div className="deploy-console">
      <ProgressCard
        className="network"
        loading={loading}
        Icon={GlobalOutlined}
        title={t('deployer.networkWarning')}
        subtitle={t('deployer.networkEndpoint', { endpoint: data?.endpoint.url })}
      />
      <SignerManager />
      <DeployManager />
    </div>
  );
}