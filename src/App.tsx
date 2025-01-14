import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import { routes } from "./router";
import { createBrowserRouter } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GenerateRoute from "./utils/generateRoute";
import { getMenu } from "@/api/user";
import { setMenuList } from "@/store/authSlice";

function App() {
  const dispatch = useDispatch();
  const [router, setRouter] = useState<any>(null);
  const { token } = useSelector((state: any) => state.authSlice);
  useEffect(() => {
    createRouterFn();
  }, [token]);
  const createRouterFn = async () => {
    const { data } = await getMenu();
    dispatch(setMenuList(data));
    if (data.length > 0) {
      const asyncRoutes = GenerateRoute(data);
      const _routes = [...routes];
      _routes[0].children = asyncRoutes;
      if (_routes[0].children[0]) {
        _routes[0].children[0].index = true; // 默认子路由
      }
      setRouter(createBrowserRouter(_routes));
    } else {
      setRouter(createBrowserRouter(routes));
    }
  };
  if (router) {
    return (
      <div className="App">
        <Suspense fallback={<Spin fullscreen />}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </div>
    );
  } else {
    return <Spin fullscreen />;
  }
}

export default App;
