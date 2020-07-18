import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.GET_CATEGORY_START:
      return {
        ...state,
        getCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.GET_CATEGORY_END:
      return {
        ...state,
        getCategory: { ...state.getCategory, loading: false }
      };
    case actionTypes.category.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategory: { ...state.getCategory, payload: payload.payload, success: true }
      };
    case actionTypes.category.GET_CATEGORY_FAILURE:
      return {
        ...state,
        getCategory: { ...state.getCategory, error: payload }
      };
    default:
      return null;
  }
};
