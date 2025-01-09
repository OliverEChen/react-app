import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useCallback,
} from "react";
import { Button, Modal, Form, Input, Row, Col, message } from "antd";
import type { DataType } from "../interface/index";
function EditForm(props: any, ref: any) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    console.log("子组件渲染了");
  });

  const showModal = (openType: string, row: object) => {
    if (openType === "edit") {
      setTitle("编辑租户");
      form.setFieldsValue(row)
    } else {
      setTitle("新增租户");
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      console.log("Received values of form: ", values);
      message.success("提交成功");
      setIsModalOpen(false);
      props.getUserListFn()
      // props.handleSubmit(values);
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    showModal,
  }));

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Row>
            <Col span={12}>
              <Form.Item<DataType>
                label="客户名称"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<DataType>
                label="联系电话"
                name="phone"
                rules={[{ required: true, message: "Please input your phone!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="经营状态"
                name="status"
                rules={[{ required: true, message: "Please input your status!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="所属行业"
                name="business"
                rules={[{ required: true, message: "Please input your business!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="邮箱"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="统一信用代码"
                name="creditCode"
                rules={[{ required: true, message: "Please input your creditCode!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="工商注册号"
                name="industryNum"
                rules={[{ required: true, message: "Please input your industryNum!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="组织机构代码"
                name="organizationCode"
                rules={[{ required: true, message: "Please input your organizationCode!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<DataType>
                label="法人名"
                name="legalPerson"
                rules={[{ required: true, message: "Please input your legalPerson!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default forwardRef(EditForm);
