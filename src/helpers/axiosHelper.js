import 'dotenv/config';
import axios from 'axios';
import * as urlHelper from './urlHelper';

/**
 * A function used to pass the API url, JWT if existing as well as other axios properties to be added
 * @param data - additional data to be passed to the axios function
 * @since 29.06.2020
 */

const { baseUrl } = urlHelper.backend;

export default (data = {}) => {
  const { token } = data;
  const baseURL = baseUrl;
  const jwt = token || localStorage.TAJYIRE_TOKEN || undefined;
  let headers = jwt && jwt !== '' ? { Authorization: `Bearer ${jwt}` } : '';
  // headers = data.headers && { ...headers, 'Content-Type': contentType };
  if (data.headers) {
    headers = { ...headers, 'content-type': data.headers['Content-Type'] };
  }
  return axios.create({ baseURL, headers });
};
