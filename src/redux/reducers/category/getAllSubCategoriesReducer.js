import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.GET_ALL_SUBCATEGORIES_START:
      return {
        ...state,
        getAllSubCategories: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.GET_ALL_SUBCATEGORIES_END:
      return {
        ...state,
        getAllSubCategories: { ...state.getAllSubCategories, loading: false }
      };
    case actionTypes.category.GET_ALL_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        getAllSubCategories: { ...state.getAllSubCategories, payload: payload.payload, success: true }
      };
    case actionTypes.category.GET_ALL_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        getAllSubCategories: { ...state.getAllSubCategories, error: payload }
      };
    default:
      return null;
  }
};
