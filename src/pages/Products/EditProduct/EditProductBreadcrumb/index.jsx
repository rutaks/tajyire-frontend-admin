import React, { Fragment } from 'react';
import { Breadcrumb, Divider } from 'antd';
import { FileTextOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * Functional component representing the
 * Breadcrumb element area designed for navigation
 * when in the EditProduct View
 * @since version 1.0
 */
export default function EditProductBreadcrumb({ productName = '' }) {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>

        <Breadcrumb.Item href="/">
          <FileTextOutlined />
          <span>Products</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/product">
          <EditOutlined />
          <span>Edit</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left" style={{ paddingTop: '25px', fontSize: '15px' }}>
        {`Edit ${productName}`}
      </Divider>
    </Fragment>
  );
}

EditProductBreadcrumb.propTypes = {
  /** name of the product to display in breadcrumb */
  productName: PropTypes.string
};
