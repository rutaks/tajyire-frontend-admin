import { Breadcrumb } from 'antd';
import React, { Fragment } from 'react';
import { FileTextOutlined, HomeOutlined } from '@ant-design/icons';
import ProductsTable from './ProductsTable';

/**
 * Functional component representing the
 * List Products View
 * @since version 1.0
 */
export default function Products() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <FileTextOutlined />
          <span>Products</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <ProductsTable styles={styles} />
    </Fragment>
  );
}

const styles = {
  table: {
    paddingTop: '50px'
  },
  button: {
    marginLeft: '5px'
  }
};
