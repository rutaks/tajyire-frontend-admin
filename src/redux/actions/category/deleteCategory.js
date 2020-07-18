import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ categoryUuId }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'delete',
      url: `/api/v1/categories/${categoryUuId}`,
      onStart: actionTypes.category.DELETE_CATEGORY_START,
      onEnd: actionTypes.category.DELETE_CATEGORY_END,
      onSuccess: actionTypes.category.DELETE_CATEGORY_SUCCESS,
      onFailure: actionTypes.category.DELETE_CATEGORY_FAILURE
    })
  );
