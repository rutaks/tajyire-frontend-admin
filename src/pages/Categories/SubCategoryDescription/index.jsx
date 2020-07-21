import React, { Fragment, useEffect, useState } from 'react';
import { Descriptions, Spin } from 'antd';
import { connect } from 'react-redux';
import getSubCategoryAction from '../../../redux/actions/category/getSubCategory';
import PropTypes from 'prop-types';
import './style.css';

const SubCategoryDescription = ({
  getSubCategoryAction,
  getSubCategoryState: { loading, payload },
  match
}) => {
  const { subCategoryUuId } = match.params;
  //   const [subCategories, setSubCategories] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const [totalElements, setTotalElements] = useState(0);
  const [subCategory, setCategory] = useState({
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
    getSubCategoryAction({ subCategoryUuId });
  }, [subCategoryUuId, getSubCategoryAction]);

  useEffect(() => {
    if (payload) {
      setCategory(payload);
    }
  }, [payload]);

  //   useEffect(() => {
  //     if (category.uuid !== null) {
  //       getSubCategoriesAction({ categoryUuId, page: currentPage });
  //     }
  //   }, [category.uuid, getSubCategoriesAction, categoryUuId, currentPage]);

  //   useEffect(() => {
  //     if (getSubCategoriesState.payload.content) {
  //       const response = getSubCategoriesState.payload.content.map((subCategory, index) => {
  //         return { ...subCategory, index: index + 1 + 10 * currentPage };
  //       });
  //       setSubCategories(response);
  //       setTotalElements(getSubCategoriesState.payload.totalElements);
  //     }
  //   }, [getSubCategoriesState.payload, currentPage]);

  //   useEffect(() => {
  //     if (deleteSubCategoryState.loading) {
  //       message.loading('Removing Item...', 2.5);
  //     }
  //   }, [deleteSubCategoryState.loading]);

  //   useEffect(() => {
  //     if (deleteSubCategoryState.error) {
  //       message.error('Could not remove item', 2.5);
  //     }
  //   }, [deleteSubCategoryState.error]);

  //   useEffect(() => {
  //     if (deleteSubCategoryState.success) {
  //       message.success('Item removed successfully', 2.5);
  //     }
  //   }, [deleteSubCategoryState.success]);

  return (
    <Fragment>
      {loading ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <Fragment>
          <Descriptions title="Sub Category Info">
            <Descriptions.Item label="Name">{subCategory.name}</Descriptions.Item>
            <Descriptions.Item label="Created On">{subCategory.creationDate}</Descriptions.Item>
            <Descriptions.Item label="Last Modified On">{subCategory.lastModifiedDate}</Descriptions.Item>
            <Descriptions.Item label="Cover"></Descriptions.Item>
            <Descriptions.Item label="Created By">{subCategory.createdBy}</Descriptions.Item>

            <Descriptions.Item label="Last Modified By">{subCategory.lastModifiedBy}</Descriptions.Item>
          </Descriptions>
          <img style={{ width: '20%', height: 'auto' }} src={subCategory.imageCover} alt="" />
        </Fragment>
      )}
    </Fragment>
  );
};

SubCategoryDescription.propTypes = {
  /** Props containing url path and properties */
  match: PropTypes.object,
  /** Redux get sub-categories state */
  getSubCategoryState: PropTypes.object,
  /** API Action linked with redux to get a sub ategory by ID */
  getSubCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getSubCategoryState: state.category.getSubCategory
});

export default connect(mapStateToProps, {
  getSubCategoryAction
})(SubCategoryDescription);
