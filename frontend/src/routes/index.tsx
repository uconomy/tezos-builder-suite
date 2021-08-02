import React from 'react';
import { Deployer } from './Deployer';
import { MenuConfig, RouteDefinition } from './routes.types';

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: () => <Deployer />,
    exact: true,
  }
];

export const menus: MenuConfig = [
  {
    route: routes[0],
    label: 'HOME',
    order: 3,
  }
];

export const defaultPage = "/";
