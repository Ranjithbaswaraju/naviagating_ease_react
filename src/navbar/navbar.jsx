import React from 'react';
import { Layout, Menu, Dropdown, Button, Grid } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const screens = useBreakpoint(); // Use breakpoints to control responsiveness

  // Define your custom navigation items here
  const navItems = [
    { key: '1', label: 'Home' },
    { key: '2', label: 'About' },
    { key: '3', label: 'Contact' },
  ];

  // Define the dropdown menu for Sign In and Sign Up
  const userMenu = (
    <Menu
      items={[
        { key: '1', label: 'Sign In' },
        { key: '2', label: 'Sign Up' },
      ]}
    />
  );

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side: Logo and project name */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="../../images/project_log.png"
            alt="Logo"
            style={{
              width: 50,
              height: 50,
              marginRight: 10,
              objectFit: 'contain',
            }}
          />
          <h2 style={{ color: 'white', marginLeft: 10 }}>Navigating Ease</h2>
        </div>

        {/* Right side: Navigation menu and login dropdown */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={navItems}
            style={{
              flex: 'none',
              marginLeft: 'auto',
            }}
          />

          {/* Dropdown for Sign In/Sign Up */}
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Button
              type="text"
              icon={<UserOutlined style={{ fontSize: '20px', color: 'white' }} />}
            />
          </Dropdown>
        </div>
      </Header>

      <Content style={{ padding: screens.xs ? '0 16px' : '0 48px' }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: '#f0f2f5',
            borderRadius: 8,
          }}
        >
          <img src="../../images/home_img.jpg" style={{height:'500px',borderRadius:'50px'}}/>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design {new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Navbar;
