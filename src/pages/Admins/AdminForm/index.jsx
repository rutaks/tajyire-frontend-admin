import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Input, Form } from 'formik-antd';
import PropTypes from 'prop-types';

/**
 * Functional component representing the
 * Form used to create or edit an admin
 * @since version 1.0
 */
export default function AdminForm({
  formType = 'CREATE',
  success = false,
  loading = false,
  errors = {},
  touched = {},
  values = {}
}) {
  useEffect(() => {
    if (success) {
      values.firstName = '';
      values.lastName = '';
      values.email = '';

      touched.firstName = false;
      touched.lastName = false;
      touched.email = false;
    }
  }, [success, values, touched]);
  return (
    <Form
      wrapperCol={{
        span: 6
      }}
      layout="horizontal"
    >
      <Form.Item
        name="name"
        label="First Name"
        validateStatus={errors.firstName && touched.firstName ? 'error' : ''}
        help={touched.firstName && errors.firstName && errors.firstName}
      >
        <Input name="firstName" />
      </Form.Item>
      <Form.Item
        name="name"
        label="Last Name"
        validateStatus={errors.lastName && touched.lastName ? 'error' : ''}
        help={touched.lastName && errors.lastName && errors.lastName}
      >
        <Input name="lastName" />
      </Form.Item>
      <Form.Item
        name="name"
        label="Email"
        validateStatus={errors.email && touched.email ? 'error' : ''}
        help={touched.email && errors.email && errors.email}
      >
        <Input name="email" />
      </Form.Item>
      <Button loading={loading} block={true} style={{ width: '100%' }} type={'primary'} htmlType="submit">
        {formType === 'CREATE' ? 'Submit' : 'Edit'}
      </Button>
    </Form>
  );
}

AdminForm.propTypes = {
  /** Props identifying design of form specifying if form is an edit or create form*/
  formType: PropTypes.string,
  /** Boolean representing if form is submitting */
  loading: PropTypes.bool,
  /** Form array holding all form related errors */
  errors: PropTypes.object,
  /** Form object holding all form values */
  values: PropTypes.object,
  /** Form state stating if operation was successful */
  success: PropTypes.object,
  /** Form event listener holding all form related touched event  */
  touched: PropTypes.object
};
