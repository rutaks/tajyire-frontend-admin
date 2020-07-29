import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import ProductForm from '../ProductForm';
import editProductAction from '../../../redux/actions/product/editProduct';
import getProductAction from '../../../redux/actions/product/getProduct';
import { message } from 'antd';
import EditProductBreadcrumb from './EditProductBreadcrumb';
import NotFound from '../../Results/NotFound';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const EditProduct = ({
  editProductAction,
  getProductAction,
  editProductState: { loading, success, error },
  getProductState,
  match
}) => {
  const { productUuId } = match.params;
  const history = useHistory();
  const [product, setProduct] = useState({
    id: null,
    uuid: null,
    name: '',
    price: null,
    priceCurrency: null,
    discountPrice: null,
    discountExpiryDate: null,
    category: {
      id: null,
      name: null
    },
    imageUrls: []
  });
  const [imageError, setImageError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    getProductAction({ productUuId });
  }, [productUuId, getProductAction]);

  useEffect(() => {
    if (getProductState.payload) {
      const imageUrls = JSON.parse(getProductState.payload.imageUrls);
      let parsedImages = imageUrls.map((imageUrl) => {
        return { uid: imageUrl, name: imageUrl, status: 'done', url: imageUrl };
      });
      setFileList(parsedImages);
      getProductState.payload.imageUrls = imageUrls;
      setProduct(getProductState.payload);
    }
  }, [getProductState.payload]);

  useEffect(() => {
    if (success) {
      message.success('Product modified successfully');
      history.goBack();
    }
  }, [success, history]);

  useEffect(() => {
    success && history.push('/products');
  }, [success, history]);

  useEffect(() => {
    error && message.error(error || 'Could not edit category');
  }, [error]);

  const removeExistingImages = (image) => {
    const index = product.imageUrls.indexOf(image.url) > -1;
    if (index !== -1) {
      setRemovedImages([...removedImages, image.url]);
    }
  };

  return (
    <Fragment>
      {!getProductState.loading && getProductState.error && (
        <NotFound message="Could not find the product" link="/" />
      )}
      {!getProductState.loading && getProductState.payload !== null && (
        <Fragment>
          <EditProductBreadcrumb productName={product.name} />
          <Formik
            initialValues={{
              name: product.name,
              category: product.category.id,
              categoryName: product.category.name,
              price: product.price,
              currency: product.priceCurrency,
              discount: product.discountPrice,
              discountDeadline: product.discountExpiryDate
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              price: Yup.number()
                .typeError('Price must be a number')
                .required('Price is required')
                .min(0, 'Price can not be less than 0')
                .max(1000000, 'Price can not be higher than 1M'),
              currency: Yup.mixed().required('Currency is required').oneOf(['USD', 'RWF'])
            })}
            onSubmit={({ name, category, price, currency, discount, discountDeadline }) => {
              setImageError(null);
              if (fileList < 1) return setImageError('Please select an image');
              let formData = new FormData();
              formData.append('name', name);
              formData.append('price', price);
              formData.append('priceCurrency', currency);
              formData.append('categoryId', category);
              for (let i = 0; i < fileList.length; i++) {
                if (fileList[i].originFileObj) {
                  formData.append('newImages', fileList[i].originFileObj);
                }
              }
              if (removedImages.length > 0) {
                for (let i = 0; i < removedImages.length; i++) {
                  formData.append('removedImages', removedImages[i]);
                }
              }
              if (discount !== null) {
                formData.append('discountPrice', discount);
                formData.append('discountExpiryDate', discountDeadline);
              }
              editProductAction(productUuId, formData);
            }}
          >
            {({ errors, touched, values }) => (
              <ProductForm
                errors={errors}
                loading={loading}
                touched={touched}
                handleImageChange={handleImageChange}
                fileList={fileList}
                imageError={imageError}
                values={values}
                formType="EDIT"
                removeExistingImages={removeExistingImages}
              />
            )}
          </Formik>
        </Fragment>
      )}
    </Fragment>
  );
};

EditProduct.propTypes = {
  /** Redux edit category state */
  editProductState: PropTypes.object,
  /** Redux get category state */
  getProductState: PropTypes.object,
  /** API Action linked with redux to get a category */
  getProductAction: PropTypes.func,
  /** API Action linked with redux to edit a category */
  editProductAction: PropTypes.func,
  /** Props containing url path and properties */
  match: PropTypes.object
};

const mapStateToProps = (state) => ({
  editProductState: state.product.editProduct,
  getProductState: state.product.getProduct
});

export default connect(mapStateToProps, { getProductAction, editProductAction })(EditProduct);
