import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Drawer, Button } from "antd";
import {
  PieChartOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "1", icon: <FundOutlined />, label: <Link to="/">Stocks</Link> },
  {
    key: "2",
    icon: <PieChartOutlined />,
    label: <Link to="/portfolio">Portfolio</Link>,
  },
];

const AppLayout = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedKey("1");
    } else if (location.pathname === "/portfolio") {
      setSelectedKey("2");
    }
  }, [location]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout className="min-h-screen h-full">
      <Header className="w-full h-fit bg-[#001529] grid grid-cols-2 p-4 items-center">
        <h1 className="text-white md:text-2xl font-bold">Stock Management</h1>
        <div className="flex items-center justify-end">
          <Menu
            className="hidden md:flex w-full items-center justify-end border-none"
            mode="horizontal"
            theme="dark"
            selectedKeys={[selectedKey]}
            items={items}
          />
          <Button
            className="md:hidden text-white"
            icon={<MenuOutlined />}
            type="text"
            onClick={showDrawer}
          />
        </div>
      </Header>
      <Layout>
        <Content className="w-full h-full bg-white p-4 md:p-8 flex flex-col items-center justify-start">
          {children}
        </Content>
        <Footer className="text-center">Stock Management ©2024</Footer>
      </Layout>
      <Drawer
        className="[&_.ant-drawer-body]:p-0"
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          theme="dark"
          selectedKeys={[selectedKey]}
          items={items}
        />
      </Drawer>
    </Layout>
  );
};

export default AppLayout;
