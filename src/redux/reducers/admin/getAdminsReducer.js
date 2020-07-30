import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.admin.GET_ADMINS_START:
      return {
        ...state,
        adminPayload: {},
        getAdmins: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.admin.GET_ADMINS_END:
      return {
        ...state,
        getAdmins: { ...state.getAdmins, loading: false }
      };
    case actionTypes.admin.GET_ADMINS_SUCCESS:
      return {
        ...state,
        adminPayload: payload.payload,
        getAdmins: { ...state.getAdmins, success: true }
      };
    case actionTypes.admin.GET_ADMINS_FAILURE:
      return {
        ...state,
        getAdmins: { ...state.getAdmins, error: payload }
      };
    default:
      return null;
  }
};
