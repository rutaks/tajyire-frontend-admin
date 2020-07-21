import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.category.GET_ALL_CATEGORIES_START:
      return {
        ...state,
        categoryPayload: {},
        getAllCategories: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.category.GET_ALL_CATEGORIES_END:
      return {
        ...state,
        getAllCategories: { ...state.getAllCategories, loading: false }
      };
    case actionTypes.category.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        getAllCategories: { ...state.getAllCategories, payload: payload.payload, success: true }
      };
    case actionTypes.category.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        getAllCategories: { ...state.getAllCategories, error: payload }
      };
    default:
      return null;
  }
};
