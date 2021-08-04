import { Steps, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { AimOutlined } from '@ant-design/icons';
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

export const Summary: React.FC = (props) => {
  const [contract] = useDeployState('contract');

  const { t } = useTranslation();
  const history = useHistory();

  const renderConfirmButton = () => (
    <Button type="primary" className="summary-spacer" icon={<AimOutlined />} onClick={() => history.push('prepare-storage')}>
      {t(`deployer.confirmContract`)}
    </Button>
  );

  const step = orderedSteps.findIndex(x => history.location.pathname.endsWith(x)) || 0;

  return (
    <Steps direction="vertical" size="small" current={step}>
      <Step title={t(`deployer.steps.selectContract`)} description={contract && contract.name} />
      <Step title={t(`deployer.steps.checkContract`)} description={step === 1 && renderConfirmButton()} />
      <Step title={t(`deployer.steps.prepareStorage`)} />
      <Step title={t(`deployer.steps.preview`)} />
      <Step title={t(`deployer.steps.deploy`)}  />
    </Steps>
  );
}