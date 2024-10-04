import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const ModalStock = ({ title, visible, onCancel, onOk, stock, isSell }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
        form.resetFields();
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      _id: stock?._id,
      symbol: stock?.symbol,
      quantity: stock?.quantity ?? 1,
      purchasePrice: stock?.purchasePrice || stock?.price,
      marketPrice: stock?.marketPrice,
    });
  }, [stock, form]);

  const netProfit =
    stock?.quantity && stock?.purchasePrice && stock?.marketPrice
      ? (
          (stock?.marketPrice - stock?.purchasePrice) *
          stock?.quantity
        )?.toFixed(4)
      : "0.0000";
  const isProfit = Math.sign(netProfit) === 1 || netProfit === "0.0000";

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose={true}
    >
      <Form form={form} layout="vertical">
        <Form.Item className="hidden" name="_id" label="ID">
          <Input disabled={!!stock?._id} />
        </Form.Item>
        <Form.Item
          name="symbol"
          label="Stock Symbol"
          rules={[{ required: true }]}
        >
          <Input disabled={isSell || !!stock?.name} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            step={1}
            min={1}
            max={stock?.quantity || 100}
            disabled={isSell}
          />
        </Form.Item>
        <Form.Item
          name="purchasePrice"
          label="Purchase Price"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            step={0.0001}
            disabled={isSell || !!stock?.price}
          />
        </Form.Item>
        {isSell && (
          <>
            <Form.Item
              name="marketPrice"
              label="Market Price"
              rules={[{ required: true }]}
            >
              <InputNumber
                className="w-full"
                step={0.0001}
                disabled={isSell || !!stock?.marketPrice}
              />
            </Form.Item>
            <div className="flex justify-between my-6 font-bold text-lg">
              <span>Total Purchase Price:</span>
              <span>{(stock?.purchasePrice * stock?.quantity).toFixed(4)}</span>
            </div>
            <div className="flex justify-between my-6 font-bold text-lg">
              <span>Total Selling Price:</span>
              <span>{(stock?.marketPrice * stock?.quantity).toFixed(4)}</span>
            </div>
            <div className="flex justify-between my-6 font-bold text-lg">
              <span>Net {isProfit ? "Profit" : "Loss"}:</span>
              <span
                className={`${isProfit ? "text-green-500" : "text-red-500"}`}
              >
                {netProfit}
              </span>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalStock;
