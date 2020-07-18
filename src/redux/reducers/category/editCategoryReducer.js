import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.EDIT_CATEGORY_START:
      return {
        ...state,
        editCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.EDIT_CATEGORY_END:
      return {
        ...state,
        editCategory: { ...state.editCategory, loading: false }
      };
    case actionTypes.category.EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        editCategory: { ...state.editCategory, success: true }
      };
    case actionTypes.category.EDIT_CATEGORY_FAILURE:
      return {
        ...state,
        editCategory: { ...state.editCategory, error: payload }
      };
    default:
      return null;
  }
};
