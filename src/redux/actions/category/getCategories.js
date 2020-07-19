import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ page = 0, size = 10, sortBy = 'id', sortDirection = 'DESC' }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/categories?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      onStart:
        page === -1
          ? actionTypes.category.GET_ALL_CATEGORIES_START
          : actionTypes.category.GET_CATEGORIES_START,
      onEnd:
        page === -1 ? actionTypes.category.GET_ALL_CATEGORIES_END : actionTypes.category.GET_CATEGORIES_END,
      onSuccess:
        page === -1
          ? actionTypes.category.GET_ALL_CATEGORIES_SUCCESS
          : actionTypes.category.GET_CATEGORIES_SUCCESS,
      onFailure:
        page === -1 ? actionTypes.category.GET_ALL_CATEGORIES_END : actionTypes.category.GET_CATEGORIES_END
    })
  );
