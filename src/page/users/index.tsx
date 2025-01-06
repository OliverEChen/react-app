import "./index";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Input,
  Space,
  Table,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { DataType } from "./interface/index";
import { postUserList } from "@/api/users";

function Users() {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "序号",
      key: "index",
      dataIndex: "index",
      align: "center",
      width: 60,
      render: (value, record, index) =>
        `${(page * 1 - 1) * pageSize * 1 + (index * 1 + 1)}`, // 设置序号
    },
    {
      title: "客户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "经营状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "所属行业",
      dataIndex: "business",
      key: "business",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "统一信用代码",
      dataIndex: "creditCode",
      key: "creditCode",
    },
    {
      title: "工商注册号",
      dataIndex: "industryNum",
      key: "industryNum",
    },
    {
      title: "组织机构代码",
      dataIndex: "organizationCode",
      key: "organizationCode",
    },
    {
      title: "法人名",
      dataIndex: "legalPerson",
      key: "legalPerson",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <Popconfirm
            title="Delete the Record"
            description="Are you sure to delete this Record?"
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const confirmDelete = async () => {
    console.log("Delete", selectedRowKeys);
    // TODO: delete data
  };
  const getUserListFn = async () => {
    console.log("getUserListFn", page, pageSize);
    setLoading(true);
    const { code, data } = await postUserList({
      page,
      pageSize,
      ...form.getFieldsValue(),
    });
    setLoading(false);
    if (code === 200) {
      setTableData(data.list);
      setTotal(data.total);
    }
  };
  useEffect(() => {
    getUserListFn();
  }, [page, pageSize]);
  const handleSearch = () => {
    form.validateFields().then((values) => {
      console.log("Received values of form: ", values);
    });
  };
  const handleReset = () => {
    form.resetFields();
    form.validateFields().then((values) => {
      console.log("Received values of form: ", values);
    });
  };
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className="users-wrap">
      <Card>
        <Form layout="inline" form={form}>
          <Form.Item name="name" label="企业名称">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="contact" label="联系人">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form>
      </Card>
      <Card className="mg-t20">
        <Space className="mg-b10">
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            批量删除
          </Button>
        </Space>
        <Table<DataType>
          rowSelection={{ type: "checkbox", ...rowSelection }}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{
            current: page,
            pageSize,
            total,
            showTotal: (total) => `Total ${total} items`,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </Card>
    </div>
  );
}
export default Users;
