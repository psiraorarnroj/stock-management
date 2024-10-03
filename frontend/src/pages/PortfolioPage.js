import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Table, Button, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ModalStock from "../components/modalStock";
import store from "../stores/PortfolioStore";

const PortfolioPage = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});

  useEffect(() => {
    store.fetchPortfolio();
  }, []);

  const handleSellStock = (stock) => {
    setIsModalVisible(true);
    setSelectedStock(stock);
  };

  const handleOk = (id) => {
    store.deleteStock(id);
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Symbol", dataIndex: "stockSymbol", key: "stockSymbol" },
    { title: "Name", dataIndex: "name", key: "name", responsive: ["md"] },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (_, record) => {
        let customClass =
          record.marketPrice === record.purchasePrice
            ? ""
            : record.purchasePrice > record.marketPrice
            ? "text-green-500"
            : "text-red-500";
        return <span className={customClass}>{record.purchasePrice}</span>;
      },
    },
    {
      title: "Market Price",
      dataIndex: "marketPrice",
      key: "marketPrice",
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleSellStock(record)}>Sell</Button>
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

  if (store.portfolio.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  const isProfit = Math.sign(store.profitLoss) === 1 || store.profitLoss === 0;

  return (
    <>
      <p className="w-full text-right font-bold mb-4">
        Total Purchase Price: {store.totalPurchasePrice.toFixed(4)}
      </p>
      <p className="w-full text-right font-bold mb-4">
        Total Market Price: {store.totalMarketPrice.toFixed(4)}
      </p>
      <p
        className={`w-full text-right font-bold mb-4 ${
          isProfit ? "text-green-500" : "text-red-500"
        }`}
      >
        {isProfit ? "Profit" : "Loss"}: {store.profitLoss.toFixed(4)}
      </p>
      <Table
        className="w-full"
        dataSource={store.portfolio}
        columns={columns}
        rowKey="_id"
      />
      <ModalStock
        title="Sell Stock"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        stock={selectedStock}
      />
    </>
  );
});

export default PortfolioPage;
