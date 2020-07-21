import React, { Fragment, useEffect, useState } from 'react';
import { Descriptions, Spin } from 'antd';
import SubCategoriesTable from './SubCategoriesTable';
import { connect } from 'react-redux';
import getCategoryAction from '../../../redux/actions/category/getCategory';
import getSubCategoriesAction from '../../../redux/actions/category/getSubCategories';
import PropTypes from 'prop-types';
import './style.css';

const CategoryDescription = ({
  getSubCategoriesAction,
  getCategoryAction,
  getCategoryState: { loading, payload },
  getSubCategoriesState,
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
            isLoading={getSubCategoriesState.loading}
            categoryArr={subCategories}
            setCurrentPage={setCurrentPage}
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
  getSubCategoriesAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getCategoryState: state.category.getCategory,
  getSubCategoriesState: state.category.getSubCategories
});

export default connect(mapStateToProps, { getCategoryAction, getSubCategoriesAction })(CategoryDescription);
