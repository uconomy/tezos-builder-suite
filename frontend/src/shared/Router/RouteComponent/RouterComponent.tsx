import React from "react";
import { RouteDefinition } from "../../../routes/routes.types";
import { Route } from 'react-router-dom';

export const RouteComponent: React.FC<RouteDefinition> = (route) => {
  const Component = route.component;

  return (
    <Route
      path={route.path}
      render={(props: unknown) => (
        <Component {...props} {...route} />
      )}
      exact={route.exact}
    />
  );
};