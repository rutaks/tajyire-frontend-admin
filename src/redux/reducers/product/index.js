import { initialState } from '../../store/initialStates/';
import getProductsReducer from './getProductsReducer';
import getProductReducer from './getProductReducer';
import createProductReducer from './createProductReducer';
import deleteProductReducer from './deleteProductReducer';
import editProductReducer from './editProductReducer';

/**
 * A function that provides reducer based on action currently being used
 * @param {Object} state - the current state being used, by default is the user state
 * @param {Object} action - action type to be applied
 * @since 29.06.2020
 */
export default (state = initialState.product, action) => {
  const getProducts = getProductsReducer(state, action);
  const getProduct = getProductReducer(state, action);
  const createProduct = createProductReducer(state, action);
  const deleteProduct = deleteProductReducer(state, action);
  const editProduct = editProductReducer(state, action);
  return getProducts || getProduct || createProduct || deleteProduct || editProduct || state;
};
