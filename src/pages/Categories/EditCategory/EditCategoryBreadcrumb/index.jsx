import React, { Fragment } from 'react';
import { Breadcrumb, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { InsertRowAboveOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * Functional component representing the
 * Breadcrumb element area designed for navigation
 * when in the CreateCategory View
 * @since version 1.0
 */
export default function EditCategoryBreadcrumb({ categoryName = '' }) {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item href="">
          <Link to="/">
            <InsertRowAboveOutlined />
            <span>Categories</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <EditOutlined />
          <span>Edit</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left" style={{ paddingTop: '25px', fontSize: '15px' }}>
        {`Edit ${categoryName}`}
      </Divider>
    </Fragment>
  );
}

EditCategoryBreadcrumb.propTypes = {
  /** name of the category to display in breadcrumb */
  categoryName: PropTypes.string
};
