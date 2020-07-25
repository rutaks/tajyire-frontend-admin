import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getBase64 } from '../../../helpers/imageHelper';
import CategoryForm from '../CategoryForm';
import createCategoryAction from '../../../redux/actions/category/createCategory';
import { message } from 'antd';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const CreateCategory = ({ createCategoryAction, createCategoryState: { loading, success, error } }) => {
  const history = useHistory();
  const [imageUrls, setImageUrls] = useState('');
  const [imageFiles, setImageFiles] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleImageChange = (info) => {
    console.log(info);
    // const files = info.file.originFileObj;
    // try {
    //   getBase64(info.file.originFileObj, (imageUrl) => {
    //     setImageUrls(false);
    //     setImageUrls(imageUrl);
    //   });
    //   setImageFiles(files);
    // } catch (error) {
    //   console.log('IMAGE UPLOAD ERROR: ', error);
    // }
  };

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
    setImageUrls('');
    setImageFiles(null);
  };

  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Category name is required')
      })}
      onSubmit={({ name }) => {
        setImageError(null);
        if (!imageFiles) {
          setImageError('Please select an image');
          return;
        }
        let formData = new FormData();
        formData.append('name', name);
        formData.append('coverImage', imageFiles);
        createCategoryAction(formData);
      }}
    >
      {({ errors, touched }) => (
        <CategoryForm
          errors={errors}
          loading={loading}
          touched={touched}
          handleImageChange={handleImageChange}
          imageUrl={imageUrls}
          imageError={imageError}
        />
      )}
    </Formik>
  );
};

CreateCategory.propTypes = {
  /** Redux create category state */
  createCategoryState: PropTypes.object,
  /** API Action linked with redux to create a category */
  createCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  createCategoryState: state.category.createCategory
});

export default connect(mapStateToProps, { createCategoryAction })(CreateCategory);
