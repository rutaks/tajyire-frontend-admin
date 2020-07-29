import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ categoryUuId = 0, page = 0, size = 10 }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/categories/${categoryUuId}/sub-categories?page=${page}&size=${size}`,
      onStart:
        page === -1
          ? actionTypes.category.GET_ALL_SUBCATEGORIES_START
          : actionTypes.category.GET_SUBCATEGORIES_START,
      onEnd:
        page === -1
          ? actionTypes.category.GET_ALL_SUBCATEGORIES_END
          : actionTypes.category.GET_SUBCATEGORIES_END,
      onSuccess:
        page === -1
          ? actionTypes.category.GET_ALL_SUBCATEGORIES_SUCCESS
          : actionTypes.category.GET_SUBCATEGORIES_SUCCESS,
      onFailure:
        page === -1
          ? actionTypes.category.GET_ALL_SUBCATEGORIES_END
          : actionTypes.category.GET_SUBCATEGORIES_END
    })
  );
