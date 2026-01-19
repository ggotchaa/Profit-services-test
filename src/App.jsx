import { useState } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { MainLayout } from './components/layout';
import { 
  DashboardPage, 
  TablePage, 
  MapPage, 
  StatisticsPage, 
  ReportsPage 
} from './pages';
import './App.css';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [activeKey, setActiveKey] = useState('dashboard');

  const handleMenuClick = (key) => {
    setActiveKey(key);
  };

  const renderPage = () => {
    switch (activeKey) {
      case 'dashboard':
        return <DashboardPage />;
      case 'table':
        return <TablePage />;
      case 'map':
        return <MapPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#667eea',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Table: {
            headerBg: 'transparent',
            rowHoverBg: 'rgba(102, 126, 234, 0.04)',
          },
          Modal: {
            borderRadiusLG: 20,
          },
        },
      }}
    >
      <MainLayout activeKey={activeKey} onMenuClick={handleMenuClick}>
        {renderPage()}
      </MainLayout>
    </ConfigProvider>
  );
};

export default App;
