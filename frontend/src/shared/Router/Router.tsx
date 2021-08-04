import React from 'react';
import { Redirect, Route, Switch, useRouteMatch, match } from 'react-router-dom';
import { RouteDefinition } from '../../routes/routes.types';
import { NotFound } from '../NotFound';
import { RouteComponent } from './RouteComponent';

export type RouterProps = {
  routes: RouteDefinition[];
  routerRoot: string; // The URL the Switch is mounted
  defaultRoute: string; // Default subnav route
}

const computeRoute = (match: match<{}>, path: string) => 
  (match.path === path)
  ? path
  : `${match.path}${match.path.endsWith('/') ? '' : '/'}${path}`;

export const Router: React.FC<RouterProps> = ({ routes, routerRoot, defaultRoute }) => {
  const match = useRouteMatch();

  return (
    <Switch>
      {routes.map((route, index) => 
        <RouteComponent 
          key={`${match.path}${index}`}
          component={route.component}
          path={computeRoute(match, route.path)}
        />
      )}
      {routerRoot !== defaultRoute && 
        <Redirect
          from={routerRoot}
          to={computeRoute(match, defaultRoute)}
          exact={true} />
      }
      <Route component={NotFound} />
    </Switch>
  )
};
