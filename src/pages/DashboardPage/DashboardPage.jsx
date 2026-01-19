import { Row, Col, Typography } from 'antd';
import { 
  FileTextOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
} from '@ant-design/icons';
import { StatCard, Card } from '../../components/ui';
import { AppealsMap, AppealsTable, AppealModal } from '../../components/features';
import { useAppeals, useStatistics } from '../../hooks';
import { useState, useEffect } from 'react';
import { fetchAppeals } from '../../api';
import './DashboardPage.css';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const { stats, loading: statsLoading } = useStatistics();
  const { 
    appeals, 
    loading, 
    pagination, 
    filters, 
    updateFilters, 
    updatePage 
  } = useAppeals();
  
  const [allAppeals, setAllAppeals] = useState([]);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadAllAppeals = async () => {
      const data = await fetchAppeals();
      setAllAppeals(data);
    };
    loadAllAppeals();
  }, []);

  const handleRowClick = (appeal) => {
    setSelectedAppeal(appeal);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppeal(null);
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="header-content">
          <Title level={2} className="page-title">
            Добро пожаловать!
          </Title>
          <Text className="page-subtitle">
            Панель управления обращениями граждан
          </Text>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Всего обращений"
            value={stats?.total || 0}
            icon={<FileTextOutlined />}
            color="primary"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="В работе"
            value={stats?.inProgress || 0}
            icon={<ClockCircleOutlined />}
            color="warning"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Решено"
            value={stats?.resolved || 0}
            icon={<CheckCircleOutlined />}
            color="success"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Отклонено"
            value={stats?.rejected || 0}
            icon={<CloseCircleOutlined />}
            color="danger"
          />
        </Col>
      </Row>

      {/* Map and Recent Appeals */}
      <Row gutter={[24, 24]} className="content-row">
        <Col xs={24} lg={14}>
          <div className="map-section">
            <AppealsMap 
              appeals={allAppeals} 
              onMarkerClick={handleRowClick}
            />
          </div>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Последние обращения" className="recent-appeals-card">
            <div className="recent-appeals-list">
              {allAppeals.slice(0, 5).map((appeal) => (
                <div 
                  key={appeal.id} 
                  className="recent-appeal-item"
                  onClick={() => handleRowClick(appeal)}
                >
                  <div className="appeal-info">
                    <span className="appeal-id">#{appeal.id}</span>
                    <span className="appeal-category">{appeal.category}</span>
                  </div>
                  <div className="appeal-meta">
                    <span className="appeal-address">{appeal.address}</span>
                    <span className="appeal-date">
                      {new Date(appeal.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Appeals Table */}
      <Row gutter={[24, 24]} className="table-row">
        <Col span={24}>
          <AppealsTable
            appeals={appeals}
            loading={loading}
            pagination={pagination}
            filters={filters}
            onFiltersChange={updateFilters}
            onPageChange={updatePage}
            onRowClick={handleRowClick}
          />
        </Col>
      </Row>

      {/* Appeal Detail Modal */}
      <AppealModal
        appeal={selectedAppeal}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default DashboardPage;
