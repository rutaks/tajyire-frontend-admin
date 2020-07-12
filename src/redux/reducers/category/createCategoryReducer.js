import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.CREATE_CATEGORY_START:
      return {
        ...state,
        createCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.CREATE_CATEGORY_END:
      return {
        ...state,
        createCategory: { ...state.createCategory, loading: false }
      };
    case actionTypes.category.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createCategory: { ...state.createCategory, success: true }
      };
    case actionTypes.category.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        createCategory: { ...state.createCategory, error: payload.message }
      };
    default:
      return null;
  }
};
