import React from 'react';
import { ChooseContractPage } from './ChooseContractPage';
import { RouteDefinition } from '../routes.types';
import { CheckContractPage } from './CheckContractPage';
import { PrepareStoragePage } from './PrepareStoragePage';

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
  },
  {
    path: "prepare-storage",
    component: () => <PrepareStoragePage />,
    exact: true,
  }
];

export const defaultDeployerPage = deployerRoutes[0].path;
