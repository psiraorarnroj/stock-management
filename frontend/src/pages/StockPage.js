import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Table, Button, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ModalStock from "../components/modalStock";
import store from "../stores/PortfolioStore";

const StockPage = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    store.fetchStock();
  }, []);

  const handleAddStock = (stock) => {
    setIsModalVisible(true);
    setSelectedStock(stock);
  };

  const handleOk = (stock) => {
    store.addStock(stock);
    setIsModalVisible(false);
    navigate("/portfolio");
  };

  const columns = [
    { title: "Symbol", dataIndex: "symbol", key: "symbol" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleAddStock(record)}>Buy</Button>
      ),
    },
  ];

  if (store.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (store.stock.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <>
      <Table
        className="w-full"
        dataSource={store.stock}
        columns={columns}
        rowKey="symbol"
      />
      <ModalStock
        title="Buy Stock"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        stock={selectedStock}
      />
    </>
  );
});

export default StockPage;
