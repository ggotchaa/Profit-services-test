import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { AppealsMap, AppealModal } from '../../components/features';
import { fetchAppeals } from '../../api';
import './MapPage.css';

const { Title, Text } = Typography;

const MapPage = () => {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadAppeals = async () => {
      try {
        const data = await fetchAppeals();
        setAppeals(data);
      } catch (error) {
        console.error('Failed to load appeals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAppeals();
  }, []);

  const handleMarkerClick = (appeal) => {
    setSelectedAppeal(appeal);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppeal(null);
  };

  return (
    <div className="map-page">
      <div className="page-header">
        <div className="header-content">
          <Title level={2} className="page-title">
            Карта обращений
          </Title>
          <Text className="page-subtitle">
            Интерактивная карта с отображением всех обращений
          </Text>
        </div>
      </div>

      <div className="map-container-full">
        <AppealsMap 
          appeals={appeals} 
          onMarkerClick={handleMarkerClick}
          selectedAppeal={selectedAppeal}
        />
      </div>

      <AppealModal
        appeal={selectedAppeal}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default MapPage;
