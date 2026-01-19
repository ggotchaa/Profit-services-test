import { Typography } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { Card } from '../../components/ui';
import './ReportsPage.css';

const { Title, Text } = Typography;

const ReportsPage = () => {
  const reports = [
    { 
      id: 1, 
      name: 'Отчёт за неделю', 
      date: '13.01.2026 - 19.01.2026',
      description: 'Сводка по всем обращениям за текущую неделю'
    },
    { 
      id: 2, 
      name: 'Отчёт за месяц', 
      date: '01.01.2026 - 31.01.2026',
      description: 'Ежемесячный отчёт по обращениям'
    },
    { 
      id: 3, 
      name: 'Годовой отчёт', 
      date: '01.01.2025 - 31.12.2025',
      description: 'Годовая статистика обращений'
    },
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="header-content">
          <Title level={2} className="page-title">
            Отчёты
          </Title>
          <Text className="page-subtitle">
            Генерация и просмотр отчётов по обращениям
          </Text>
        </div>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <Card 
            key={report.id} 
            hoverable 
            className="report-card"
          >
            <div className="report-icon">
              <FileTextOutlined />
            </div>
            <div className="report-content">
              <h3 className="report-name">{report.name}</h3>
              <p className="report-date">{report.date}</p>
              <p className="report-description">{report.description}</p>
            </div>
            <button className="report-button">
              Скачать PDF
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
