import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.GET_SUBCATEGORY_START:
      return {
        ...state,
        getSubCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.GET_SUBCATEGORY_END:
      return {
        ...state,
        getSubCategory: { ...state.getSubCategory, loading: false }
      };
    case actionTypes.category.GET_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        getSubCategory: { ...state.getSubCategory, payload: payload.payload, success: true }
      };
    case actionTypes.category.GET_SUBCATEGORY_FAILURE:
      return {
        ...state,
        getSubCategory: { ...state.getSubCategory, error: payload }
      };
    default:
      return null;
  }
};
