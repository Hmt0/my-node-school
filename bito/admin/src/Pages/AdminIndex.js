import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/AdminIndex.css'
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = e => {
      if(e.key === 'addArticle') {
            navigate('/index/add')
      } else {
            navigate('/index/list')
      }
  }

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                工作台
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                添加文章
            </Menu.Item>
            <SubMenu
                key="sub1"
                icon={<UserOutlined />}
                onClick={handleClickArticle}
                title="文章管理"
            >
                <Menu.Item key="articleList">文章列表</Menu.Item>
                <Menu.Item key="addArticle">添加文章</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="浏览管理">
                <Menu.Item key="6">删除留言</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
                Files
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Routes>
                        <Route path="/add/" exact element={<AddArticle />}></Route>
                        <Route path="/list/" exact element={<ArticleList />}></Route>
                        <Route path="/add/:id" exact element={<ArticleList />}></Route>
                    </Routes>
                </div>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>this is hmt</Footer>
        </Layout>
        </Layout>
    );
}

export default AdminIndex