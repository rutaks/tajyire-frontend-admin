import React from 'react';
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
import PropTypes from 'prop-types';
import CreateSubCategory from '../../CreateSubCategory';

export default function SubCategoriesTable({
  categoryName = '',
  totalElements = 0,
  currentPage = 0,
  setCurrentPage = () => {},
  isLoading = true,
  categoryArr = [],
  deleteSubCategory,
  style
}) {
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  return (
    <div style={style}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        {`Sub Categories of ${categoryName}`}
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
      <br />
      <CreateSubCategory />
      <FilterSubCategoriesTable style={styles.table} />
      <div style={styles.table}>
        <Table
          rowKey="index"
          pagination={{
            onChange: onChange,
            current: currentPage,
            total: totalElements
          }}
          loading={isLoading}
          dataSource={categoryArr}
        >
          <Column title="ID" width="20%" dataIndex="index" />
          <Column title="Name" width="60%" dataIndex="name" />
          <Column
            title="Action"
            render={(subCategory) => (
              <Space size="middle">
                <Link to={`/sub-categories/${subCategory.uuid}/edit`}>
                  <EditOutlined />
                </Link>
                <Link to={`/sub-categories/${subCategory.uuid}`}>
                  <UnorderedListOutlined />
                </Link>
                <Link to="" onClick={() => deleteSubCategory(subCategory.uuid)}>
                  <DeleteOutlined />
                </Link>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

SubCategoriesTable.propTypes = {
  /** Name of current category displayed */
  categoryName: PropTypes.string,
  /** Css Style props  */
  style: PropTypes.object,
  getCategoriesState: PropTypes.object,
  totalElements: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  isLoading: PropTypes.bool,
  categoryArr: PropTypes.array,
  deleteSubCategory: PropTypes.func
};

const styles = {
  table: {
    paddingTop: '50px'
  },
  button: {
    marginLeft: '5px'
  }
};
