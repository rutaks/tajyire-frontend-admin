import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getBase64 } from '../../../helpers/imageHelper';
import CategoryForm from '../CategoryForm';
import editCategoryAction from '../../../redux/actions/category/editCategory';
import getCategoryAction from '../../../redux/actions/category/getCategory';
import { message } from 'antd';
import EditCategoryBreadcrumb from './EditCategoryBreadcrumb';
import NotFound from '../../Results/NotFound';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const EditCategory = ({
  editCategoryAction,
  getCategoryAction,
  editCategoryState: { loading, success, error },
  getCategoryState,
  match
}) => {
  const { categoryUuId } = match.params;
  const history = useHistory();
  const [category, setCategory] = useState({
    uuid: null,
    name: '',
    imageCover: null
  });
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    getCategoryAction({ categoryUuId });
  }, []);

  useEffect(() => {
    if (getCategoryState.payload) {
      setCategory({
        uuid: getCategoryState.payload.uuid,
        name: getCategoryState.payload.name,
        imageCover: getCategoryState.payload.imageCover
      });
    }
  }, [getCategoryState.payload]);

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
    success && history.push('/');
  }, [success, history]);

  useEffect(() => {
    error && message.error(error || 'Could not create category');
  }, [error]);

  return (
    <Fragment>
      {!getCategoryState.loading && getCategoryState.error && (
        <NotFound message="Could not find the category" link="/" />
      )}
      {!getCategoryState.loading && getCategoryState.payload !== null && (
        <Fragment>
          <EditCategoryBreadcrumb categoryName={category.name} />
          <Formik
            initialValues={{
              name: category.name
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Category name is required')
            })}
            onSubmit={({ name }) => {
              setImageError(null);
              if (!imageFile && name === category.name) {
                setImageError('Please select an image');
                return;
              }
              let formData = new FormData();
              formData.append('name', name);
              imageFile && formData.append('coverImage', imageFile);
              editCategoryAction({ categoryUuId: categoryUuId, payload: formData });
            }}
          >
            {({ errors, touched }) => (
              <CategoryForm
                formType="EDIT"
                errors={errors}
                loading={loading}
                touched={touched}
                handleImageChange={handleImageChange}
                imageUrl={imageUrl || category.imageCover}
                imageError={imageError}
              />
            )}
          </Formik>
        </Fragment>
      )}
    </Fragment>
  );
};

EditCategory.propTypes = {
  /** Props containing url path and properties */
  match: PropTypes.object,
  /** Redux edit category state */
  editCategoryState: PropTypes.object,
  /** Redux get category state */
  getCategoryState: PropTypes.object,
  /** API Action linked with redux to edit a category */
  editCategoryAction: PropTypes.func,
  /** API Action linked with redux to get a category by ID */
  getCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  editCategoryState: state.category.editCategory,
  getCategoryState: state.category.getCategory
});

export default connect(mapStateToProps, { editCategoryAction, getCategoryAction })(EditCategory);
