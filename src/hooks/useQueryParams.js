import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryParams = (filters, setFilters) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.searchTerm) {
      params.set('search', filters.searchTerm);
    }
    
    if (filters.consultationType) {
      params.set('consultationType', filters.consultationType);
    }
    
    if (filters.specialties.length > 0) {
      params.set('specialties', filters.specialties.join(','));
    }
    
    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
    }
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Initialize filters from URL on mount
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const consultationType = searchParams.get('consultationType') || '';
    const specialtiesParam = searchParams.get('specialties') || '';
    const specialties = specialtiesParam ? specialtiesParam.split(',') : [];
    const sortBy = searchParams.get('sortBy') || '';

    setFilters(prev => ({
      ...prev,
      searchTerm: search,
      consultationType,
      specialties,
      sortBy
    }));
  }, [searchParams, setFilters]);
};
