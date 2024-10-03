import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { PieChartOutlined, FundOutlined } from "@ant-design/icons";

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
  return (
    <Layout className="min-h-screen h-full">
      <Header className="w-full h-fit bg-[#001529] grid grid-cols-2 p-4 items-center">
        <h1 className="text-white md:text-2xl font-bold">Stock Management</h1>
        <Menu
          className="flex items-center justify-end border-none"
          mode="horizontal"
          theme="dark"
          items={items}
        />
      </Header>
      <Layout>
        <Content className="w-full h-full bg-white p-4 md:p-8 flex flex-col items-center justify-start">
          {children}
        </Content>
        <Footer className="text-center">Stock Management ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
