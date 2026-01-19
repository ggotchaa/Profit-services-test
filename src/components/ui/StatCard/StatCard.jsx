import { Statistic } from 'antd';
import './StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  suffix,
  className = '',
}) => {
  const colorClasses = {
    primary: 'stat-card--primary',
    success: 'stat-card--success',
    warning: 'stat-card--warning',
    danger: 'stat-card--danger',
  };

  return (
    <div className={`stat-card ${colorClasses[color]} ${className}`}>
      <div className="stat-card__icon">
        {icon}
      </div>
      <div className="stat-card__content">
        <Statistic 
          title={title} 
          value={value} 
          suffix={suffix}
          className="stat-card__statistic"
        />
      </div>
    </div>
  );
};

export default StatCard;
