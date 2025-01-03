import { createBrowserRouter, createHashRouter, RouteObject } from "react-router-dom";
import React from 'react';
import RequireAuth from '@/utils/RequireAuth'
const Home = React.lazy(() => import("../page/home"));
const Login = React.lazy(() => import("../page/login"));
const NotFound = React.lazy(() => import("../page/notFound"));
const Layout = React.lazy(() => import("@/layout/index"))

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <RequireAuth allowed={true} redirectTo="/login"><Layout/></RequireAuth>,
    },
    {
        path: "/login",
        element: <RequireAuth allowed={false} redirectTo="/dashboard"><Login/></RequireAuth>,
    },
    {
        path: "*",
        element: <NotFound />,
    },

]