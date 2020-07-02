import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.user.LOGIN_USER_START:
      localStorage.TAJYIRE_USER = '';
      localStorage.TAJYIRE_TOKEN = '';
      return {
        ...state,
        login: { ...state.login, success: false, message: null, loading: true, error: null }
      };
    case actionTypes.user.LOGIN_USER_END:
      return {
        ...state,
        login: { ...state.login, loading: false }
      };
    case actionTypes.user.LOGIN_USER_SUCCESS:
      localStorage.TAJYIRE_USER = JSON.stringify(payload.payload.user);
      localStorage.TAJYIRE_TOKEN = payload.payload.jwt;

      console.log(payload.payload.user);
      console.log(localStorage.TAJYIRE_USER);

      return {
        ...state,
        isAuth: true,
        profile: payload.payload.user,
        user: localStorage.TAJYIRE_USER,
        login: { loading: false, success: true, message: payload.message, error: null }
      };
    case actionTypes.user.LOGIN_USER_FAILURE:
      return {
        ...state,
        login: { loading: false, success: false, message: null, error: payload }
      };
    default:
      return null;
  }
};
