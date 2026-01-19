import { useState, useEffect } from 'react';
import { Row, Col, Typography, Progress } from 'antd';
import { 
  PieChartOutlined, 
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { Card, StatCard } from '../../components/ui';
import { fetchAppeals, fetchStatistics } from '../../api';
import './StatisticsPage.css';

const { Title, Text } = Typography;

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, appealsData] = await Promise.all([
          fetchStatistics(),
          fetchAppeals(),
        ]);
        
        setStats(statsData);
        
        // Calculate category statistics
        const categoryCount = {};
        appealsData.forEach((appeal) => {
          if (!categoryCount[appeal.category]) {
            categoryCount[appeal.category] = { total: 0, resolved: 0 };
          }
          categoryCount[appeal.category].total++;
          if (appeal.status === 'Решено') {
            categoryCount[appeal.category].resolved++;
          }
        });
        
        const categoryArray = Object.entries(categoryCount).map(([name, data]) => ({
          name,
          total: data.total,
          resolved: data.resolved,
          percentage: Math.round((data.resolved / data.total) * 100),
        }));
        
        setCategoryStats(categoryArray);
      } catch (error) {
        console.error('Failed to load statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const resolvedPercentage = stats 
    ? Math.round((stats.resolved / stats.total) * 100) 
    : 0;

  const categoryColors = [
    '#667eea',
    '#48bb78',
    '#ecc94b',
    '#fc8181',
    '#9f7aea',
    '#38b2ac',
  ];

  return (
    <div className="statistics-page">
      <div className="page-header">
        <div className="header-content">
          <Title level={2} className="page-title">
            Статистика
          </Title>
          <Text className="page-subtitle">
            Аналитика и отчёты по обращениям граждан
          </Text>
        </div>
      </div>

      {/* Overview Stats */}
      <Row gutter={[24, 24]} className="overview-row">
        <Col xs={24} md={8}>
          <Card className="overview-card">
            <div className="overview-header">
              <PieChartOutlined className="overview-icon" />
              <Text className="overview-label">Процент решённых</Text>
            </div>
            <div className="overview-content">
              <Progress
                type="circle"
                percent={resolvedPercentage}
                size={140}
                strokeColor={{
                  '0%': '#667eea',
                  '100%': '#764ba2',
                }}
                trailColor="rgba(0, 0, 0, 0.06)"
                strokeWidth={10}
              />
            </div>
            <Text className="overview-description">
              {stats?.resolved || 0} из {stats?.total || 0} обращений решено
            </Text>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="overview-card">
            <div className="overview-header">
              <RiseOutlined className="overview-icon overview-icon--success" />
              <Text className="overview-label">Эффективность</Text>
            </div>
            <div className="efficiency-stats">
              <div className="efficiency-item">
                <span className="efficiency-value">{stats?.resolved || 0}</span>
                <span className="efficiency-label">Решено</span>
              </div>
              <div className="efficiency-divider"></div>
              <div className="efficiency-item">
                <span className="efficiency-value efficiency-value--warning">{stats?.inProgress || 0}</span>
                <span className="efficiency-label">В работе</span>
              </div>
              <div className="efficiency-divider"></div>
              <div className="efficiency-item">
                <span className="efficiency-value efficiency-value--danger">{stats?.rejected || 0}</span>
                <span className="efficiency-label">Отклонено</span>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="overview-card">
            <div className="overview-header">
              <BarChartOutlined className="overview-icon overview-icon--info" />
              <Text className="overview-label">Общая статистика</Text>
            </div>
            <div className="general-stats">
              <div className="general-stat-item">
                <span className="general-stat-label">Всего обращений</span>
                <span className="general-stat-value">{stats?.total || 0}</span>
              </div>
              <div className="general-stat-item">
                <span className="general-stat-label">Категорий</span>
                <span className="general-stat-value">{categoryStats.length}</span>
              </div>
              <div className="general-stat-item">
                <span className="general-stat-label">Средний % решения</span>
                <span className="general-stat-value">{resolvedPercentage}%</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Category Statistics */}
      <Row gutter={[24, 24]} className="category-row">
        <Col span={24}>
          <Card title="Статистика по категориям" className="category-card">
            <div className="category-list">
              {categoryStats.map((category, index) => (
                <div key={category.name} className="category-item">
                  <div className="category-info">
                    <div 
                      className="category-color"
                      style={{ background: categoryColors[index % categoryColors.length] }}
                    ></div>
                    <div className="category-details">
                      <span className="category-name">{category.name}</span>
                      <span className="category-count">
                        {category.resolved} из {category.total} решено
                      </span>
                    </div>
                  </div>
                  <div className="category-progress">
                    <Progress
                      percent={category.percentage}
                      strokeColor={categoryColors[index % categoryColors.length]}
                      trailColor="rgba(0, 0, 0, 0.06)"
                      size="small"
                      showInfo={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;
