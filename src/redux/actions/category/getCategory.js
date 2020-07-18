import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ categoryUuId }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/categories/${categoryUuId}`,
      onStart: actionTypes.category.GET_CATEGORY_START,
      onEnd: actionTypes.category.GET_CATEGORY_END,
      onSuccess: actionTypes.category.GET_CATEGORY_SUCCESS,
      onFailure: actionTypes.category.GET_CATEGORY_FAILURE
    })
  );
