import fetch from 'isomorphic-unfetch';

export const plainDataGet = async (url) => {
  const opt = {
    withCredentials: false,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrer: 'no-referrer',
    method: 'GET'
  };

  const response = await fetch(url, opt);
  const responseText = await response.text();
  let parseResponse = null;
  try {
    parseResponse = JSON.parse(responseText);
  } catch (e) {
    parseResponse = responseText;
  }

  if (response.ok) return parseResponse;

  return new Promise((resolve, reject) => {
    reject(parseResponse);
  });
};

/* -------------------------------------------- NEW FETCH LAYER----------------------------------- */

const errorObject = async (res) => {
  const body = await res.json();
  const error = new Error(body.errorMessage || body);
  error.statusCode = res.status;
  error.statusText = res.statusText;
  error.code = body.errorCode;
  throw error;
};

export const validateResponse = async (resp) => {
  if (!resp.ok) return errorObject(resp);
  return {
    headers: resp.headers,
    data: await resp.json()
  };
};

export const validateTextResponse = async (resp) => {
  if (!resp.ok) return errorObject(resp);
  return {
    headers: resp.headers,
    data: await resp.text()
  };
};
