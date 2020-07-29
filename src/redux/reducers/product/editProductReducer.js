import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.product.EDIT_PRODUCT_START:
      return {
        ...state,
        editProduct: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.product.EDIT_PRODUCT_END:
      return {
        ...state,
        editProduct: { ...state.editProduct, loading: false }
      };
    case actionTypes.product.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        editProduct: { ...state.editProduct, success: true }
      };
    case actionTypes.product.EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        editProduct: { ...state.editProduct, error: payload }
      };
    default:
      return null;
  }
};
