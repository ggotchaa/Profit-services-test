import { Button as AntButton } from 'antd';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'middle',
  icon,
  loading,
  disabled,
  onClick,
  className = '',
  ...props 
}) => {
  const getType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'danger':
        return 'primary';
      case 'ghost':
        return 'text';
      default:
        return 'default';
    }
  };

  return (
    <AntButton
      type={getType()}
      size={size}
      icon={icon}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={`custom-button custom-button--${variant} ${className}`}
      danger={variant === 'danger'}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
