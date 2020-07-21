import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.DELETE_SUBCATEGORY_START:
      return {
        ...state,
        deleteSubCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.DELETE_SUBCATEGORY_END:
      return {
        ...state,
        deleteSubCategory: { ...state.deleteSubCategory, loading: false }
      };
    case actionTypes.category.DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        categoryPayload: {
          ...state.categoryPayload,
          content: state.categoryPayload.content.filter((category) => category.id !== payload.payload.id)
        },
        deleteSubCategory: { ...state.deleteSubCategory, success: true }
      };
    case actionTypes.category.DELETE_SUBCATEGORY_FAILURE:
      return {
        ...state,
        deleteSubCategory: { ...state.deleteSubCategory, error: payload }
      };
    default:
      return null;
  }
};
