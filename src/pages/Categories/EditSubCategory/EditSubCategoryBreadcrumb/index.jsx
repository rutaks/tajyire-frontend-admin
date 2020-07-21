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
export default function EditSubCategoryBreadcrumb({ subCategoryName = '' }) {
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
            <span>SubCategories</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <EditOutlined />
          <span>Edit</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left" style={{ paddingTop: '25px', fontSize: '15px' }}>
        {`Edit ${subCategoryName}`}
      </Divider>
    </Fragment>
  );
}

EditSubCategoryBreadcrumb.propTypes = {
  /** name of the sub ategory to display in breadcrumb */
  subCategoryName: PropTypes.string
};
