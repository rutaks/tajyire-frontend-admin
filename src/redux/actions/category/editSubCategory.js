import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ subCategoryUuId, payload }) => (dispatch) =>
  dispatch(
    apiAction({
      httpOptions: { headers: { 'Content-Type': 'multipart/form-data' } },
      method: 'put',
      url: `/api/v1/sub-categories/${subCategoryUuId}`,
      data: payload,
      onStart: actionTypes.category.EDIT_SUBCATEGORY_START,
      onEnd: actionTypes.category.EDIT_SUBCATEGORY_END,
      onSuccess: actionTypes.category.EDIT_SUBCATEGORY_SUCCESS,
      onFailure: actionTypes.category.EDIT_SUBCATEGORY_FAILURE
    })
  );
