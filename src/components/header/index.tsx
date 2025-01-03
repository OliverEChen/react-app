import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsedAction } from "@/store/settingSlice";
import {logoutAction} from "@/store/authSlice";
import { PoweroffOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import authSlice from '../../store/authSlice';
import {logout} from '@/api/user'
import CatBreadCrumb from "@/components/breadCrumb";


const items: MenuProps["items"] = [
  {
    key: "profile",
    label: (
      <a>个人中心</a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: "logout",
    label: (
      <a>退出登录</a>
    ),
    icon: <PoweroffOutlined />,
  },
];
function CatHeader() {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state: any) => state.settingSlice);
  const { username } = useSelector((state: any) => state.authSlice);

  const toggleCollapsed = () => {
    dispatch(toggleCollapsedAction(!collapsed));
  };
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key === 'logout') {
      logout()
      .then(() => {
        dispatch(logoutAction())
      })
    } else if(key === 'profile') {
      console.log('profile')
    }
  };
  return (
    <>
      <div
        className="flex f-a-center f-j-between"
        style={{ paddingRight: "16px" }}
      >
        <div className="flex f-a-center">
          <Button type="link" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <CatBreadCrumb />
        </div>
        <Dropdown menu={{ items, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {username}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </>
  );
}
export default CatHeader;
