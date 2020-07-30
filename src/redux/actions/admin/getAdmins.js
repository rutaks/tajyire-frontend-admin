import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ page = 0, size = 10, sortBy = 'id', sortDirection = 'DESC' }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/admins?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      onStart: actionTypes.admin.GET_ADMINS_START,
      onEnd: actionTypes.admin.GET_ADMINS_END,
      onSuccess: actionTypes.admin.GET_ADMINS_SUCCESS,
      onFailure: actionTypes.admin.GET_ADMINS_END
    })
  );
