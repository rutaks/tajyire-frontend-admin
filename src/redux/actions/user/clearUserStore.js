import { actionTypes } from '../../action-types';
/**
 * A function used to clear user state
 * @author Rutakayile Samuel
 * @since 06.05.2020
 */
export default (payload) => (dispatch) =>
  dispatch({
    type: actionTypes.user.CLEAR_USER_STORE,
    payload
  });
