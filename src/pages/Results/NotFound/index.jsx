import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Functional component representing the 404 view
 * where admin will be directed when route looked for does not exist
 * @since version-1
 */
export default function NotFound({
  status = '403',
  message = 'Sorry, you are not authorized to access this page.',
  link = '/'
}) {
  const history = useHistory();
  return (
    <Result
      status={status}
      title={status}
      subTitle={message}
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push(link);
          }}
        >
          Go Back
        </Button>
      }
    />
  );
}

NotFound.propTypes = {
  /** Status Code Of the error */
  status: PropTypes.string,
  /** Message Of the error */
  message: PropTypes.string,
  /** Route to go back to error */
  link: PropTypes.string
};
