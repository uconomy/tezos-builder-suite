import React from 'react';
import { ChooseContractPage } from './ChooseContractPage';
import { RouteDefinition } from '../routes.types';
import { CheckContractPage } from './CheckContractPage';

export const deployerRoutes: RouteDefinition[] = [
  {
    path: "choose-contract",
    component: () => <ChooseContractPage />,
    exact: true,
  },
  {
    path: "check-contract",
    component: () => <CheckContractPage />,
    exact: true,
  }
];

export const defaultDeployerPage = deployerRoutes[0].path;
