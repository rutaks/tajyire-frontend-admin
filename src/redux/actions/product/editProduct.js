import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload) => (dispatch) =>
  dispatch(
    apiAction({
      httpOptions: { headers: { 'Content-Type': 'multipart/form-data' } },
      method: 'put',
      url: `/api/v1/products`,
      data: payload,
      onStart: actionTypes.product.EDIT_PRODUCT_START,
      onEnd: actionTypes.product.EDIT_PRODUCT_END,
      onSuccess: actionTypes.product.EDIT_PRODUCT_SUCCESS,
      onFailure: actionTypes.product.EDIT_PRODUCT_FAILURE
    })
  );
