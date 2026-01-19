import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { StatusBadge } from '../../ui';
import './AppealsMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (status) => {
  const colors = {
    'В работе': '#667eea',
    'Решено': '#48bb78',
    'Отклонено': '#fc8181',
  };
  
  const color = colors[status] || '#667eea';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pin" style="background: ${color}">
        <div class="marker-inner"></div>
      </div>
      <div class="marker-pulse" style="background: ${color}"></div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
};

const FitBounds = ({ appeals }) => {
  const map = useMap();
  
  useEffect(() => {
    if (appeals.length > 0) {
      const bounds = appeals.map(a => [a.latitude, a.longitude]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [appeals, map]);
  
  return null;
};

const AppealsMap = ({ appeals, onMarkerClick, selectedAppeal }) => {
  const mapRef = useRef(null);
  
  const defaultCenter = [53.2205, 63.6283];
  const defaultZoom = 13;

  return (
    <div className="appeals-map-container">
      <div className="map-header">
        <h3 className="map-title">Карта обращений</h3>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot legend-dot--in-progress"></span>
            <span>В работе</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot--resolved"></span>
            <span>Решено</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot--rejected"></span>
            <span>Отклонено</span>
          </div>
        </div>
      </div>
      
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="appeals-map"
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {appeals.length > 0 && <FitBounds appeals={appeals} />}
        
        {appeals.map((appeal) => (
          <Marker
            key={appeal.id}
            position={[appeal.latitude, appeal.longitude]}
            icon={createCustomIcon(appeal.status)}
            eventHandlers={{
              click: () => onMarkerClick,
            }}
          >
            <Popup className="custom-popup">
              <div className="popup-content">
                <div className="popup-header">
                  <span className="popup-id">#{appeal.id}</span>
                  <StatusBadge status={appeal.status} />
                </div>
                <h4 className="popup-category">{appeal.category}</h4>
                <p className="popup-address">{appeal.address}</p>
                <p className="popup-date">
                  {new Date(appeal.created_at).toLocaleDateString('ru-RU')}
                </p>
                <button 
                  className="popup-button"
                  onClick={() => onMarkerClick && onMarkerClick(appeal)}
                >
                  Подробнее
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AppealsMap;
