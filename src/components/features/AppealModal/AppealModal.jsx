import { Modal, Descriptions, Image, Space, Divider, Tag } from 'antd';
import { 
  EnvironmentOutlined, 
  CalendarOutlined, 
  FileTextOutlined,
  NumberOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { StatusBadge } from '../../ui';
import './AppealModal.css';

const AppealModal = ({ appeal, open, onClose }) => {
  if (!appeal) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      className="appeal-modal"
      centered
      title={
        <div className="modal-header">
          <div className="modal-header-left">
            <NumberOutlined className="header-icon" />
            <span className="modal-id">Обращение #{appeal.id}</span>
          </div>
          <StatusBadge status={appeal.status} />
        </div>
      }
    >
      <div className="modal-content">
        <div className="info-section">
          <div className="info-card">
            <TagOutlined className="info-icon" />
            <div className="info-details">
              <span className="info-label">Категория</span>
              <span className="info-value">{appeal.category}</span>
            </div>
          </div>
          
          <div className="info-card">
            <EnvironmentOutlined className="info-icon" />
            <div className="info-details">
              <span className="info-label">Адрес</span>
              <span className="info-value">{appeal.address}</span>
            </div>
          </div>
          
          <div className="info-card">
            <CalendarOutlined className="info-icon" />
            <div className="info-details">
              <span className="info-label">Дата регистрации</span>
              <span className="info-value">
                {new Date(appeal.created_at).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <Divider className="custom-divider" />

        <div className="description-section">
          <h4 className="section-title">
            <FileTextOutlined /> Описание
          </h4>
          <p className="description-text">{appeal.description}</p>
        </div>

        {appeal.photo && (
          <>
            <Divider className="custom-divider" />
            <div className="photo-section">
              <h4 className="section-title">Фотография</h4>
              <Image
                src={appeal.photo}
                alt="Фото обращения"
                className="appeal-photo"
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1..."
              />
            </div>
          </>
        )}

        <Divider className="custom-divider" />

        <div className="coordinates-section">
          <h4 className="section-title">
            <EnvironmentOutlined /> Координаты
          </h4>
          <div className="coordinates">
            <Tag color="blue" className="coordinate-tag">
              Широта: {appeal.latitude}
            </Tag>
            <Tag color="purple" className="coordinate-tag">
              Долгота: {appeal.longitude}
            </Tag>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AppealModal;
