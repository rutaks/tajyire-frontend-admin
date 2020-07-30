import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload, token) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'post',
      url: `/api/v1/auth/final-step/${token}`,
      data: { ...payload },
      onStart: actionTypes.user.ACTIVATE_ACCOUNT_START,
      onEnd: actionTypes.user.ACTIVATE_ACCOUNT_END,
      onSuccess: actionTypes.user.ACTIVATE_ACCOUNT_SUCCESS,
      onFailure: actionTypes.user.ACTIVATE_ACCOUNT_FAILURE
    })
  );
