import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ categoryUuId = 0, page = 0, size = 10 }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/categories/${categoryUuId}/sub-categories?page=${page}&size=${size}`,
      onStart: actionTypes.category.GET_SUBCATEGORIES_START,
      onEnd: actionTypes.category.GET_SUBCATEGORIES_END,
      onSuccess: actionTypes.category.GET_SUBCATEGORIES_SUCCESS,
      onFailure: actionTypes.category.GET_SUBCATEGORIES_FAILURE
    })
  );
