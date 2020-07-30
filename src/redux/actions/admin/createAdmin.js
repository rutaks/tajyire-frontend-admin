import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload = {}) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'post',
      url: `/api/v1/admins`,
      data: { ...payload },
      onStart: actionTypes.admin.CREATE_ADMIN_START,
      onEnd: actionTypes.admin.CREATE_ADMIN_END,
      onSuccess: actionTypes.admin.CREATE_ADMIN_SUCCESS,
      onFailure: actionTypes.admin.CREATE_ADMIN_FAILURE
    })
  );
