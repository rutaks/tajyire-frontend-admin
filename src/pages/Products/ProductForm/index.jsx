import React, { Fragment, useEffect, useState } from 'react';
import { Upload, Button, Col, Select, Row, DatePicker, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Form } from 'formik-antd';
import Validations from '../../../helpers/validations';
import PropTypes from 'prop-types';
import { getBase64Async } from '../../../helpers/imageHelper';
import { message } from 'antd';
import { connect } from 'react-redux';
import getCategoriesAction from '../../../redux/actions/category/getCategories';
import Modal from 'antd/lib/modal/Modal';
import { Option } from 'antd/lib/mentions';
import TreeSelect from 'antd/lib/tree-select';
import asyncApi from '../../../helpers/asyncApi';

/**
 * Functional component representing the
 * Product Form used to create or edit a product
 * @since version 1.0
 */
const ProductForm = ({
  formType = 'CREATE',
  loading = false,
  imageError = null,
  errors = {},
  touched = {},
  handleImageChange = () => {},
  fileList = [],
  values,
  getAllCategoriesState,
  getCategoriesAction
}) => {
  const [state, setstate] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    isDiscountAreaVisible: false,
    categories: [
      {
        id: 0,
        title: ''
      }
    ]
  });

  useEffect(() => {
    getCategoriesAction({ page: -1 });
  }, []);

  useEffect(() => {
    if (getAllCategoriesState.payload) {
      const parsedCategories = getAllCategoriesState.payload.map((category) => {
        return { id: category.uuid, title: category.name, isLeaf: false };
      });
      setstate({ ...state, categories: parsedCategories });
    }
  }, [getAllCategoriesState.payload]);

  useEffect(() => {
    if (imageError) {
      message.error(imageError);
    }
  }, [imageError]);

  const handleImagePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64Async(file.originFileObj);
    }

    setstate({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  const handleImageCancel = () => setstate({ ...state, previewVisible: false });

  const mockImageUploadRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const toggleDiscountVisible = () => {
    setstate({ ...state, isDiscountAreaVisible: !state.isDiscountAreaVisible });
  };

  const onLoadData = (treeNode) => {
    const { id } = treeNode.props;
    return new Promise((resolve) => {
      asyncApi({
        method: 'get',
        url: `/api/v1/categories/${id}/sub-categories?page=-1`
      })
        .then((value) => {
          const parsedCategories = value.payload.map((category) => {
            return {
              id: category.id,
              title: category.name,
              pId: category.parentCategory.uuid,
              isLeaf: true
            };
          });
          setstate({
            categories: state.categories.concat(parsedCategories)
          });
          resolve();
        })
        .catch((error) => {
          console.log(error);
          resolve();
        });
    });
  };

  return (
    <Fragment>
      <Form layout="horizontal">
        <Row>
          <Col span={6} style={style}>
            <Form.Item
              name="name"
              label="Category Name"
              validateStatus={errors.name && touched.name ? 'error' : ''}
              help={touched.name && errors.name && errors.name}
            >
              <Input name="name" />
            </Form.Item>
          </Col>
          <Col span={6} style={style}>
            <Form.Item
              name="category"
              validate={Validations.validateCategoryId}
              validateStatus={errors.category && touched.category ? 'error' : ''}
              help={touched.category && errors.category && errors.category}
            >
              <TreeSelect
                treeDataSimpleMode
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                onChange={(value) => {
                  values.category = value;
                }}
                treeData={state.categories}
                loadData={onLoadData}
              ></TreeSelect>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} style={style}>
            <Form.Item
              name="price"
              label="Price"
              validateStatus={errors.price && touched.price ? 'error' : ''}
              help={touched.price && errors.price && errors.price}
            >
              <Input name="price" />
            </Form.Item>
          </Col>
          <Col span={2} style={{ margin: '8px 0px 8px 8px' }}>
            <Form.Item
              name="currency"
              validateStatus={errors.currency && touched.currency ? 'error' : ''}
              help={touched.currency && errors.currency && errors.currency}
            >
              <Select
                showSearch
                placeholder="Currency"
                onChange={(value) => (values.currency = value)}
                optionFilterProp="children"
              >
                <Option value="USD">USD</Option>
                <Option value="RWF">RWF</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col style={{ margin: '8px 0px 8px 8px' }}>
            <Checkbox checked={state.isDiscountAreaVisible} onChange={toggleDiscountVisible}>
              {state.isDiscountAreaVisible ? 'Remove Discount from Product?' : 'Add Discount to Product?'}
            </Checkbox>
          </Col>
        </Row>
        {state.isDiscountAreaVisible && (
          <Row>
            <Col span={4} style={{ margin: '8px 0px 8px 8px' }}>
              <Form.Item
                name="discount"
                label="Discount"
                validate={(value) => {
                  return Validations.validatePrice(value, 0, 1000000, state.isDiscountAreaVisible);
                }}
                validateStatus={errors.discount && touched.discount ? 'error' : ''}
                help={touched.discount && errors.discount && errors.discount}
              >
                <Input name="discount" />
              </Form.Item>
            </Col>
            <Col span={3} style={style}>
              <Form.Item
                name="discountDeadline"
                validate={(dateObj) => {
                  return Validations.validateDeadline(
                    dateObj ? dateObj._d : null,
                    state.isDiscountAreaVisible
                  );
                }}
                validateStatus={errors.discountDeadline && touched.discountDeadline ? 'error' : ''}
                help={touched.discountDeadline && errors.discountDeadline && errors.discountDeadline}
              >
                <DatePicker
                  onChange={(date) => {
                    values.discountDeadline = date;
                  }}
                  showTime
                  placeholder="Discount deadline"
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <p>Image Cover</p>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          fileList={fileList}
          onPreview={handleImagePreview}
          beforeUpload={Validations.isValidImage}
          onChange={handleImageChange}
          customRequest={mockImageUploadRequest}
        >
          <PlusOutlined />
        </Upload>
        <Button loading={loading} block={true} style={{ width: '100%' }} type={'primary'} htmlType="submit">
          {formType === 'CREATE' ? 'Submit' : 'Edit'}
        </Button>
      </Form>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={handleImageCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
    </Fragment>
  );
};

const style = {
  margin: '8px 8px'
};

ProductForm.propTypes = {
  /** Props identifying design of form specifying if form is an edit or create form*/
  formType: PropTypes.string,
  /** Boolean representing if form is submitting */
  loading: PropTypes.bool,
  /** Image Error message */
  imageError: PropTypes.string,
  /** Form array holding all form related errors */
  errors: PropTypes.object,
  /** Form event listener holding all form related touched event  */
  touched: PropTypes.object,
  /** Function to handle when upload image field has change  */
  handleImageChange: PropTypes.func,
  /** Array holding uploaded file images details  */
  fileList: PropTypes.array,
  /** Form object holding all form related values */
  values: PropTypes.object,
  getCategoriesAction: PropTypes.func,
  getAllCategoriesState: PropTypes.object,
  getAllSubCategoriesState: PropTypes.object,
  categoryDefaultValue: PropTypes.string
};

const mapStateToProps = (state) => ({
  getAllCategoriesState: state.category.getAllCategories
});

export default connect(mapStateToProps, { getCategoriesAction })(ProductForm);
