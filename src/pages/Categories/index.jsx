import React, { Fragment, useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { InsertRowAboveOutlined, HomeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import CategoriesTable from './CategoriesTable';
import { connect } from 'react-redux';
import getCategoriesAction from '../../redux/actions/category/getCategories';
import CreateCategory from './CreateCategory';

/**
 * Functional component representing the
 * List Categories View
 * @since version 1.0
 */
const Categories = ({ getCategoriesState, getCategoriesAction, categoryPayload }) => {
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
        isLoading={getCategoriesState.loading}
        categoryArr={categories}
        setCurrentPage={setCurrentPage}
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
  categoryPayload: PropTypes.object,
  getCategoriesAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getCategoriesState: state.category.getCategories,
  categoryPayload: state.category.categoryPayload
});

export default connect(mapStateToProps, { getCategoriesAction })(Categories);
