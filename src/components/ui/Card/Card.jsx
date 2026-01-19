import { Card as AntCard } from 'antd';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  extra, 
  hoverable = false,
  className = '',
  bodyStyle = {},
  ...props 
}) => {
  return (
    <AntCard
      title={title}
      extra={extra}
      hoverable={hoverable}
      className={`custom-card ${className}`}
      styles={{ body: bodyStyle }}
      {...props}
    >
      {children}
    </AntCard>
  );
};

export default Card;
