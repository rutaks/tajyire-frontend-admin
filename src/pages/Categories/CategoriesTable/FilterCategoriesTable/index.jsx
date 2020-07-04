import React from 'react';
import { Form, Row, Col, Input, Button, Divider } from 'antd';
import PropTypes from 'prop-types';

export default function FilterCategoriesTable({ style }) {
  const [form] = Form.useForm();
  return (
    <div style={style}>
      <Divider orientation="left" style={{ fontSize: '15px' }}>
        Search
      </Divider>
      <Form name="advanced_search" className="ant-advanced-search-form">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name={`name`}
              label={`Category Name`}
              rules={[
                {
                  required: true,
                  message: 'Input something!'
                }
              ]}
            >
              <Input placeholder="Input the category name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

FilterCategoriesTable.propTypes = {
  style: PropTypes.object
};
