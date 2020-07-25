import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Space, Divider, Row, Col, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FilterProductsTable from '../FilterProductsTable';

export default function ProductsTable({
  totalElements = 0,
  currentPage = 0,
  setCurrentPage = () => {},
  isLoading = true,
  categoryArr = [],
  deleteCategory,
  styles
}) {
  const history = useHistory();
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <div style={styles.table}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Category List
      </Divider>
      <FilterProductsTable />
      <Row style={styles.table}>
        <Col>
          <Button
            style={styles.button}
            onClick={() => {
              history.push('/products/new');
            }}
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
      <br />

      <Table
        pagination={{
          onChange: onChange,
          current: currentPage,
          total: totalElements
        }}
        loading={isLoading}
        dataSource={categoryArr}
      >
        <Column title="ID" width="20%" dataIndex="index" key="index" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Price"
          key="price"
          render={(product) => {
            return <p>{`${product.name} ${product.currency}`}</p>;
          }}
        />
        <Column
          title="Price"
          key="discount"
          render={(product) => {
            return <p>{`${product.discount} ends on ${product.discountDeadline}`}</p>;
          }}
        />
        <Column
          title="Category"
          key="name"
          render={(product) => {
            return <p>{`${product.category.name}`}</p>;
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(product) => {
            return (
              <Space size="middle">
                <Link to={`products/${product.uuid}/edit`}>
                  <EditOutlined />
                </Link>
                <Link to={`products/${product.uuid}`}>
                  <UnorderedListOutlined />
                </Link>
                <Link onClick={() => deleteCategory(product.uuid)}>
                  <DeleteOutlined />
                </Link>
              </Space>
            );
          }}
        />
      </Table>
    </div>
  );
}

ProductsTable.propTypes = {
  getCategoriesState: PropTypes.object,
  totalElements: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  isLoading: PropTypes.bool,
  categoryArr: PropTypes.array,
  deleteCategory: PropTypes.func,
  styles: PropTypes.object
};
