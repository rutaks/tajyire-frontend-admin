import 'dotenv/config';
/**
 * A file where urls should be kept as well as other env variables
 * @since 29.06.2020
 */

// eslint-disable-next-line no-undef
const { REACT_APP_BASE_URL_BACKEND } = process.env;

const backend = {
  baseUrl: REACT_APP_BASE_URL_BACKEND || 'http://localhost:8080'
};

export { backend };
