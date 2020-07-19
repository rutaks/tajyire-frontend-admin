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
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleImageChange = (info) => {
    const files = info.file.originFileObj;
    try {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(false);
        setImageUrl(imageUrl);
      });
      setImageFile(files);
    } catch (error) {
      console.log('IMAGE UPLOAD ERROR: ', error);
    }
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
    setImageUrl('');
    setImageFile(null);
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
        if (!imageFile) {
          setImageError('Please select an image');
          return;
        }
        let formData = new FormData();
        formData.append('name', name);
        formData.append('coverImage', imageFile);
        createCategoryAction(formData);
      }}
    >
      {({ errors, touched }) => (
        <CategoryForm
          errors={errors}
          loading={loading}
          touched={touched}
          handleImageChange={handleImageChange}
          imageUrl={imageUrl}
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
