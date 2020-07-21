import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.GET_SUBCATEGORIES_START:
      return {
        ...state,
        getSubCategories: { payload: {}, success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.GET_SUBCATEGORIES_END:
      return {
        ...state,
        getSubCategories: { ...state.getSubCategories, loading: false }
      };
    case actionTypes.category.GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        editSubCategory: { ...state.editSubCategory, success: false },
        getSubCategories: { ...state.getSubCategories, payload: payload.payload, success: true }
      };
    case actionTypes.category.GET_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        getSubCategories: { ...state.getSubCategories, error: payload }
      };
    default:
      return null;
  }
};
