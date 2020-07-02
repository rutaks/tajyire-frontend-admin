import React, { Fragment } from 'react';
import { Table, Space, Divider } from 'antd';
import Column from 'antd/lib/table/Column';
import { EditOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
const data = [
  {
    key: '1',
    id: '1',
    name: 'John Brown'
  },
  {
    key: '2',
    id: '2',
    name: 'Jim Green'
  },
  {
    key: '3',
    id: '3',
    name: 'Joe Black'
  }
];

export default function CategoriesTable({ style }) {
  return (
    <Fragment style={style}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Category List
      </Divider>
      <Table dataSource={data}>
        <Column title="ID" width="20%" dataIndex="id" key="id" />
        <Column title="Name" width="60%" dataIndex="name" key="name" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>
                <EditOutlined />
              </a>
              <a>
                <UnorderedListOutlined />
              </a>
              <a>
                <DeleteOutlined />
              </a>
            </Space>
          )}
        />
      </Table>
    </Fragment>
  );
}
