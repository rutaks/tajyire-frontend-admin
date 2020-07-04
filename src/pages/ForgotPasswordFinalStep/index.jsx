import React from 'react';
import { Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Functional component representing the last step to reset admin's password
 * where admin will be able to submit his new password
 * @since version-1
 */
const ForgotPasswordFinalStep = () => {
  const history = useHistory();
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
          <h1>Password Reset Request Successful</h1>
        </Row>
        <Row align={'center'}>
          <h2>Check your email to proceed</h2>
        </Row>
        <br />
        <br />
        <Button type="link" block={true} htmlType="button" onClick={() => history.push('/login')}>
          Go back to login
        </Button>
      </Col>
    </Row>
  );
};

ForgotPasswordFinalStep.propTypes = {
  /** Redux forgot password state object  */
  forgotPasswordState: PropTypes.object,
  /** reset password function  */
  forgotPasswordAction: PropTypes.func
};

export default ForgotPasswordFinalStep;
