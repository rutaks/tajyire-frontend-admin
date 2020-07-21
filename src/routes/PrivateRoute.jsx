import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  InsertRowAboveOutlined,
  UserOutlined,
  FileTextOutlined,
  DownOutlined
} from '@ant-design/icons';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import NotFound from '../pages/Results/NotFound';
import CategoryDescription from '../pages/Categories/CategoryDescription';
import EditCategory from '../pages/Categories/EditCategory';
import EditSubCategory from '../pages/Categories/EditSubCategory';

const { Header, Sider, Content } = Layout;

export default function PrivateRoute() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    if (localStorage.TAJYIRE_USER && localStorage.TAJYIRE_USER !== '') {
      setUser(JSON.parse(localStorage.TAJYIRE_USER));
    }
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  if (!localStorage.TAJYIRE_TOKEN) return <Redirect to="/login" />;

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {/**{!collapsed && (
            <img
              src={window.location.origin + '/images/logo.jpeg'}
              style={{ width: '140px', height: '60px' }}
              alt=""
            />
          )} */}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<InsertRowAboveOutlined />}>
            <Link to="/" />
            Categories
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/products" />
            Products
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
          <Dropdown overlay={menu}>
            <Link className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {`${user.firstName} ${user.lastName}`} <DownOutlined />
            </Link>
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24
          }}
        >
          <Switch>
            <Route exact path="/" component={Categories} />
            <Route exact path="/categories/:categoryUuId/edit" component={EditCategory} />
            <Route exact path="/categories/:categoryUuId" component={CategoryDescription} />
            <Route exact path="/sub-categories/:subCategoryUuId/edit" component={EditSubCategory} />
            <Route exact path="/products" component={Products} />
            <Route exact component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
