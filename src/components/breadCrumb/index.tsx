import { useLocation } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
import { Breadcrumb } from "antd";
import authSlice from "../../store/authSlice";
import { MenuItem } from "../navLeft";

/**
 * 根据给定路径和菜单项数组，查找面包屑路径
 *
 * @param path 给定的路径字符串
 * @param menuItem 菜单项数组
 * @returns 返回面包屑路径的字符串数组
 */
function findBreadCrumbPath(path: string, menuItem: MenuItem[]): string[] {
  const pathSegments: string[] = [];
  function findPath(currentPath: string, item: MenuItem[]) {
    for (const i of item) {
      if (currentPath.startsWith(i.key)) {
        pathSegments.push(i.label);
        if (i.children) {
          findPath(currentPath, i.children);
        }
        break;
      }
    }
    return pathSegments;
  }
  return findPath(path, menuItem);
}
function CatBreadCrumb() {
  const location = useLocation();
  const { menuList } = useSelector((state: any) => state.authSlice);
  let list = findBreadCrumbPath(location.pathname, menuList);
  const items = list.map((item) => {
    return {
      title: item,
    };
  });
  console.log(list);
  return (
    <>
      <Breadcrumb items={items} />
    </>
  );
}
export default CatBreadCrumb;
