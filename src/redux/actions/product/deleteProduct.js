import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default ({ productUuId }) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'delete',
      url: `/api/v1/products/${productUuId}`,
      onStart: actionTypes.product.DELETE_PRODUCT_START,
      onEnd: actionTypes.product.DELETE_PRODUCT_END,
      onSuccess: actionTypes.product.DELETE_PRODUCT_SUCCESS,
      onFailure: actionTypes.product.DELETE_PRODUCT_FAILURE
    })
  );
