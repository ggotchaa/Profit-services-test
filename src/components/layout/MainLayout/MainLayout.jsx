import { useState } from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ children, activeKey = 'dashboard', onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="main-layout">
      <Sidebar 
        collapsed={collapsed} 
        activeKey={activeKey}
        onMenuClick={onMenuClick}
      />
      <Layout className="content-layout">
        <Header 
          collapsed={collapsed} 
          onToggle={handleToggle} 
        />
        <Content className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
