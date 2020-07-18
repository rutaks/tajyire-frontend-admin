import React, { Fragment, useState, useEffect } from 'react';
import { Breadcrumb, message } from 'antd';
import { InsertRowAboveOutlined, HomeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import CategoriesTable from './CategoriesTable';
import { connect } from 'react-redux';
import getCategoriesAction from '../../redux/actions/category/getCategories';
import deleteCategoryAction from '../../redux/actions/category/deleteCategory';
import CreateCategory from './CreateCategory';

/**
 * Functional component representing the
 * List Categories View
 * @since version 1.0
 */
const Categories = ({
  getCategoriesState,
  deleteCategoryState,
  deleteCategoryAction,
  getCategoriesAction,
  categoryPayload
}) => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    getCategoriesAction({ page: currentPage });
  }, [getCategoriesAction, currentPage]);

  useEffect(() => {
    if (categoryPayload.content) {
      const response = categoryPayload.content.map((category, index) => {
        return { ...category, index: index + 1 + 10 * currentPage };
      });
      setCategories(response);
      setTotalElements(categoryPayload.totalElements);
    }
  }, [categoryPayload, currentPage]);

  useEffect(() => {
    if (deleteCategoryState.loading) {
      message.loading('Removing Item...', 2.5);
    }
  }, [deleteCategoryState.loading]);

  useEffect(() => {
    if (deleteCategoryState.error) {
      message.error('Could not remove item', 2.5);
    }
  }, [deleteCategoryState.error]);

  useEffect(() => {
    if (deleteCategoryState.success) {
      message.success('Item removed successfully', 2.5);
    }
  }, [deleteCategoryState.success]);

  const deleteCategory = (categoryUuId) => {
    deleteCategoryAction({ categoryUuId });
  };

  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <InsertRowAboveOutlined />
          <span>Categories</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <br />
      <CreateCategory />

      <CategoriesTable
        currentPage={currentPage + 1}
        totalElements={totalElements}
        isLoading={getCategoriesState.loading || deleteCategoryState.loading}
        categoryArr={categories}
        setCurrentPage={setCurrentPage}
        deleteCategory={deleteCategory}
        style={styles.table}
      />
    </Fragment>
  );
};

const styles = {
  table: {
    paddingTop: '50px'
  },
  button: {
    marginLeft: '5px'
  }
};

Categories.propTypes = {
  getCategoriesState: PropTypes.object,
  deleteCategoryState: PropTypes.object,
  categoryPayload: PropTypes.object,
  getCategoriesAction: PropTypes.func,
  deleteCategoryAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getCategoriesState: state.category.getCategories,
  deleteCategoryState: state.category.deleteCategory,
  categoryPayload: state.category.categoryPayload
});

export default connect(mapStateToProps, { getCategoriesAction, deleteCategoryAction })(Categories);
