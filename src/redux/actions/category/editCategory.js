import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ categoryUuId, payload }) => (dispatch) =>
  dispatch(
    apiAction({
      httpOptions: { headers: { 'Content-Type': 'multipart/form-data' } },
      method: 'put',
      url: `/api/v1/categories/${categoryUuId}`,
      data: payload,
      onStart: actionTypes.category.EDIT_CATEGORY_START,
      onEnd: actionTypes.category.EDIT_CATEGORY_END,
      onSuccess: actionTypes.category.EDIT_CATEGORY_SUCCESS,
      onFailure: actionTypes.category.EDIT_CATEGORY_FAILURE
    })
  );
