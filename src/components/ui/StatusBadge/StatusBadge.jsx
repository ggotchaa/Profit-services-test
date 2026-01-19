import { Tag as AntTag } from 'antd';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'В работе':
        return {
          color: 'processing',
          className: 'status-badge--in-progress',
        };
      case 'Решено':
        return {
          color: 'success',
          className: 'status-badge--resolved',
        };
      case 'Отклонено':
        return {
          color: 'error',
          className: 'status-badge--rejected',
        };
      default:
        return {
          color: 'default',
          className: 'status-badge--default',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <AntTag 
      color={config.color} 
      className={`status-badge ${config.className}`}
    >
      {status}
    </AntTag>
  );
};

export default StatusBadge;
