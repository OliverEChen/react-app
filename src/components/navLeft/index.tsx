import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import icons from "./icons";

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[] | null;
}
interface MenuItemFromData {
  key: string;
  icon?: String;
  label: string;
  children?: MenuItemFromData[];
}
function NavLeft() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed } = useSelector((state: any) => state.settingSlice);
  const { menuList } = useSelector((state: any) => state.authSlice);
  const [menuData, setMenuData] = useState<any>([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string>("");
  useEffect(() => {
    setDefaultSelectedKeys(location.pathname);
    const arr = mapMenuItem(menuList);
    console.log("mapMenu: ", arr);
    setMenuData(arr);
  }, [menuList]);
  const mapMenuItem = (item: MenuItemFromData[]): MenuItem[] => {
    return item.map((i: MenuItemFromData) => {
      return {
        key: i.key,
        icon: icons[i.icon as string],
        label: i.label,
        children: i.children ? mapMenuItem(i.children) : null,
      };
    });
  };
  const handleClick = (e: { key: string }) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <>
      <div
        className="c-fff flex f-a-center f-j-center"
        style={{ height: "64px" }}
      >
        <h1>React</h1>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[defaultSelectedKeys]}
        defaultSelectedKeys={[defaultSelectedKeys]}
        selectedKeys={[location.pathname]}
        items={menuData}
        inlineCollapsed={collapsed}
        onClick={handleClick}
      />
    </>
  );
}
export default NavLeft;
