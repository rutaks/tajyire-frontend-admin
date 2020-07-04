import React, { Fragment } from 'react';
import { Table, Space, Divider } from 'antd';
import Column from 'antd/lib/table/Column';
import { EditOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CategoriesTable({
  totalElements = 0,
  currentPage = 0,
  setCurrentPage = () => {},
  isLoading = true,
  categoryArr = [],
  style
}) {
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  return (
    <Fragment style={style}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Category List
      </Divider>
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
          render={() => (
            <Space size="middle">
              <Link>
                <EditOutlined />
              </Link>
              <Link>
                <UnorderedListOutlined />
              </Link>
              <Link>
                <DeleteOutlined />
              </Link>
            </Space>
          )}
        />
      </Table>
    </Fragment>
  );
}

CategoriesTable.propTypes = {
  getCategoriesState: PropTypes.object,
  totalElements: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  isLoading: PropTypes.bool,
  categoryArr: PropTypes.array,
  style: PropTypes.object
};
