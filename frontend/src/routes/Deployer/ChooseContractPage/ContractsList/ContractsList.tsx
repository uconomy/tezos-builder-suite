import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { List, Avatar } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { Contract } from '../../../../graphql/contract';

import "./ContractsList.css";

const { Item } = List;

export interface ContractsListProps {
  contracts?: Contract[];
  onSelect?: (contract: Contract) => void;
};

export const ContractsList: React.FC<ContractsListProps> = (props) => {
  const { contracts, onSelect } = props;

  const { t } = useTranslation();

  const handleSelection = useCallback((contract: Contract) => {
    if (onSelect) {
      onSelect(contract);
    }
  }, [onSelect]);

  if (!contracts || !contracts.length) {
    return (
      <>{t('deployer.noContractFound')}</>
    )
  }

  return (
    <List
      className="contracts-list"
      bordered
      itemLayout="horizontal"
      dataSource={contracts}
      renderItem={item => (
        <Item className="contracts-list-item" onClick={() => handleSelection(item)}>
           <Item.Meta
            avatar={<Avatar icon={<FileTextOutlined />} />}
            title={item.name}
            description={`${item.code.length} bytes`}
          />
        </Item>
      )}
    />
  );
}