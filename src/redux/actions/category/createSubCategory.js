import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload) => (dispatch) =>
  dispatch(
    apiAction({
      httpOptions: { headers: { 'Content-Type': 'multipart/form-data' } },
      method: 'post',
      url: `/api/v1/sub-categories`,
      data: payload,
      onStart: actionTypes.category.CREATE_SUBCATEGORY_START,
      onEnd: actionTypes.category.CREATE_SUBCATEGORY_END,
      onSuccess: actionTypes.category.CREATE_SUBCATEGORY_SUCCESS,
      onFailure: actionTypes.category.CREATE_SUBCATEGORY_FAILURE
    })
  );
