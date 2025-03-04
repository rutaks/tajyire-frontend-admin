import { userInitialState as user } from './userInitialState';
import { categoryInitialState as category } from './categoryInitialState';
import { productInitialState as product } from './productInitialState';
import { adminInitialState as admin } from './adminInitialState';

/**
 * An object that should hold all initialStates from the system
 * @since 29.06.2020
 */
export const initialState = {
  user,
  category,
  product,
  admin
};
