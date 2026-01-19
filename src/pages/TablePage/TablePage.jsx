import { useState } from 'react';
import { Typography } from 'antd';
import { AppealsTable, AppealModal } from '../../components/features';
import { useAppeals } from '../../hooks';
import './TablePage.css';

const { Title, Text } = Typography;

const TablePage = () => {
  const { 
    appeals, 
    loading, 
    pagination, 
    filters, 
    updateFilters, 
    updatePage 
  } = useAppeals();
  
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (appeal) => {
    setSelectedAppeal(appeal);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppeal(null);
  };

  return (
    <div className="table-page">
      <div className="page-header">
        <div className="header-content">
          <Title level={2} className="page-title">
            Таблица обращений
          </Title>
          <Text className="page-subtitle">
            Полный список обращений с возможностью фильтрации и поиска
          </Text>
        </div>
      </div>

      <AppealsTable
        appeals={appeals}
        loading={loading}
        pagination={pagination}
        filters={filters}
        onFiltersChange={updateFilters}
        onPageChange={updatePage}
        onRowClick={handleRowClick}
      />

      <AppealModal
        appeal={selectedAppeal}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default TablePage;
