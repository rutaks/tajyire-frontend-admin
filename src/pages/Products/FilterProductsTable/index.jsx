import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import PropTypes from 'prop-types';

export default function FilterProductsTable({ style }) {
  const [form] = Form.useForm();
  return (
    <div style={style}>
      <Form name="advanced_search" className="ant-advanced-search-form">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name={`name`}
              label={`Product Name`}
              rules={[
                {
                  required: true,
                  message: 'Input something!'
                }
              ]}
            >
              <Input placeholder="Input the product name" />
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

FilterProductsTable.propTypes = {
  style: PropTypes.object
};
