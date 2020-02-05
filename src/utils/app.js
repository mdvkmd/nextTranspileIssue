import config from 'config';

export function isDevMode() {
  return (config.env.indexOf('DEV') >= 0);
}

export const basePathImage = () => {
  const basePath = '/static/images/';
  return `${basePath}`;
};

const prefix = process.env.NODE_ENV === 'production' ? process.env.SUB_DIR : '';

export const basePath = {
  image: `${prefix}/static/images/`,
  font: `${prefix}/static/fonts/`
};

