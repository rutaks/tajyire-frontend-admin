import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.CREATE_SUBCATEGORY_START:
      return {
        ...state,
        createSubCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.CREATE_SUBCATEGORY_END:
      return {
        ...state,
        createSubCategory: { ...state.createSubCategory, loading: false }
      };
    case actionTypes.category.CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        getSubCategories: {
          ...state.getSubCategories,
          payload: {
            content: [payload.payload, ...state.getSubCategories.payload.content]
          }
        },
        createSubCategory: { ...state.createSubCategory, success: true }
      };
    case actionTypes.category.CREATE_SUBCATEGORY_FAILURE:
      return {
        ...state,
        createSubCategory: { ...state.createSubCategory, error: payload }
      };
    default:
      return null;
  }
};
