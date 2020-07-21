import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getBase64 } from '../../../helpers/imageHelper';
import createSubCategoryAction from '../../../redux/actions/category/createSubCategory';
import { message } from 'antd';
import SubCategoryForm from '../SubCategoryForm';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const CreateSubCategory = ({
  createSubCategoryAction,
  createSubCategoryState: { loading, success, error }
}) => {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    categoryError && message.error(error || categoryError);
  }, [categoryError, error]);

  useEffect(() => {
    error && message.error(error || 'Could not create sub category');
  }, [error]);

  const clearFields = () => {
    setImageUrl('');
    setImageFile(null);
  };

  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
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
        setCategoryError(null);
        if (!imageFile) {
          setImageError('Please select an image');
          return;
        }
        if (selectedCategory === null) {
          setCategoryError('Please select a parent category');
        }
        let formData = new FormData();
        formData.append('name', name);
        formData.append('coverImage', imageFile);
        formData.append('parentCategoryId', selectedCategory);
        createSubCategoryAction(formData);
      }}
    >
      {({ errors, touched }) => (
        <SubCategoryForm
          errors={errors}
          loading={loading}
          touched={touched}
          handleImageChange={handleImageChange}
          onSelectChange={selectCategory}
          imageUrl={imageUrl}
          imageError={imageError}
        />
      )}
    </Formik>
  );
};

CreateSubCategory.propTypes = {
  /** Redux create category state */
  createSubCategoryState: PropTypes.object,
  /** API Action linked with redux to create a category */
  createSubCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  createSubCategoryState: state.category.createSubCategory
});

export default connect(mapStateToProps, { createSubCategoryAction })(CreateSubCategory);
