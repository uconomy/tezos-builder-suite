import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { MenuItem, RouteDefinition } from '../../routes/routes.types';
import { Router } from '../Router';

import "./AppLayout.css";

const { Content, Header } = Layout;

export type AppLayoutProps = {
  menu: MenuItem[];
  routes: RouteDefinition[];
  defaultRoute: string;
  routerRoot: string;
}

const getDefaultOpenedKeys = (items: MenuItem[]) => {
  return items.filter(x => !!x.children).map(x => x.route.path);
}

const renderMenuItem = (item: MenuItem, index: number, root: string, history: any, t: TFunction) => {
  if (item.children) {
    return (
      <SubMenu
        key={`${item.route.path}`}
        icon={item.icon && <item.icon />}
        title={t(item.label)}
      >
        {item.children.map((e, i) => renderMenuItem(e, i, root, history, t))}
      </SubMenu>
    );
  }

  return (
    <Menu.Item
      key={`${root}${item.route.path}`}
      icon={item.icon && <item.icon />}
      onClick={() => history.push(`${root}${item.route.path}`)}
    >{t(item.label)}</Menu.Item>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ menu, routes, routerRoot, defaultRoute }) => {
  // const { isAuthenticated, isAuthenticating, user, login } = useAuth();
  const history = useHistory();
  const match = useRouteMatch();
  const { t } = useTranslation();

  const menuItems = menu.sort((a, b) => a.order < b.order ? -1 : 0);

  const pageMatch = useRouteMatch(menuItems.map(x => `${match.path}${x.route.path}`));
  const matchedPage = pageMatch ? pageMatch.path : '/';

  return (
    <Layout className="app-container">
      <Layout>
        <Header className="app-header">
          <div className="app-logo">
            Tezos deployer
          </div>

          <Menu mode="horizontal" theme="dark" selectedKeys={[matchedPage]} defaultOpenKeys={getDefaultOpenedKeys(menuItems)}>
            {menuItems.map((e, i) => renderMenuItem(e, i, match.path, history, t))}
          </Menu>
        </Header>
        <Content className="app-content">
          <Router routerRoot={routerRoot} defaultRoute={defaultRoute} routes={routes} />
        </Content>
      </Layout>
    </Layout>
  );
};
