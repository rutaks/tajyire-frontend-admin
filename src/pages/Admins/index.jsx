import React, { Fragment, useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { InsertRowAboveOutlined, HomeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import AdminsTable from './AdminsTable';
import { connect } from 'react-redux';
import getAdminsAction from '../../redux/actions/admin/getAdmins';
import CreateAdmin from './CreateAdmin';

/**
 * Functional component representing the
 * List Admins View
 * @since version 1.0
 */
const Admins = ({ getAdminsState, getAdminsAction, adminPayload }) => {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    getAdminsAction({ page: currentPage });
  }, [getAdminsAction, currentPage]);

  useEffect(() => {
    if (adminPayload.content) {
      const response = adminPayload.content.map((admin, index) => {
        return { ...admin, index: index + 1 + 10 * currentPage };
      });
      setAdmins(response);
      setTotalElements(adminPayload.totalElements);
    }
  }, [adminPayload, currentPage]);

  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <InsertRowAboveOutlined />
          <span>Admins</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <br />
      <CreateAdmin />

      <AdminsTable
        currentPage={currentPage + 1}
        totalElements={totalElements}
        isLoading={getAdminsState.loading}
        adminArr={admins}
        setCurrentPage={setCurrentPage}
        style={styles.table}
      />
    </Fragment>
  );
};

const styles = {
  table: {
    paddingTop: '50px'
  },
  button: {
    marginLeft: '5px'
  }
};

Admins.propTypes = {
  getAdminsState: PropTypes.object,
  adminPayload: PropTypes.object,
  getAdminsAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getAdminsState: state.admin.getAdmins,
  adminPayload: state.admin.adminPayload
});

export default connect(mapStateToProps, { getAdminsAction })(Admins);
