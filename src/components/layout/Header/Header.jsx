import { Layout, Avatar, Badge, Dropdown, Space, Typography } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ collapsed, onToggle }) => {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Настройки',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      danger: true,
    },
  ];

  return (
    <AntHeader className="app-header">
      <div className="header-left">
        <button 
          className="collapse-button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <div className="header-breadcrumb">
          <Text className="header-title">Панель управления обращениями</Text>
        </div>
      </div>
      
      <div className="header-right">
        <Badge count={5} size="small">
          <button className="header-icon-button">
            <BellOutlined />
          </button>
        </Badge>
        
        <Dropdown 
          menu={{ items: userMenuItems }} 
          placement="bottomRight"
          trigger={['click']}
        >
          <Space className="user-dropdown">
            <Avatar 
              size="default" 
              icon={<UserOutlined />}
              className="user-avatar"
            />
            <Text className="user-name">Администратор</Text>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
