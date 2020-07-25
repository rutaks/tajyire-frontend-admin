import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getBase64 } from '../../../helpers/imageHelper';
import ProductForm from '../ProductForm';
import createCategoryAction from '../../../redux/actions/category/createCategory';
import { Divider, message } from 'antd';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const CreateProduct = ({ createCategoryAction, createCategoryState: { loading, success, error } }) => {
  const history = useHistory();
  const [imageError, setImageError] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // const convertToImageFile = (object) => {
  //   object.originFileObj
  // };

  useEffect(() => {
    if (success) {
      message.success('Category created succesffully');
      clearFields();
    }
  }, [success, history]);

  useEffect(() => {
    error && message.error(error || 'Could not create category');
  }, [error]);

  const clearFields = () => {
    setFileList([]);
  };

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
          if (fileList < 1) {
            setImageError('Please select an image');
            return;
          }
          let parsedImages = [];
          parsedImages = fileList.map((file) => {
            return file.originFileObj;
          });
          let formData = new FormData();
          formData.append('name', name);
          formData.append('category', category);
          formData.append('price', price);
          formData.append('currency', currency);
          formData.append('discount', discount);
          formData.append('discountDeadline', discountDeadline);
          formData.append('images', parsedImages);
          formData.append('categoryId', category);
          // todo Add product creation process
          // createCategoryAction(formData);
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
  createCategoryState: PropTypes.object,
  /** API Action linked with redux to create a category */
  createCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  createCategoryState: state.category.createCategory
});

export default connect(mapStateToProps, { createCategoryAction })(CreateProduct);
