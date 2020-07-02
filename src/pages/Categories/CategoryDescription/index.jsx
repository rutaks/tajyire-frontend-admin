import React, { Fragment } from 'react';
import { Descriptions } from 'antd';
import SubCategoriesTable from './SubCategoriesTable';

export default function CategoryDescription() {
  return (
    <Fragment>
      <Descriptions title="Category Info">
        <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Created On">12 Jan 2020</Descriptions.Item>
        <Descriptions.Item label="Last Modified On">12 Jan 2020</Descriptions.Item>
        <Descriptions.Item label="Cover"></Descriptions.Item>
        <Descriptions.Item label="Created By">Rutakayile Samuel</Descriptions.Item>

        <Descriptions.Item label="Last Modified By">Rutakayile Samuel</Descriptions.Item>
      </Descriptions>
      <img
        style={{ height: '120px', width: '120px' }}
        src="https://review.chinabrands.com/chinabrands/seo/image/20181102/20181102024137350456-1.jpg"
        alt=""
      />
      <SubCategoriesTable />
    </Fragment>
  );
}
