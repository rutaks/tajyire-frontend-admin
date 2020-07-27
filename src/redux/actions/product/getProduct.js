import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ productUuId }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'get',
      url: `/api/v1/products/${productUuId}`,
      onStart: actionTypes.product.GET_PRODUCT_START,
      onEnd: actionTypes.product.GET_PRODUCT_END,
      onSuccess: actionTypes.product.GET_PRODUCT_SUCCESS,
      onFailure: actionTypes.product.GET_PRODUCT_FAILURE
    })
  );
