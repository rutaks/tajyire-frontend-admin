import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload = {}) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/api/v1/auth/admin-login',
      data: { ...payload },
      onStart: actionTypes.user.LOGIN_USER_START,
      onEnd: actionTypes.user.LOGIN_USER_END,
      onSuccess: actionTypes.user.LOGIN_USER_SUCCESS,
      onFailure: actionTypes.user.LOGIN_USER_FAILURE
    })
  );
