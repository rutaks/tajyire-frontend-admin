import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Col, Row, Button } from 'antd';
import {
  InsertRowAboveOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import CategoriesTable from './CategoriesTable';
import FilterCategoriesTable from './CategoriesTable/FilterCategoriesTable';
import { connect } from 'react-redux';
import getCategoriesAction from '../../redux/actions/category/getCategories';

/**
 * Functional component representing the
 * List Categories View
 * @since version 1.0
 */
const Categories = ({ getCategoriesState, getCategoriesAction, categoryPayload }) => {
  const history = useHistory();
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

  console.log(categories);

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
      <Row style={styles.table}>
        <Col>
          <Button
            onClick={() => history.push('/categories/new')}
            style={styles.button}
            type="primary"
            icon={<PlusOutlined />}
          >
            New Category
          </Button>
        </Col>
        <Col>
          <Button style={styles.button} type="default" disabled={true} icon={<DeleteOutlined />}>
            Delete All
          </Button>
        </Col>
        <Col>
          <Button style={styles.button} type="default" loading={false} icon={<FileExcelOutlined />}>
            Export To Excel
          </Button>
        </Col>
      </Row>
      <FilterCategoriesTable />
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
    'padding-top': '50px'
  },
  button: {
    'margin-left': '5px'
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
