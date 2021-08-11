import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ProgressCard } from '../../../../../../shared/ProgressCard';

export interface SignerCardProps {
  signer?: string;
  signWith?: 'wallet' | 'faucet' | 'privateKey';
}

export const SignerCard: React.FC<SignerCardProps> = (props) => {
  const { signer, signWith } = props;

  const { t } = useTranslation();

  if (!signer) {
    return null;
  }

  return (
    <ProgressCard
      Icon={UserOutlined}
      title={t(`deployer.signerWarning.${signWith}`, { signer })}
      subtitle={t('deployer.signerWarningInfo')}
    />
  )
};