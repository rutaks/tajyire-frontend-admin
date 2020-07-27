import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ page = 0, size = 10, sortBy = 'id', sortDirection = 'DESC' }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/products?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      onStart: actionTypes.product.GET_PRODUCTS_START,
      onEnd: actionTypes.product.GET_PRODUCTS_END,
      onSuccess: actionTypes.product.GET_PRODUCTS_SUCCESS,
      onFailure: actionTypes.product.GET_PRODUCTS_END
    })
  );
