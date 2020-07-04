import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

/**
 * Functional component representing the 404 view
 * where admin will be directed when route looked for does not exist
 * @since version-1
 */
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
