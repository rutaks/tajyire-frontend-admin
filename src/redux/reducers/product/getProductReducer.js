import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.product.GET_PRODUCT_START:
      return {
        ...state,
        getProduct: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.product.GET_PRODUCT_END:
      return {
        ...state,
        getProduct: { ...state.getProduct, loading: false }
      };
    case actionTypes.product.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        getProduct: { ...state.getProduct, payload: payload.payload, success: true }
      };
    case actionTypes.product.GET_PRODUCT_FAILURE:
      return {
        ...state,
        getProduct: { ...state.getProduct, error: payload }
      };
    default:
      return null;
  }
};
