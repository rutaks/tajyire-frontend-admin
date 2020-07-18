import React from 'react';
import { Table, Space, Divider, Row, Col, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import { EditOutlined, UnorderedListOutlined, DeleteOutlined, FileExcelOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FilterCategoriesTable from './FilterCategoriesTable';

export default function CategoriesTable({
  totalElements = 0,
  currentPage = 0,
  setCurrentPage = () => {},
  isLoading = true,
  categoryArr = [],
  deleteCategory,
  style
}) {
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <div style={style}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Category List
      </Divider>
      <FilterCategoriesTable />
      <Row style={style.table}>
        <Col>
          <Button style={style.button} type="default" disabled={true} icon={<DeleteOutlined />}>
            Delete All
          </Button>
        </Col>
        <Col>
          <Button style={style.button} type="default" loading={false} icon={<FileExcelOutlined />}>
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
        <Column title="Name" width="60%" dataIndex="name" key="name" />
        <Column
          title="Action"
          key="action"
          render={(category) => {
            return (
              <Space size="middle">
                <Link to={`categories/${category.uuid}/edit`}>
                  <EditOutlined />
                </Link>
                <Link>
                  <UnorderedListOutlined />
                </Link>
                <Link onClick={() => deleteCategory(category.uuid)}>
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

CategoriesTable.propTypes = {
  getCategoriesState: PropTypes.object,
  totalElements: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  isLoading: PropTypes.bool,
  categoryArr: PropTypes.array,
  deleteCategory: PropTypes.func,
  style: PropTypes.object
};
