import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Title from 'antd/lib/typography/Title';
import { Input, Form } from 'formik-antd';
import { LockOutlined } from '@ant-design/icons';
import { Button, Row, Col, message } from 'antd';
import './index.css';
import activateAccount from '../../redux/actions/user/activateAccount';

/**
 * Functional component representing the
 * Login Form used to access the platform
 * @since version 1.0
 */
const AdminAccountFinalStep = ({ activateAccountState, activateAccount, match }) => {
  const { token } = match.params;
  const history = useHistory();
  useEffect(() => {
    activateAccountState.success && history.push('/');
  }, [activateAccountState.success, history]);

  useEffect(() => {
    activateAccountState.error && message.error(activateAccountState.error);
  }, [activateAccountState.error]);

  useEffect(() => {
    activateAccountState.success && message.success('Account was successfully activated, you can now login');
  }, [activateAccountState.success]);
  return (
    <Row style={{ marginTop: '120px' }}>
      {localStorage.TAJYIRE_TOKEN && history.push('/')}
      <Col span={8} offset={8}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .required('No password provided.')
              .min(8, 'Password is too short - should be 8 chars minimum.')
              .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
            confirmPassword: Yup.string()
              .required('No password provided.')
              .min(8, 'Password is too short - should be 8 chars minimum.')
              .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          })}
          onSubmit={({ password, confirmPassword }) => {
            activateAccount({ password, confirmPassword }, token);
          }}
        >
          {({ errors, touched }) => (
            <div className="form">
              <Title className="title">
                <img
                  src={window.location.origin + '/images/logo-2.jpg'}
                  style={{ height: '170px', width: '170px' }}
                  alt="Tajyire Logo"
                />
              </Title>
              <Form className="form">
                <Form.Item
                  className="form-element"
                  name="password"
                  validateStatus={errors.password && touched.password ? 'error' : ''}
                  help={touched.password && errors.password && errors.password}
                >
                  <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} name="password" />
                </Form.Item>
                <Form.Item
                  className="form-element"
                  name="confirmPassword"
                  validateStatus={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                  help={touched.confirmPassword && errors.confirmPassword && errors.confirmPassword}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="confirmPassword"
                  />
                </Form.Item>
                <Button
                  loading={activateAccountState.loading}
                  type="primary"
                  htmlType="submit"
                  className="form-button"
                >
                  Activate Account
                </Button>
              </Form>
              <br />
            </div>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

AdminAccountFinalStep.propTypes = {
  /** Redux activate account state object  */
  activateAccountState: PropTypes.object,
  /** activate account function  */
  activateAccount: PropTypes.func,
  /** prop containing url elements  */
  match: PropTypes.object
};

const mapStateToProps = (state) => ({
  activateAccountState: state.user.activateAccount
});

export default connect(mapStateToProps, { activateAccount })(AdminAccountFinalStep);
