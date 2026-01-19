import { Table, Space, Select, Row, Col } from 'antd';
import { EyeOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { StatusBadge, SearchInput, Button } from '../../ui';
import './AppealsTable.css';

const { Option } = Select;

const AppealsTable = ({
  appeals,
  loading,
  pagination,
  filters,
  onFiltersChange,
  onPageChange,
  onRowClick,
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => (
        <span className="id-cell">#{id}</span>
      ),
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 180,
      render: (category) => (
        <span className="category-cell">{category}</span>
      ),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <Space className="address-cell">
          <EnvironmentOutlined className="address-icon" />
          <span>{address}</span>
        </Space>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      render: (date) => (
        <Space className="date-cell">
          <CalendarOutlined className="date-icon" />
          <span>{new Date(date).toLocaleDateString('ru-RU')}</span>
        </Space>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button 
          variant="ghost" 
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onRowClick(record);
          }}
        >
          Открыть
        </Button>
      ),
    },
  ];

  const handleStatusChange = (value) => {
    onFiltersChange({ status: value });
  };

  const handleSearch = (e) => {
    onFiltersChange({ search: e.target.value });
  };

  return (
    <div className="appeals-table-container">
      <div className="table-filters">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              value={filters.status}
              onChange={handleStatusChange}
              className="status-filter"
              placeholder="Фильтр по статусу"
              size="large"
            >
              <Option value="all">Все статусы</Option>
              <Option value="В работе">В работе</Option>
              <Option value="Решено">Решено</Option>
              <Option value="Отклонено">Отклонено</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={10} lg={8}>
            <SearchInput
              placeholder="Поиск по категории или адресу..."
              value={filters.search}
              onChange={handleSearch}
            />
          </Col>
          <Col xs={24} md={6} lg={10}>
            <div className="table-info">
              <span className="total-count">
                Найдено: <strong>{pagination.total}</strong> обращений
              </span>
            </div>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={appeals}
        rowKey="id"
        loading={loading}
        className="appeals-table"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: onPageChange,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} из ${total}`,
        }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
          style: { cursor: 'pointer' },
        })}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default AppealsTable;
