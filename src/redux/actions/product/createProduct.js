import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload) => (dispatch) =>
  dispatch(
    apiAction({
      httpOptions: { headers: { 'Content-Type': 'multipart/form-data' } },
      method: 'post',
      url: `/api/v1/products`,
      data: payload,
      onStart: actionTypes.product.CREATE_PRODUCT_START,
      onEnd: actionTypes.product.CREATE_PRODUCT_END,
      onSuccess: actionTypes.product.CREATE_PRODUCT_SUCCESS,
      onFailure: actionTypes.product.CREATE_PRODUCT_FAILURE
    })
  );
