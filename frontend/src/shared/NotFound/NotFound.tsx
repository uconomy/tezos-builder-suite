import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Empty, Layout } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  const history = useHistory();

  return (
    <Layout className="not-found-container">
      <Empty
        className="not-found"
        description="Sorry, we can't find the content you were looking for."
      />
      <p>This URL does not point to anything on this website.</p>
      <Button
        type='primary'
        className="not-found-action" 
        onClick={() => history.goBack()}
      >
        <ArrowLeftOutlined /> Go back
      </Button>
    </Layout>
  );
};

export default NotFound;