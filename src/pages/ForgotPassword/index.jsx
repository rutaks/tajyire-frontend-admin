import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
  const history = useHistory();
  const [errors, setErrors] = useState({
    email: null,
    passwor: null,
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ marginTop: "120px" }}>
      <Col span={12} offset={6}>
        <Row align={"center"}>
          <Col>
            <img
              style={{ height: "100px", width: "100px" }}
              src={window.location.origin + "/images/logo.jpeg"}
              alt="Tajyire Logo"
            />
          </Col>
        </Row>
        <Row align={"center"}>
          <h1>Forgot Password</h1>
        </Row>
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                validateStatus={errors.email !== null && "error"}
                help={errors.email}
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={true}
                  type="primary"
                  block={true}
                  htmlType="submit"
                >
                  Submit
                </Button>
                <br />
                <br />
                <Button
                  type="link"
                  block={true}
                  htmlType="button"
                  onClick={() => history.push("/login")}
                >
                  Wish to login?
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
