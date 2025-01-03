import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavLeft from "@/components/navLeft";
import CatHeader from "@/components/header";
import { calc } from "antd/es/theme/internal";
const { Header, Sider, Content } = Layout;
function Home() {
  const { collapsed } = useSelector((state: any) => state.settingSlice);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLeft />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <CatHeader />
          </Header>
          <Content
            style={{
              height: "calc(100vh - 64px)",
              overflowY: 'auto',
            }}
          >
            <div style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet></Outlet>

            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default Home;
