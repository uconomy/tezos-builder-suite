import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';

import 'antd/dist/antd.css';

import './index.css';
import "./locales";

import { defaultPage, menus, routes } from './routes';
// import { Router } from './shared/Router';
import { AppLayout } from './shared/AppLayout';
import { graphqlClient } from './graphql';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={graphqlClient}>
      <BrowserRouter>
        <AppLayout defaultRoute={defaultPage} routerRoot="/" routes={routes} menu={menus} />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
