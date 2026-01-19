import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <BrowserRouter>
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
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
