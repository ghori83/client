import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Radio, message } from "antd";
import { getAntdInputValidation } from "../../../utilities/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addInventory } from "../../../apicalls/inventory";
import { SetLoading } from "../../../redux/loaderSlice";

const InventoryForm = ({ open, setOpen, reloadData }) => {
  //how below form working
  const [form] = Form.useForm();
  const currentUser = useSelector((state) => state.users);

  const [inventoryType, setInventoryType] = useState("in");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await addInventory({
        ...values,
        inventoryType,
        organization: currentUser._id,
      });
      console.log(
        currentUser.currentUser._id,
        "this is from add inventory form"
      );
      console.log(inventoryType, "this is from add inventory form");
      dispatch(SetLoading(false));
      if (response.success) {
        reloadData();
        message.success("Inventory Added Successfully");
        setOpen(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      SetLoading(false);
    }
  };

  return (
    <Modal
      title="ADD INVENTORY"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      //this form.submit is using const [form] =Form.useForm() which is antd function
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-3"
        //this form={form} is using const [form] =Form.useForm() which is antd function
        form={form}
        //onFinish which is a antd form function is taking the value of onFinish which we write
        onFinish={onFinish}
      >
        <Form.Item label="Add Inventory" rules={getAntdInputValidation()}>
          <Radio.Group
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <Radio value={"in"}> In </Radio>
            <Radio value={"out"}> Out </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={getAntdInputValidation()}
        >
          <select name="" id=" ">
            <option value="a+">A+ </option>
            <option value="a-">A- </option>
            <option value="b+"> B+ </option>
            <option value="b-"> B- </option>
            <option value="ab+"> AB+ </option>
            <option value="ab-">AB- </option>
            <option value="o+">O+ </option>
            <option value="o-"> O- </option>
          </select>
        </Form.Item>
        <Form.Item
          label={inventoryType === "out" ? "Hospital Email" : "Donor Email"}
          name="email"
          rules={getAntdInputValidation()}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Quantity (ML)"
          name="quantity"
          rules={getAntdInputValidation()}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryForm;
