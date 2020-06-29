import React from 'react';
import { Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  forgotPasswordState: PropTypes.object,
  forgotPasswordAction: PropTypes.func
};

export default ForgotPasswordFinalStep;
