import { initialState } from '../../store/initialStates/';
import loginReducer from './loginReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import resetPasswordReducer from './resetPasswordReducer';
import activateAccountReducer from './activateAccountReducer';
import clearUserStoreReducer from './clearUserStoreReducer';

/**
 * A function that provides reducer based on action currently being used
 * @param {Object} state - the current state being used, by default is the user state
 * @param {Object} action - action type to be applied
 * @since 29.06.2020
 */
export default (state = initialState.user, action) => {
  const clearUserStore = clearUserStoreReducer(state, action);
  const login = loginReducer(state, action);
  const forgotPassword = forgotPasswordReducer(state, action);
  const resetPassword = resetPasswordReducer(state, action);
  const activateAccount = activateAccountReducer(state, action);
  return clearUserStore || login || forgotPassword || resetPassword || activateAccount || state;
};
