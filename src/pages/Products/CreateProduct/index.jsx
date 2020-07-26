import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import ProductForm from '../ProductForm';
import createProductAction from '../../../redux/actions/product/createProduct';
import { Divider, message } from 'antd';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const CreateProduct = ({ createProductAction, createProductState: { loading, success, error } }) => {
  const history = useHistory();
  const [imageError, setImageError] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    if (success) {
      message.success('Category created succesffully');
      history.goBack();
    }
  }, [success, history]);

  useEffect(() => {
    error && message.error(error || 'Could not create category');
  }, [error]);

  return (
    <Fragment>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Create Product
      </Divider>
      <Formik
        initialValues={{
          name: '',
          category: '',
          price: '',
          currency: '',
          discount: null,
          discountDeadline: null
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
            formData.append('images', fileList[i].originFileObj);
          }
          if (discount !== null) {
            formData.append('discountPrice', discount);
            formData.append('discountExpiryDate', discountDeadline);
          }
          createProductAction(formData);
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
          />
        )}
      </Formik>
    </Fragment>
  );
};

CreateProduct.propTypes = {
  /** Redux create category state */
  createProductState: PropTypes.object,
  /** API Action linked with redux to create a category */
  createProductAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  createProductState: state.product.createProduct
});

export default connect(mapStateToProps, { createProductAction })(CreateProduct);
