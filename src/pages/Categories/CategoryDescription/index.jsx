import React, { Fragment, useEffect, useState } from 'react';
import { Descriptions, message, Spin } from 'antd';
import SubCategoriesTable from './SubCategoriesTable';
import { connect } from 'react-redux';
import getCategoryAction from '../../../redux/actions/category/getCategory';
import getSubCategoriesAction from '../../../redux/actions/category/getSubCategories';
import deleteSubCategoryAction from '../../../redux/actions/category/deleteSubCategory';
import PropTypes from 'prop-types';
import './style.css';

const CategoryDescription = ({
  getSubCategoriesAction,
  getCategoryAction,
  getCategoryState: { loading, payload },
  getSubCategoriesState,
  deleteSubCategoryState,
  deleteSubCategoryAction,
  match
}) => {
  const { categoryUuId } = match.params;
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [category, setCategory] = useState({
    id: null,
    uuid: null,
    name: null,
    imageCover: null,
    creationDate: null,
    createdBy: null,
    lastModifiedDate: null,
    lastModifiedBy: null
  });

  useEffect(() => {
    getCategoryAction({ categoryUuId });
  }, [categoryUuId, getCategoryAction]);

  useEffect(() => {
    if (payload) {
      setCategory(payload);
    }
  }, [payload]);

  useEffect(() => {
    if (category.uuid !== null) {
      getSubCategoriesAction({ categoryUuId, page: currentPage });
    }
  }, [category.uuid, getSubCategoriesAction, categoryUuId, currentPage]);

  useEffect(() => {
    if (getSubCategoriesState.payload.content) {
      const response = getSubCategoriesState.payload.content.map((subCategory, index) => {
        return { ...subCategory, index: index + 1 + 10 * currentPage };
      });
      setSubCategories(response);
      setTotalElements(getSubCategoriesState.payload.totalElements);
    }
  }, [getSubCategoriesState.payload, currentPage]);

  useEffect(() => {
    if (deleteSubCategoryState.loading) {
      message.loading('Removing Item...', 2.5);
    }
  }, [deleteSubCategoryState.loading]);

  useEffect(() => {
    if (deleteSubCategoryState.error) {
      message.error('Could not remove item', 2.5);
    }
  }, [deleteSubCategoryState.error]);

  useEffect(() => {
    if (deleteSubCategoryState.success) {
      message.success('Item removed successfully', 2.5);
    }
  }, [deleteSubCategoryState.success]);

  const deleteSubCategory = (subCategoryUuId) => {
    deleteSubCategoryAction({ subCategoryUuId });
  };

  return (
    <Fragment>
      {loading ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <Fragment>
          <Descriptions title="Category Info">
            <Descriptions.Item label="Name">{category.name}</Descriptions.Item>
            <Descriptions.Item label="Created On">{category.creationDate}</Descriptions.Item>
            <Descriptions.Item label="Last Modified On">{category.lastModifiedDate}</Descriptions.Item>
            <Descriptions.Item label="Cover"></Descriptions.Item>
            <Descriptions.Item label="Created By">{category.createdBy}</Descriptions.Item>

            <Descriptions.Item label="Last Modified By">{category.lastModifiedBy}</Descriptions.Item>
          </Descriptions>
          <img style={{ width: '20%', height: 'auto' }} src={category.imageCover} alt="" />
          <SubCategoriesTable
            currentPage={currentPage + 1}
            totalElements={totalElements}
            isLoading={getSubCategoriesState.loading || deleteSubCategoryState.loading}
            categoryArr={subCategories}
            setCurrentPage={setCurrentPage}
            deleteSubCategory={deleteSubCategory}
            categoryName={category.name}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

CategoryDescription.propTypes = {
  /** Props containing url path and properties */
  match: PropTypes.object,
  /** Redux get category state */
  getCategoryState: PropTypes.object,
  /** Redux get sub-categories state */
  getSubCategoriesState: PropTypes.object,
  /** API Action linked with redux to get a category by ID */
  getCategoryAction: PropTypes.func,
  /** API Action linked with redux to get a sub-categories buy category UUID */
  getSubCategoriesAction: PropTypes.func,
  /** API Action linked with redux to delete a sub-category by UUID */
  deleteSubCategoryAction: PropTypes.func,
  /** Redux delete category state */
  deleteSubCategoryState: PropTypes.object,
  /** API Action linked with redux to delete a sub-category by UUID */
  deleteSubAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getCategoryState: state.category.getCategory,
  deleteSubCategoryState: state.category.deleteSubCategory,
  getSubCategoriesState: state.category.getSubCategories
});

export default connect(mapStateToProps, {
  getCategoryAction,
  getSubCategoriesAction,
  deleteSubCategoryAction
})(CategoryDescription);
