import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ subCategoryUuId }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'delete',
      url: `/api/v1/sub-categories/${subCategoryUuId}`,
      onStart: actionTypes.category.DELETE_SUBCATEGORY_START,
      onEnd: actionTypes.category.DELETE_SUBCATEGORY_END,
      onSuccess: actionTypes.category.DELETE_SUBCATEGORY_SUCCESS,
      onFailure: actionTypes.category.DELETE_SUBCATEGORY_FAILURE
    })
  );
