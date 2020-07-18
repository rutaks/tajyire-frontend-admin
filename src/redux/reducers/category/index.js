import { initialState } from '../../store/initialStates/';
import getCategoriesReducer from './getCategoriesReducer';
import createCategoryReducer from './createCategoryReducer';
import editCategoryReducer from './editCategoryReducer';
import getCategoryReducer from './getCategoryReducer';
import deleteCategoryReducer from './deleteCategoryReducer';

/**
 * A function that provides reducer based on action currently being used
 * @param {Object} state - the current state being used, by default is the user state
 * @param {Object} action - action type to be applied
 * @since 29.06.2020
 */
export default (state = initialState.category, action) => {
  const getCategories = getCategoriesReducer(state, action);
  const createCategory = createCategoryReducer(state, action);
  const getCategory = getCategoryReducer(state, action);
  const editCategory = editCategoryReducer(state, action);
  const deleteCategory = deleteCategoryReducer(state, action);
  return getCategories || createCategory || getCategory || editCategory || deleteCategory || state;
};
