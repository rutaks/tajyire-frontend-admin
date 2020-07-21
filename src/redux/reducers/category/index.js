import { initialState } from '../../store/initialStates/';
import getCategoriesReducer from './getCategoriesReducer';
import getAllCategoriesReducer from './getAllCategoriesReducer';
import createCategoryReducer from './createCategoryReducer';
import editCategoryReducer from './editCategoryReducer';
import getCategoryReducer from './getCategoryReducer';
import deleteCategoryReducer from './deleteCategoryReducer';
import getSubCategoriesReducer from './getSubCategoriesReducer';
import createSubCategoryReducer from './createSubCategoryReducer';
import getSubCategoryReducer from './getSubCategoryReducer';
import editSubCategoryReducer from './editSubCategoryReducer';

/**
 * A function that provides reducer based on action currently being used
 * @param {Object} state - the current state being used, by default is the user state
 * @param {Object} action - action type to be applied
 * @since 29.06.2020
 */
export default (state = initialState.category, action) => {
  const getCategories = getCategoriesReducer(state, action);
  const getAllCategories = getAllCategoriesReducer(state, action);
  const createCategory = createCategoryReducer(state, action);
  const getCategory = getCategoryReducer(state, action);
  const editCategory = editCategoryReducer(state, action);
  const deleteCategory = deleteCategoryReducer(state, action);
  const getSubCategories = getSubCategoriesReducer(state, action);
  const createSubCategory = createSubCategoryReducer(state, action);
  const getSubCategory = getSubCategoryReducer(state, action);
  const editSubCategory = editSubCategoryReducer(state, action);
  return (
    getCategories ||
    getAllCategories ||
    createCategory ||
    getCategory ||
    editCategory ||
    deleteCategory ||
    getSubCategories ||
    createSubCategory ||
    getSubCategory ||
    editSubCategory ||
    state
  );
};
