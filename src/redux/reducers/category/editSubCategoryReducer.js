import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.EDIT_SUBCATEGORY_START:
      return {
        ...state,
        editSubCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.EDIT_SUBCATEGORY_END:
      return {
        ...state,
        editSubCategory: { ...state.editSubCategory, loading: false }
      };
    case actionTypes.category.EDIT_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        editSubCategory: { ...state.editSubCategory, success: true }
      };
    case actionTypes.category.EDIT_SUBCATEGORY_FAILURE:
      return {
        ...state,
        editSubCategory: { ...state.editSubCategory, error: payload }
      };
    default:
      return null;
  }
};
