import { Input as AntInput } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.css';

const SearchInput = ({ 
  placeholder = 'Поиск...', 
  value, 
  onChange, 
  onSearch,
  allowClear = true,
  size = 'large',
  className = '',
  ...props 
}) => {
  return (
    <AntInput.Search
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      allowClear={allowClear}
      size={size}
      prefix={<SearchOutlined className="search-icon" />}
      className={`custom-search-input ${className}`}
      enterButton={false}
      {...props}
    />
  );
};

export default SearchInput;
