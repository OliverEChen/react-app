import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProps {
    allowed: boolean; // 当前路由是否需要登录
    redirectTo: string; // 重定向路径
    children: React.ReactNode;
 
}
function RequireAuth ({allowed, redirectTo, children}: IProps) {
    const navigate = useNavigate();
    const {token} = useSelector((state: any) => state.authSlice)
    const isLogin = token ? true : false
    useEffect(() => {
        if(allowed !== isLogin){
            navigate(redirectTo)
        }
    }, [allowed, children, isLogin, navigate, redirectTo])
    return allowed === isLogin ? <>{children}</>: <></>
}
export default RequireAuth;