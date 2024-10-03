import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const ModalStock = ({ title, visible, onCancel, onOk, stock }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      stockSymbol: stock?.symbol,
      purchasePrice: stock?.price,
    });
  }, [stock, form]);

  return (
    <Modal title={title} open={visible} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="stockSymbol"
          label="Stock Symbol"
          rules={[{ required: true }]}
        >
          <Input disabled={!!stock?.name} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <InputNumber className="w-full" step={1} min={1} />
        </Form.Item>
        <Form.Item
          name="purchasePrice"
          label="Purchase Price"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            step={0.0001}
            disabled={!!stock?.price}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalStock;
