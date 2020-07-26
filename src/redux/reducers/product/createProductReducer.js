import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.product.CREATE_PRODUCT_START:
      return {
        ...state,
        createProduct: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.product.CREATE_PRODUCT_END:
      return {
        ...state,
        createProduct: { ...state.createProduct, loading: false }
      };
    case actionTypes.product.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProduct: { ...state.createProduct, success: true }
      };
    case actionTypes.product.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        createProduct: { ...state.createProduct, error: payload }
      };
    default:
      return null;
  }
};
