import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.DELETE_CATEGORY_START:
      return {
        ...state,
        deleteCategory: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.DELETE_CATEGORY_END:
      return {
        ...state,
        deleteCategory: { ...state.deleteCategory, loading: false }
      };
    case actionTypes.category.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryPayload: {
          ...state.categoryPayload,
          content: state.categoryPayload.content.filter((category) => category.id !== payload.payload.id)
        },
        deleteCategory: { ...state.deleteCategory, success: true }
      };
    case actionTypes.category.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        deleteCategory: { ...state.deleteCategory, error: payload }
      };
    default:
      return null;
  }
};
