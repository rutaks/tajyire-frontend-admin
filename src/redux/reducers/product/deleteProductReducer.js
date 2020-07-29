import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.product.DELETE_PRODUCT_START:
      return {
        ...state,
        deleteProduct: { success: false, message: null, loading: true, error: null }
      };
    case actionTypes.product.DELETE_PRODUCT_END:
      return {
        ...state,
        deleteProduct: { ...state.deleteProduct, loading: false }
      };
    case actionTypes.product.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productPayload: {
          ...state.productPayload,
          content: state.productPayload.content.filter((product) => product.id !== payload.payload.id)
        },
        deleteProduct: { ...state.deleteProduct, success: true }
      };
    case actionTypes.product.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        deleteProduct: { ...state.deleteProduct, error: payload }
      };
    default:
      return null;
  }
};
