import { Breadcrumb } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { FileTextOutlined, HomeOutlined } from '@ant-design/icons';
import ProductsTable from './ProductsTable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getProductsAction from '../../redux/actions/product/getProducts';
import deleteProductAction from '../../redux/actions/product/deleteProduct';

/**
 * Functional component representing the
 * List Products View
 * @since version 1.0
 */
const Products = ({
  getProductsState,
  getProductsAction,
  deleteProductAction,
  deleteProductState,
  productPayload
}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    getProductsAction({ page: currentPage });
  }, [getProductsAction, currentPage]);

  useEffect(() => {
    if (productPayload.content) {
      const response = productPayload.content.map((category, index) => {
        return { ...category, index: index + 1 + 10 * currentPage };
      });
      console.log('response');
      console.log(productPayload.content);
      setProducts(response);
      setTotalElements(productPayload.totalElements);
    }
  }, [productPayload, currentPage]);

  const deleteProduct = (productUuId) => {
    deleteProductAction({ productUuId });
  };

  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/products">
          <FileTextOutlined />
          <span>Products</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <ProductsTable
        currentPage={currentPage + 1}
        totalElements={totalElements}
        isLoading={getProductsState.loading || deleteProductState.loading}
        currentArray={products}
        setCurrentPage={setCurrentPage}
        deleteItem={deleteProduct}
        styles={styles}
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
Products.propTypes = {
  getProductsState: PropTypes.object,
  deleteProductState: PropTypes.object,
  productPayload: PropTypes.object,
  getProductsAction: PropTypes.func,
  deleteProductAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  getProductsState: state.product.getProducts,
  deleteProductState: state.product.deleteProduct,
  productPayload: state.product.productPayload
});

export default connect(mapStateToProps, { getProductsAction, deleteProductAction })(Products);
