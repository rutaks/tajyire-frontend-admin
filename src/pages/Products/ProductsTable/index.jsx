import React, { Fragment } from 'react';
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
import Moment from 'react-moment';

export default function ProductsTable({
  totalElements = 0,
  currentPage = 0,
  setCurrentPage = () => {},
  isLoading = true,
  currentArray = [],
  deleteItem = () => {},
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
            New Product
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
        rowKey="index"
        pagination={{
          onChange: onChange,
          current: currentPage,
          total: totalElements
        }}
        loading={isLoading}
        dataSource={currentArray}
      >
        <Column title="ID" dataIndex="index" />
        <Column title="Name" width="12%" dataIndex="name" />
        <Column
          title="Price"
          render={(product) => {
            return <Fragment>{`${product.price} ${product.priceCurrency}`}</Fragment>;
          }}
        />
        <Column
          title="Discount"
          width="25%"
          render={(product) => {
            return product.discountPrice ? (
              <Fragment>
                {`${product.discountPrice} ${product.priceCurrency} ends on `}
                <Moment format="D MMM YY - HH:mm" date={product.discountExpiryDate} />
              </Fragment>
            ) : (
              <p>No Discount Currently</p>
            );
          }}
        />
        <Column
          title="Under"
          render={(product) => {
            return <Fragment>{`${product.category.name}`}</Fragment>;
          }}
        />
        <Column
          title="Action"
          render={(product) => {
            return (
              <Space size="middle">
                <Link to={`products/${product.uuid}/edit`}>
                  <EditOutlined />
                </Link>
                <Link to={`products/${product.uuid}`}>
                  <UnorderedListOutlined />
                </Link>
                <Link to="" onClick={() => deleteItem(product.uuid)}>
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
  currentArray: PropTypes.array,
  deleteItem: PropTypes.func,
  styles: PropTypes.object
};
