import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.product.GET_PRODUCTS_START:
      return {
        ...state,
        productPayload: {},
        getProducts: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.product.GET_PRODUCTS_END:
      return {
        ...state,
        getProducts: { ...state.getProducts, loading: false }
      };
    case actionTypes.product.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productPayload: payload.payload,
        editProduct: { ...state.editProduct, success: false },
        createProduct: { ...state.createProduct, success: false },
        getProducts: { ...state.getProducts, success: true }
      };
    case actionTypes.product.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        getProducts: { ...state.getProducts, error: payload }
      };
    default:
      return null;
  }
};
