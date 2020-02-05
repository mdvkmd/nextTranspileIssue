import _ from 'lodash';

export function getNewObjectCopy(ogObj) {
  const clone = {};
  return objClone(clone, ogObj);
}

function objClone(clone, obj) {
  try {
    for (const i in obj) { clone[i] = (typeof obj[i] === 'object' && obj[i] != null) ? this.objClone(obj[i].constructor(), obj[i]) : obj[i]; }
  } catch (e) {

  }
  return clone;
}

export const removeNullPropsFromObj = (obj) => {
  for (const key in obj) {
    !obj[key] && (delete obj[key]);
  }
  return obj;
};

export const getNextQueryParams = (baseURL, queryParams = {}, auxObj = {}) => {
  let hash = {};
  let queryString = '';
  if (queryParams.pathVars) {
    const hash = { ...queryParams.pathVars };
    Object.keys(hash).forEach((keyName) => {
      baseURL = baseURL.replace(new RegExp(`{${keyName}}`, 'g'), (hash[keyName] || ''));
    });
    return baseURL;
  }
  if (queryParams.querystring) {
    hash = { ...queryParams.querystring || {} };
    Object.keys(hash).forEach((keyName) => {
      queryString += `&${keyName}=${hash[keyName]}`;
    });
    const containsQuery = baseURL.indexOf('?') > 0;

    if (!containsQuery) {
      queryString = (queryString || '').substring(1);
      baseURL = `${baseURL}?`;
    }
    return `${baseURL}${queryString}`;
  }

  return '';
};
