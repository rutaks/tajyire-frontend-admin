import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

export default function FilterSubCategoriesTable({ style }) {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push();
    }
    return children;
  };
  return (
    <div style={style}>
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
