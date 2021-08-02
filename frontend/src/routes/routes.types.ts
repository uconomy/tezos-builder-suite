export type RouteDefinition<T = any> = {
  path: string;
  component: React.ComponentType<T> | React.FC<T>;
  exact?: boolean;
  permissions?: {};
}

export type BaseMenuItem = {
  route: RouteDefinition;
  label: string;
  icon?: any;
  order: number;
};

export type MenuItem = BaseMenuItem & {
  children?: BaseMenuItem[];
};

export type MenuConfig = MenuItem[];
