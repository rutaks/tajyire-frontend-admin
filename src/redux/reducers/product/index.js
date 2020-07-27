import { initialState } from '../../store/initialStates/';
import getProductsReducer from './getProductsReducer';
import createProductReducer from './createProductReducer';
import deleteProductReducer from './deleteProductReducer';

/**
 * A function that provides reducer based on action currently being used
 * @param {Object} state - the current state being used, by default is the user state
 * @param {Object} action - action type to be applied
 * @since 29.06.2020
 */
export default (state = initialState.product, action) => {
  const getProducts = getProductsReducer(state, action);
  const createProduct = createProductReducer(state, action);
  const deleteProduct = deleteProductReducer(state, action);
  return getProducts || createProduct || deleteProduct || state;
};
