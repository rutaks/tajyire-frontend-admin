import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

export default function Login() {
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
            <h1>Login</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                validateStatus={errors.email !== null && "error"}
                help={errors.email}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
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
                  onClick={() => history.push("/forgot-password")}
                >
                  Forgot Password?
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
