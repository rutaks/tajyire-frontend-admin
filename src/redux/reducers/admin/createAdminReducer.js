import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.admin.CREATE_ADMIN_START:
      return {
        ...state,
        createAdmin: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.admin.CREATE_ADMIN_END:
      return {
        ...state,
        createAdmin: { ...state.createAdmin, loading: false }
      };
    case actionTypes.admin.CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        adminPayload: {
          ...state.adminPayload,
          content: [payload.payload, ...state.adminPayload.content]
        },
        createAdmin: { ...state.createAdmin, success: true }
      };
    case actionTypes.admin.CREATE_ADMIN_FAILURE:
      return {
        ...state,
        createAdmin: { ...state.createAdmin, error: payload }
      };
    default:
      return null;
  }
};
