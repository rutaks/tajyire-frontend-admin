import React from 'react';
import { Result, Button } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/');
          }}
        >
          Go Back Home
        </Button>
      }
    />
  );
}
