import { Steps, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { AimOutlined, SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import "./Summary.css";
import { useDeployState } from '../state';

const { Step } = Steps;

const orderedSteps = [
  'choose-contract',
  'check-contract',
  'storage',
  'preview',
  'deploy'
]

export const Summary: React.FC = () => {
  const [contract] = useDeployState('contract');
  const [activeForm] = useDeployState('activeForm');
  const [estimates] = useDeployState('estimates');
  const { t } = useTranslation();
  const history = useHistory();

  const renderConfirmContractButton = () => (
    <Button type="primary" className="summary-spacer" icon={<AimOutlined />} onClick={() => history.push('prepare-storage')}>
      {t(`deployer.confirmContract`)}
    </Button>
  );

  const renderVerifyStorageButton = () => (
    <Button 
      type="primary" 
      className="summary-spacer" 
      icon={<SaveOutlined />}
      disabled={!activeForm}
      onClick={() => { activeForm?.submit(); }}
    >
      {t(`deployer.verifyAndSaveStorage`)}
    </Button>
  );

  const renderAknowledgeEstimatesButton = () => (
    <Button 
      type="primary" 
      className="summary-spacer" 
      icon={<CheckOutlined />}
      disabled={!estimates}
      onClick={() => history.push('deploy')}
    >
      {t(`deployer.aknowledgeEstimates`)}
    </Button>
  );

  const step = orderedSteps.findIndex(x => history.location.pathname.endsWith(x)) || 0;

  return (
    <Steps direction="vertical" size="small" current={step}>
      <Step title={t(`deployer.steps.selectContract`)} description={contract && contract.name} />
      <Step title={t(`deployer.steps.checkContract`)} description={step === 1 && renderConfirmContractButton()} />
      <Step title={t(`deployer.steps.prepareStorage`)} description={step === 2 && renderVerifyStorageButton()} />
      <Step title={t(`deployer.steps.preview`)} description={step === 3 && renderAknowledgeEstimatesButton()} />
      <Step title={t(`deployer.steps.deploy`)}  />
    </Steps>
  );
}