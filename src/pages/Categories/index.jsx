import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Col, Row, Button } from 'antd';
import {
  InsertRowAboveOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import CategoriesTable from './CategoriesTable';
import FilterCategoriesTable from './CategoriesTable/FilterCategoriesTable';

export default function Categories() {
  const history = useHistory();
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
      <CategoriesTable style={styles.table} />
    </Fragment>
  );
}

const styles = {
  table: {
    'padding-top': '50px'
  },
  button: {
    'margin-left': '5px'
  }
};
