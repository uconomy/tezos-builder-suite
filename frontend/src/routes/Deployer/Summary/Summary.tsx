import { Steps, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { AimOutlined } from '@ant-design/icons';

import "./Summary.css";

const { Step } = Steps;

export interface SummaryProps {
  step: number;
  contractNane?: string;
}

export const Summary: React.FC<SummaryProps> = (props) => {
  const {
    step,
    contractNane
  } = props;

  const { t } = useTranslation();

  const renderConfirmButton = () => (
    <Button type="primary" className="summary-spacer" icon={<AimOutlined />}>
      {t(`deployer.confirmContract`)}
    </Button>
  );

  return (
    <Steps direction="vertical" size="small" current={step}>
      <Step title={t(`deployer.steps.selectContract`)} description={contractNane} />
      <Step title={t(`deployer.steps.checkContract`)} description={step === 1 && renderConfirmButton()} />
    </Steps>
  );
}