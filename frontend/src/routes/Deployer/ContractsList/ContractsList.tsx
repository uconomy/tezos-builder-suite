import React, { useCallback } from 'react';
import { List, Typography, Avatar } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { Contract } from '../../../graphql/contract';

import "./ContractsList.css";

const { Item } = List;

export interface ContractsListProps {
  contracts?: Contract[];
  onSelect?: (contract: Contract) => void;
};

export const ContractsList: React.FC<ContractsListProps> = (props) => {
  const { contracts, onSelect } = props;

  const handleSelection = useCallback((contract: Contract) => {
    if (onSelect) {
      onSelect(contract);
    }
  }, [onSelect]);

  if (contracts) {
    <>No contracts.</>
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
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </Item>
      )}
    />
  );
}