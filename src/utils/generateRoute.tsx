import { RouteObject } from "react-router-dom";
import { componentMap} from '@/router/routerMap'
interface MenuI {
    icon: string;
    key: string;
    label: string;
    hidden?: boolean;
    children?: MenuI[];

}
                        
function GenerateRoute(menu: MenuI[]): RouteObject[]{
    return menu.map(item => {
        const hasChildren = item.children && item.children.length > 0;
        let routeObj: RouteObject = {
            path: item.key,
            element: hasChildren ? null : componentMap[item.key],
        }
        if(item.children){
            routeObj.children = GenerateRoute(item.children)
        }
        return routeObj
    })
    
}
export default GenerateRoute