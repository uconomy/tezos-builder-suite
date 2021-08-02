import admin from './admin.json';
import backoffice from './backoffice';
import common from './common.json';

const translation = {
  ...backoffice,
  admin,
  common,
};

// Leave exports as they are here
const _translation = {
  translation,
};

export default _translation;
