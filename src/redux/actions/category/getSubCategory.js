import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ subCategoryUuId }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/sub-categories/${subCategoryUuId}`,
      onStart: actionTypes.category.GET_SUBCATEGORY_START,
      onEnd: actionTypes.category.GET_SUBCATEGORY_END,
      onSuccess: actionTypes.category.GET_SUBCATEGORY_SUCCESS,
      onFailure: actionTypes.category.GET_SUBCATEGORY_FAILURE
    })
  );
