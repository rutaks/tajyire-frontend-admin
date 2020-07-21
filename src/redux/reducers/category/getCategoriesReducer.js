import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.GET_CATEGORIES_START:
      return {
        ...state,
        categoryPayload: {},
        getCategories: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.GET_CATEGORIES_END:
      return {
        ...state,
        getCategories: { ...state.getCategories, loading: false }
      };
    case actionTypes.category.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryPayload: payload.payload,
        editCategory: { ...state.editCategory, success: false },
        getCategories: { ...state.getCategories, success: true }
      };
    case actionTypes.category.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        getCategories: { ...state.getCategories, error: payload }
      };
    default:
      return null;
  }
};
