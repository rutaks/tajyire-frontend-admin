import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../../redux/actions/user/login';

const Login = ({ loginState, loginAction }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({
    email: null,
    password: null
  });

  useEffect(() => {
    if (loginState.error) {
      setErrors({ ...errors, email: '', password: 'Invalid Username or Password' });
    }
  }, [loginState.error, errors]);

  useEffect(() => {
    if (loginState.success) {
      history.push('/');
    }
  }, [loginState.success]);

  useEffect(() => {
    if (localStorage.TAJYIRE_TOKEN && localStorage.TAJYIRE_TOKEN !== '') {
      history.push('/');
    }
  }, [localStorage.TAJYIRE_TOKEN]);

  const onSubmit = (values) => {
    loginAction(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ marginTop: '120px' }}>
      <Col span={12} offset={6}>
        <Row align={'center'}>
          <Col>
            <img
              style={{ height: '100px', width: '100px' }}
              src={window.location.origin + '/images/logo.jpeg'}
              alt="Tajyire Logo"
            />
            <h1>Login</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form name="basic" onFinish={onSubmit} onFinishFailed={onFinishFailed}>
              <Form.Item
                label="Email"
                name="username"
                validateStatus={errors.email !== null && 'error'}
                help={errors.email}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                validateStatus={errors.password !== null && 'error'}
                help={errors.password}
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button loading={loginState.loading} type="primary" block={true} htmlType="submit">
                  Submit
                </Button>
                <br />
                <br />
                <Button
                  type="link"
                  block={true}
                  htmlType="button"
                  onClick={() => history.push('/forgot-password')}
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
};

Login.propTypes = {
  loginState: PropTypes.object,
  loginAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  loginState: state.user.login
});

export default connect(mapStateToProps, { loginAction })(Login);
