import { useState, useEffect, useCallback } from 'react';
import { fetchAppealsWithFilters, fetchStatistics } from '../api';

export const useAppeals = (initialFilters = {}) => {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    ...initialFilters,
  });

  const loadAppeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchAppealsWithFilters({
        status: filters.status,
        search: filters.search,
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      
      setAppeals(result.data);
      setPagination(prev => ({
        ...prev,
        total: result.total,
        totalPages: result.totalPages,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    loadAppeals();
  }, [loadAppeals]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const updatePage = useCallback((page) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const refresh = useCallback(() => {
    loadAppeals();
  }, [loadAppeals]);

  return {
    appeals,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updatePage,
    refresh,
  };
};

export const useStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStatistics();
        setStats(data);
      } catch (err) {
        console.error('Failed to load statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);

  return { stats, loading };
};
