import AntdIcon, { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

import "./ProgressCard.css";

export interface ProgressCardProps {
  className?: string;
  Icon?: typeof AntdIcon;
  loading?: boolean;
  title: string;
  subtitle?: string;
};

export const ProgressCard: React.FC<ProgressCardProps> = (props) => {
  const { className,Icon, loading, title, subtitle, children } = props;

  return (
    <div className={`progress-card${className ? ` ${className}` : ''}`}>
      {loading ? <LoadingOutlined className="big-icon" /> : (Icon && <Icon className="big-icon icon-color" />) }
      <div className="progress-card-message">
        <label className="title">{title}</label>
        {subtitle && <span className="subtitle">{subtitle}</span>}
        {children}
      </div>
    </div>
  );
}