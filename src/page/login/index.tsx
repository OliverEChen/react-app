import "./index.scss";
import bg from "@/assets/bg.jpg";
import lgbg from "@/assets/lgbg.jpg";
import logo from "@/assets/logo.png";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "@/api/user";
import { useEffect, useState } from "react";
import { setToken, setUsername } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

function Login() {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleLogin = () => {
    form
      .validateFields()
      .then(async (values) => {
        setBtnLoading(true)
        const { data } = await login(values);
        setBtnLoading(false)
        dispatch(setToken(data.token));
        dispatch(setUsername(data.username));
        navigate("/", {replace: true });
      })
      .catch((errorInfo) => {
        setBtnLoading(false)
        console.log("Failed:", errorInfo);
      });
  };
  return (
    <>
      <div className="login-wrap" style={{ backgroundImage: `url(${bg})` }}>
        <div className="login-form">
          <div className="left">
            <img src={lgbg} alt="" />
          </div>
          <div className="right">
            <div>
              <div className="logo">
                <img src={logo} alt="" />
                <h1>React 平台</h1>
              </div>
              <Form
                name="basic"
                layout="vertical"
                form={form}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  name="username"
                  rules={[{ required: true, message: "请输入用户名!" }]}
                >
                  <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item<FieldType>
                  name="password"
                  rules={[{ required: true, message: "请输入密码!" }]}
                >
                  <Input.Password
                    placeholder="请输入密码"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>

                <Form.Item label={null}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    onClick={handleLogin}
                    loading={btnLoading}
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
