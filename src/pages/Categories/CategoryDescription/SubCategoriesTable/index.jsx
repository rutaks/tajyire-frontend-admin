import React, { Fragment } from 'react';
import { Table, Space, Divider, Row, Button, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  EditOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import FilterSubCategoriesTable from './FilterSubCategoriesTable';
import { Link } from 'react-router-dom';
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

export default function SubCategoriesTable({ style }) {
  return (
    <Fragment style={style}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Sub Categories of Electronics
      </Divider>
      <Row>
        <Col>
          <Button style={styles.button} type="primary" icon={<PlusOutlined />}>
            New Sub Category
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
      <FilterSubCategoriesTable style={styles.table} />
      <Table dataSource={data} style={styles.table}>
        <Column title="ID" width="20%" dataIndex="id" key="id" />
        <Column title="Name" width="60%" dataIndex="name" key="name" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
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

const styles = {
  table: {
    'padding-top': '50px'
  },
  button: {
    'margin-left': '5px'
  }
};
