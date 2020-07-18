import React, { useEffect } from 'react';
import { Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Form } from 'formik-antd';
import Validations from '../../../../helpers/validations';
import PropTypes from 'prop-types';
import { message } from 'antd';

/**
 * Functional component representing the
 * Category Form used to create or edit a category
 * @since version 1.0
 */
export default function CreateCategoryForm({
  loading = false,
  imageError = null,
  errors = {},
  touched = {},
  handleImageChange = () => {},
  imageUrl = ''
}) {
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
        label="Category Name"
        validateStatus={errors.name && touched.name ? 'error' : ''}
        help={errors.name && errors.name}
      >
        <Input name="name" />
      </Form.Item>
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
      <Button loading={loading} block={true} style={{ width: '100%' }} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

CreateCategoryForm.propTypes = {
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
  /** Object hloding file image local location  */
  imageUrl: PropTypes.string
};
