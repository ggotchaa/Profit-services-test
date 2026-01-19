import { Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined, 
  TableOutlined, 
  EnvironmentOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  
  // Determine active key from current path
  const getActiveKey = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path === '/table') return 'table';
    if (path === '/map') return 'map';
    if (path === '/statistics') return 'statistics';
    if (path === '/reports') return 'reports';
    return 'dashboard';
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/">Главная</NavLink>,
    },
    {
      key: 'table',
      icon: <TableOutlined />,
      label: <NavLink to="/table">Таблица обращений</NavLink>,
    },
    {
      key: 'map',
      icon: <EnvironmentOutlined />,
      label: <NavLink to="/map">Карта</NavLink>,
    },
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: <NavLink to="/statistics">Статистика</NavLink>,
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: <NavLink to="/reports">Отчёты</NavLink>,
    },
  ];

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className="app-sidebar"
      width={260}
      collapsedWidth={80}
    >
      <div className="sidebar-logo">
        <div className="logo-icon">
          <EnvironmentOutlined />
        </div>
        {!collapsed && <span className="logo-text">ГИС Обращения</span>}
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[getActiveKey()]}
        items={menuItems}
        className="sidebar-menu"
      />
      
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-footer-content">
            <span className="version-text">Версия 1.0.0</span>
          </div>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
