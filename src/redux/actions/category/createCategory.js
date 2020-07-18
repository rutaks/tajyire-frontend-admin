import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload) => (dispatch) =>
  dispatch(
    apiAction({
      httpOptions: { headers: { 'Content-Type': 'multipart/form-data' } },
      method: 'post',
      url: `/api/v1/categories`,
      data: payload,
      onStart: actionTypes.category.CREATE_CATEGORY_START,
      onEnd: actionTypes.category.CREATE_CATEGORY_END,
      onSuccess: actionTypes.category.CREATE_CATEGORY_SUCCESS,
      onFailure: actionTypes.category.CREATE_CATEGORY_FAILURE
    })
  );
