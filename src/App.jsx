import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Autocomplete from './components/Autocomplete';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { fetchDoctors } from './services/api';
import { useQueryParams } from './hooks/useQueryParams';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  // Custom hook to handle URL query parameters
  useQueryParams(filters, setFilters);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors. Please try again later.');
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <header className="app-header">
        <Autocomplete doctors={doctors} onSearch={handleSearch} />
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading">Loading doctors...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="content">
            <aside className="sidebar">
              <FilterPanel
                doctors={doctors}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>
            <section className="main-content">
              <DoctorList doctors={doctors} filters={filters} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

// Wrap the App component with BrowserRouter
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
