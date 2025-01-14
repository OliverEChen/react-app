import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import icons from "./icons";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[] | null;
}
interface MenuItemFromData {
  key: string;
  icon?: String;
  label: string;
  hidden?: boolean;
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
    const arr = mapMenuItem(filterHiddenRoutes(menuList));
    console.log("mapMenu: ", arr);
    setMenuData(arr);
  }, [menuList]);
  // 返回菜单目录 过滤掉隐藏菜单
  const filterHiddenRoutes = (menus: MenuItemFromData[]) => {
    const filterRoutes = (menus: MenuItemFromData[]):any => {
      let filtered = menus.filter((r) => !r.hidden);
      return filtered.map((r) => {
        if (r.children && r.children.length > 0) {
          return {
            ...r,
            children: filterRoutes(r.children),
          };
        }else {
          return r
        }
      });
    };

    let arr = filterRoutes(menus);
    return arr;
  };
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
    <div style={{ height: "100vh" }}>
      <div
        className="c-fff flex f-a-center f-j-center"
        style={{ height: "64px" }}
      >
        <h1>React</h1>
      </div>
      <div style={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
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
      </div>
    </div>
  );
}
export default NavLeft;
