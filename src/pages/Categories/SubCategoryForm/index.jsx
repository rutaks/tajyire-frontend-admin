import React, { useEffect, useState } from 'react';
import { Upload, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Form } from 'formik-antd';
import Validations from '../../../helpers/validations';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { connect } from 'react-redux';
import getCategoriesAction from '../../../redux/actions/category/getCategories';
const { Option } = Select;

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
const SubCategoryForm = ({
  formType = 'CREATE',
  loading = false,
  imageError = null,
  errors = {},
  touched = {},
  onSelectChange = () => {},
  handleImageChange = () => {},
  imageUrl = '',
  getAllCategoriesState,
  getCategoriesAction,
  categoryDefaultValue
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesAction({ page: -1 });
  }, [getCategoriesAction]);

  useEffect(() => {
    if (getAllCategoriesState.payload) {
      setCategories(getAllCategoriesState.payload);
    }
  }, [getAllCategoriesState.payload]);

  useEffect(() => {
    if (imageError) {
      message.error(imageError);
    }
  }, [imageError]);

  return (
    <Form
      wrapperCol={{
        span: 6
      }}
      layout="horizontal"
    >
      <Form.Item
        name="name"
        label="SubCategory Name"
        validateStatus={errors.name && touched.name ? 'error' : ''}
        help={errors.name && errors.name}
      >
        <Input name="name" />
      </Form.Item>
      <p>Parent Category</p>
      <Select
        showSearch
        defaultOpen={categoryDefaultValue}
        onChange={onSelectChange}
        optionFilterProp="children"
        style={{ width: '20%' }}
      >
        {categories.map((d) => (
          <Option key={d.id}>{d.name}</Option>
        ))}
      </Select>
      <p>Image Cover</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={Validations.isValidImage}
        onChange={handleImageChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
      </Upload>
      <Button loading={loading} block={true} style={{ width: '100%' }} type={'primary'} htmlType="submit">
        {formType === 'CREATE' ? 'Submit' : 'Edit'}
      </Button>
    </Form>
  );
};

SubCategoryForm.propTypes = {
  /** Props identifying design of form specifying if form is an edit or create form*/
  formType: PropTypes.string,
  /** Boolean representing if form is submitting */
  loading: PropTypes.bool,
  /** Image Error message */
  imageError: PropTypes.string,
  /** Form array holding all form related errors */
  errors: PropTypes.object,
  /** Form event listener changing currently selected item  */
  onSelectChange: PropTypes.func,
  /** Form event listener holding all form related touched event  */
  touched: PropTypes.object,
  /** Function to handle when upload image field has change  */
  handleImageChange: PropTypes.func,
  /** Object hloding file image local location  */
  imageUrl: PropTypes.string,
  getCategoriesAction: PropTypes.func,
  getAllCategoriesState: PropTypes.object,
  categoryDefaultValue: PropTypes.string
};

const mapStateToProps = (state) => ({
  getAllCategoriesState: state.category.getAllCategories
});

export default connect(mapStateToProps, { getCategoriesAction })(SubCategoryForm);
