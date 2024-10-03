import * as React from "react";
import { useState } from "react";
import { message, Select, Form, Button, Input, Modal } from "antd";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  options: IOption[];
  selectedItem: string;
  onOptionsChange: (list: IOption[]) => void;
  onSelectChange: (value: string) => void;
  title: string;
  buttonText: string;
  disabled: boolean;
}
export default function NormalFormItem({
  options,
  selectedItem,
  onOptionsChange,
  onSelectChange,
  title,
  buttonText,
  disabled,
}: IProps) {
  // header
  // select + button
  // select initail items [{key: value}]
  // button text、onclick -> openModal
  // modal: add address、name, title = header + text, click add button -> select list(validate is exist key)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value: string) => {
    onSelectChange(value);
  };
  const onAdd = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    const values = form.getFieldsValue();
    const newItem = {
      value: values.address,
      label: values.name || values.address,
    };
    if (options.map((ele) => ele.value).includes(newItem.value)) {
      message.error("Already Exist");
    } else {
      onOptionsChange([...options, newItem]);
      handleClose();
    }
  };

  const [form] = Form.useForm();
  return (
    <div>
      <div className="flex w-full mb-2 justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button onClick={onAdd} disabled={disabled} className="bg-blue-500 border-blue-500 text-white font-semibold">
          {buttonText}
        </Button>
      </div>
      <div className="flex w-full">
        <Select
          options={options}
          className="h-[40px] w-full"
          placeholder="Select a person"
          showSearch
          disabled={disabled}
          value={selectedItem}
          onChange={handleChange}
        />

        <Modal
          width={500}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleClose}
          okText="Add"
        >
          <Form
            className="mr-6"
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label={`${title}Address`}
              name="address"
              rules={[
                { required: true, message: `Please input your ${title}!` },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={`${title}Name`} name="name">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
