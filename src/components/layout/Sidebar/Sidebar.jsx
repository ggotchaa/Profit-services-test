import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TableOutlined, 
  EnvironmentOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed, activeKey, onMenuClick }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Главная',
    },
    {
      key: 'table',
      icon: <TableOutlined />,
      label: 'Таблица обращений',
    },
    {
      key: 'map',
      icon: <EnvironmentOutlined />,
      label: 'Карта',
    },
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: 'Статистика',
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Отчёты',
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
        selectedKeys={[activeKey]}
        items={menuItems}
        className="sidebar-menu"
        onClick={({ key }) => onMenuClick(key)}
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
