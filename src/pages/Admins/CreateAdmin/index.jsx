import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import createAdminAction from '../../../redux/actions/admin/createAdmin';
import { message } from 'antd';
import AdminForm from '../AdminForm';

/**
 * Functional component representing the
 * Admin Form used to create an admin
 * @since version 1.0
 */
const CreateAdmin = ({ createAdminAction, createAdminState: { loading, success, error } }) => {
  const history = useHistory();

  useEffect(() => {
    if (success) {
      message.success('Admin was sent an email for confirmation succesffully');
    }
  }, [success, history]);

  useEffect(() => {
    error && message.error(error || 'Could not create category');
  }, [error]);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: ''
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Not a valid email').required('Email is required')
      })}
      onSubmit={(values) => {
        createAdminAction(values);
      }}
    >
      {({ errors, touched, values }) => (
        <AdminForm errors={errors} values={values} success={success} loading={loading} touched={touched} />
      )}
    </Formik>
  );
};

CreateAdmin.propTypes = {
  /** Redux create admin state */
  createAdminState: PropTypes.object,
  /** API Action linked with redux to create an admin */
  createAdminAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  createAdminState: state.admin.createAdmin
});

export default connect(mapStateToProps, { createAdminAction })(CreateAdmin);
