import React from 'react';
import { Table, Divider, Row, Col, Button, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { DeleteOutlined, FileExcelOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export default function AdminsTable({
  totalElements = 0,
  currentPage = 0,
  setCurrentPage = () => {},
  isLoading = true,
  adminArr = [],
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
        rowKey="index"
        pagination={{
          onChange: onChange,
          current: currentPage,
          total: totalElements
        }}
        loading={isLoading}
        dataSource={adminArr}
      >
        <Column title="ID" dataIndex="index" />
        <Column title="First Name" dataIndex="firstName" />
        <Column title="Last Name" dataIndex="lastName" />
        <Column
          title="Status"
          render={(admin) => {
            return <Tag color={admin.active ? 'green' : 'red'}>{admin.active ? 'Active' : 'Inactive'}</Tag>;
          }}
        />
      </Table>
    </div>
  );
}

AdminsTable.propTypes = {
  getAdminsState: PropTypes.object,
  totalElements: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  isLoading: PropTypes.bool,
  adminArr: PropTypes.array,
  style: PropTypes.object
};
