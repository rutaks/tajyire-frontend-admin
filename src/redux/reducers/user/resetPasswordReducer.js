import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.user.ACTIVATE_ACCOUNT_START:
      return {
        ...state,
        activateAccount: {
          ...state.activateAccount,
          message: null,
          loading: true,
          error: null,
          success: false
        }
      };
    case actionTypes.user.ACTIVATE_ACCOUNT_END:
      return {
        ...state,
        activateAccount: { ...state.activateAccount, loading: false }
      };
    case actionTypes.user.ACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        activateAccount: { loading: false, message: payload.message, error: null, success: true }
      };
    case actionTypes.user.ACTIVATE_ACCOUNT_FAILURE:
      return {
        ...state,
        activateAccount: { loading: false, message: null, error: payload, success: false }
      };
    default:
      return null;
  }
};
