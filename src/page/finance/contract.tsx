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
  Tag,
  message,
} from "antd";
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { postUserList, postDeleteUser, batchDeleteUser } from "@/api/users";

import type { TableProps } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { post } from "@/utils/http/request";
import type { DataType } from "./interface/index";
import { setTableData, setQueryParams } from "@/store/finance/contract";
import { useDispatch, useSelector } from "react-redux";

const statusMap = new Map<number, any>([
  [1, { text: "审批通过", color: "green" }],
  [2, { text: "审批拒绝", color: "red" }],
  [3, { text: "未审批", color: "gray" }],
]);
function Contract() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
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
      title: "合同名称",
      dataIndex: "contractName",
      key: "contractName",
    },
    {
      title: "合同编号",
      dataIndex: "contractNo",
      key: "contractNo",
    },
    {
      title: "合同类别",
      dataIndex: "contractType",
      key: "contractType",
    },
    {
      title: "甲方",
      dataIndex: "partyA",
      key: "partyA",
    },
    {
      title: "乙方",
      dataIndex: "partyB",
      key: "partyB",
    },
    {
      title: "合同开始日期",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "合同结束日期",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "合同状态",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <>
          {statusMap.get(value) ? (
            <Tag color={statusMap.get(value).color} key={value}>
              {statusMap.get(value).text}
            </Tag>
          ) : null}
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onView(record)}>查看</a>
          <a onClick={() => onEdit(record)}>编辑</a>
          <Popconfirm
            title="Delete the Record"
            description="Are you sure to delete this Record?"
            onConfirm={() => confirmDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const from = location.state?.from; // 来自于那个页面
  const { tableData, pages, queryParams } = useSelector((state: any) => state.contractSlice);
  const patchDeleteDisabled = useMemo(() => {
    return selectedRowKeys.length === 0;
  }, [selectedRowKeys]);
  const onAdd = () => {};
  const onExportExcel = () => {

  }
  const onEdit = (row: DataType) => {};
  const onView = (row: DataType) => {
    navigate(`/finance/contract-detail?id=${row.id}`, {
        state: row
    });
  };
  const confirmDelete = async (id: number) => {
    const { code, message: msg } = await postDeleteUser(id);
    message.success(msg);
    loadData();
    // TODO: delete data
  };
  const onPatchDelete = async () => {
    const { code, message: msg } = await batchDeleteUser(
      selectedRowKeys.join()
    );
    message.success(msg);
    loadData();
  };
  const loadData = async (page=1, pageSize=10) => {
    setLoading(true);
    const { code, data } = await post("contractList", {
      page,
      pageSize,
      ...form.getFieldsValue(),
    });
    setLoading(false);
    if (code === 200) {
      dispatch(
        setTableData({
          data: data.list,
          total: data.total,
          page: page,
          pageSize: pageSize,
        })
      );
      setTotal(data.total)
    }
  };
  useEffect(() => {
    console.log('contract useEffect')
    if (from !== "contract-detail" || tableData.length === 0) {
      loadData();
    }else {
        form.setFieldsValue(queryParams)
        setPage(pages.page)
        setPageSize(pages.pageSize)
        setTotal(pages.total)
    }
  }, []);
  const handleSearch = () => {
    form.validateFields().then((values) => {
      console.log("Received values of form: ", values);
      dispatch(setQueryParams(values));
      loadData();
    });
  };
  const handleReset = () => {
    setPage(1);
    setPageSize(10);
    setSelectedRowKeys([]);
    form.resetFields();
    dispatch(setQueryParams({}));
    loadData();
  };
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    preserveSelectedRowKeys: true,
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
          <Form.Item name="contractNo" label="合同编号">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="name" label="联系人">
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
        <Button type="primary" icon={<DownloadOutlined />} onClick={onExportExcel} disabled={patchDeleteDisabled}>
            导出为 Excel
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            新增
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            disabled={patchDeleteDisabled}
            onClick={onPatchDelete}
          >
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
            showTotal: (total) => `总 ${total} 条`,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
              loadData(page, pageSize);
            },
          }}
        />
      </Card>
    </div>
  );
}
export default Contract;
