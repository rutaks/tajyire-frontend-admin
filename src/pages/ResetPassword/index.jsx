import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import resetPasswordAction from '../../redux/actions/user/resetPassword';
import Validations from '../../helpers/validations';

const ResetPassword = ({ resetPasswordState, resetPasswordAction, match }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({
    password: null,
    confirmPassword: null
  });

  useEffect(() => {
    if (resetPasswordState.error) {
      setErrors({ ...errors, password: '', confirmPassword: resetPasswordState.error });
    }
  }, [resetPasswordState.error, errors]);

  useEffect(() => {
    if (resetPasswordState.success) {
      history.push('/login');
    }
  }, [resetPasswordState.success, history]);

  const onFinish = (values) => {
    setErrors({ password: null, confirmPassword: null });
    if (!isValid(values)) return;
    resetPasswordAction(values, match.params.token);
  };

  const isValid = (values) => {
    if (!Validations.isValidPassword(values.password)) {
      setErrors({ ...errors, password: 'Password is too weak', confirmPassword: '' });
      return false;
    }
    if (values.password !== values.confirmPassword) {
      setErrors({ ...errors, password: '', confirmPassword: 'Passwords do not match' });
      return false;
    }
    return true;
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
          </Col>
        </Row>
        <Row align={'center'}>
          <h1>Enter Your New Password</h1>
        </Row>
        <Row>
          <Col span={24}>
            <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item
                label="Password:"
                name="password"
                validateStatus={errors.password !== null && 'error'}
                help={errors.password}
                rules={[{ required: true, message: 'Please input your new Password' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password:"
                name="confirmPassword"
                validateStatus={errors.confirmPassword !== null && 'error'}
                help={errors.confirmPassword}
                rules={[{ required: true, message: 'Please input your new Password' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button loading={resetPasswordState.loading} type="primary" block={true} htmlType="submit">
                  Submit
                </Button>
                <br />
                <br />
                <Button type="link" block={true} htmlType="button" onClick={() => history.push('/login')}>
                  Wish to login?
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

ResetPassword.propTypes = {
  resetPasswordState: PropTypes.object,
  resetPasswordAction: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = (state) => ({
  resetPasswordState: state.user.resetPassword
});

export default connect(mapStateToProps, { resetPasswordAction })(ResetPassword);
