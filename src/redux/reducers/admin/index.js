import { initialState } from '../../store/initialStates/';
import getAdminsReducer from './getAdminsReducer';
import createAdminReducer from './createAdminReducer';

/**
 * A function that provides reducer based on action currently being used
 * @param {Object} state - the current state being used, by default is the admin state
 * @param {Object} action - action type to be applied
 * @since 29.06.2020
 */
export default (state = initialState.admin, action) => {
  const getAdmins = getAdminsReducer(state, action);
  const createAdmin = createAdminReducer(state, action);
  return getAdmins || createAdmin || state;
};
