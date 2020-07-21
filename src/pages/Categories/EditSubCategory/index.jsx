import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getBase64 } from '../../../helpers/imageHelper';
import editSubCategoryAction from '../../../redux/actions/category/editSubCategory';
import getSubCategoryAction from '../../../redux/actions/category/getSubCategory';
import { message } from 'antd';
import EditCategoryBreadcrumb from './EditSubCategoryBreadcrumb';
import NotFound from '../../Results/NotFound';
import SubCategoryForm from '../SubCategoryForm';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const EditSubCategory = ({
  editSubCategoryAction,
  getSubCategoryAction,
  editSubCategoryState: { loading, success, error },
  getSubCategoryState,
  match
}) => {
  const { subCategoryUuId } = match.params;
  const history = useHistory();
  const [subCategory, setSubCategory] = useState({
    uuid: null,
    name: '',
    imageCover: null,
    parentCategory: {
      id: null,
      uuid: null
    }
  });
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getSubCategoryAction({ subCategoryUuId });
  }, [subCategoryUuId, getSubCategoryAction]);

  useEffect(() => {
    if (getSubCategoryState.payload) {
      setSubCategory({
        uuid: getSubCategoryState.payload.uuid,
        name: getSubCategoryState.payload.name,
        imageCover: getSubCategoryState.payload.imageCover,
        parentCategory: getSubCategoryState.payload.parentCategory
      });
    }
  }, [getSubCategoryState.payload]);

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
    success && history.push(`/categories/${subCategory.parentCategory.uuid}`);
  }, [success, history, subCategory]);

  useEffect(() => {
    categoryError && message.error(error || categoryError);
  }, [categoryError, error]);

  useEffect(() => {
    error && message.error(error || 'Could not edit sub category');
  }, [error]);

  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Fragment>
      {!getSubCategoryState.loading && getSubCategoryState.error && (
        <NotFound message="Could not find the category" link="/" />
      )}
      {!getSubCategoryState.loading && getSubCategoryState.payload !== null && (
        <Fragment>
          <EditCategoryBreadcrumb categoryName={subCategory.name} />
          <Formik
            initialValues={{
              name: subCategory.name
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Category name is required')
            })}
            onSubmit={({ name }) => {
              setImageError(null);
              setCategoryError(null);
              if (!imageFile && name === subCategory.name) {
                setImageError('Please select an image');
                return;
              }
              if (selectedCategory === null) {
                setCategoryError('Please select a parent category');
              }
              let formData = new FormData();
              formData.append('name', name);
              formData.append('parentCategoryId', selectedCategory);
              imageFile && formData.append('coverImage', imageFile);
              editSubCategoryAction({ subCategoryUuId, payload: formData });
            }}
          >
            {({ errors, touched }) => (
              <SubCategoryForm
                formType="EDIT"
                errors={errors}
                loading={loading}
                touched={touched}
                handleImageChange={handleImageChange}
                onSelectChange={selectCategory}
                imageUrl={imageUrl || subCategory.imageCover}
                imageError={imageError}
                categoryDefaultValue={subCategory.parentCategory.name || ''}
              />
            )}
          </Formik>
        </Fragment>
      )}
    </Fragment>
  );
};

EditSubCategory.propTypes = {
  /** Props containing url path and properties */
  match: PropTypes.object,
  /** Redux edit category state */
  editSubCategoryState: PropTypes.object,
  /** Redux get category state */
  getSubCategoryState: PropTypes.object,
  /** API Action linked with redux to edit a category */
  editSubCategoryAction: PropTypes.func,
  /** API Action linked with redux to get a category by ID */
  getSubCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  editSubCategoryState: state.category.editSubCategory,
  getSubCategoryState: state.category.getSubCategory
});

export default connect(mapStateToProps, { editSubCategoryAction, getSubCategoryAction })(EditSubCategory);
