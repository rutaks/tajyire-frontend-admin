import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ page = 0, size = 10, sortBy = 'id', sortDirection = 'DESC' }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/categories?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      onStart: actionTypes.category.GET_CATEGORIES_START,
      onEnd: actionTypes.category.GET_CATEGORIES_END,
      onSuccess: actionTypes.category.GET_CATEGORIES_SUCCESS,
      onFailure: actionTypes.category.GET_CATEGORIES_FAILURE
    })
  );
