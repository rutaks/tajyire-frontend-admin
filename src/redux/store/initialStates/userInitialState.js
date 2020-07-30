import checkUser from '../../../helpers/checkUser';

export const userInitialState = {
  isAuth: checkUser(),
  user: localStorage.TAJYIRE_USER || '',
  token: localStorage.TAJYIRE_TOKEN || '',
  login: {
    success: false,
    loading: false,
    message: null,
    error: null
  },
  forgotPassword: {
    success: false,
    loading: false,
    message: null,
    error: null
  },
  resetPassword: {
    success: false,
    loading: false,
    message: null,
    error: null
  },
  activateAccount: {
    success: false,
    loading: false,
    message: null,
    error: null
  }
};
