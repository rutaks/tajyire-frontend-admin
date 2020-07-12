import React, { Fragment } from 'react';
import { Breadcrumb, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { InsertRowAboveOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * Functional component representing the
 * Breadcrumb element area designed for navigation
 * when in the CreateCategory View
 * @since version 1.0
 */
export default function CreateCategoryBreadcrumb() {
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
          <PlusOutlined />
          <span>New</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left" style={{ paddingTop: '25px', fontSize: '15px' }}>
        Create new category
      </Divider>
    </Fragment>
  );
}
