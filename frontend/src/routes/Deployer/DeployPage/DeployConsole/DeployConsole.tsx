import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import "./DeployConsole.css";
import { useDeployState } from '../../state';
import { ProgressCard } from '../../../../shared/ProgressCard';
import { Endpoint, GET_ENDPOINT } from '../../../../graphql/endpoint';
import { SignerManager } from './SignerManager';

export const DeployConsole: React.FC = () => {
  const [contract] = useDeployState('contract');
  const [signer] = useDeployState('signer');
  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);
  
  const { t } = useTranslation();

  return (
    <div className="deploy-console">
      <ProgressCard
        className="network"
        Icon={GlobalOutlined}
        title={t('deployer.networkWarning')}
        subtitle={t('deployer.networkEndpoint', { endpoint: data?.endpoint.url })}
      />
      <SignerManager />
      {!!signer &&
        <div className="call-to-action">
          <Button 
            type="primary"
            size="large"
            className="mega-button"
            onClick={() => null}
            disabled={!signer}
            loading={loading || !!error}
            icon={<CloudUploadOutlined />}
          >{t('deployer.deploy', { name: contract?.name })}</Button>
        </div>
      }
    </div>
  );
}