import { useState, useEffect } from 'react';
import '../styles/FilterPanel.css';

// List of all required specialties from the requirements
const REQUIRED_SPECIALTIES = [
  'General Physician',
  'Dentist',
  'Dermatologist',
  'Paediatrician',
  'Gynaecologist',
  'ENT',
  'Diabetologist',
  'Cardiologist',
  'Physiotherapist',
  'Endocrinologist',
  'Orthopaedic',
  'Ophthalmologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Psychiatrist',
  'Urologist',
  'Dietitian/Nutritionist',
  'Psychologist',
  'Sexologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ayurveda',
  'Homeopath'
];

const FilterPanel = ({ doctors, filters, onFilterChange }) => {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    // Extract unique specialties from doctors data
    if (doctors.length > 0) {
      const allSpecialties = doctors.reduce((acc, doctor) => {
        if (doctor.specialties && Array.isArray(doctor.specialties)) {
          doctor.specialties.forEach(specialty => {
            if (!acc.includes(specialty)) {
              acc.push(specialty);
            }
          });
        }
        return acc;
      }, []);

      // Combine API specialties with required specialties
      const combinedSpecialties = [...new Set([...allSpecialties, ...REQUIRED_SPECIALTIES])];
      setSpecialties(combinedSpecialties.sort());
    }
  }, [doctors]);

  const handleConsultationTypeChange = (type) => {
    onFilterChange({ ...filters, consultationType: type });
  };

  const handleSpecialtyChange = (specialty) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];

    onFilterChange({ ...filters, specialties: updatedSpecialties });
  };

  const handleSortChange = (sortOption) => {
    onFilterChange({ ...filters, sortBy: sortOption });
  };

  const clearAllFilters = () => {
    onFilterChange({
      ...filters,
      consultationType: '',
      specialties: [],
      sortBy: ''
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="clear-all" onClick={clearAllFilters}>Clear All</button>
      </div>

      {/* Sort Options */}
      <div className="filter-section">
        <h4 data-testid="filter-header-sort">Sort By</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              data-testid="sort-fees"
            />
            <span>Price: Low-High</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              data-testid="sort-experience"
            />
            <span>Experience: Most Experience first</span>
          </label>
        </div>
      </div>

      {/* Consultation Type */}
      <div className="filter-section">
        <h4 data-testid="filter-header-moc">Mode of Consultation</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationTypeChange('Video Consult')}
              data-testid="filter-video-consult"
            />
            <span>Video Consultation</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationTypeChange('In Clinic')}
              data-testid="filter-in-clinic"
            />
            <span>In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties */}
      <div className="filter-section">
        <h4 data-testid="filter-header-speciality">Specialties</h4>
        <div className="filter-options specialties-list">
          {REQUIRED_SPECIALTIES.map(specialty => (
            <label key={specialty} className="filter-option">
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                data-testid={`filter-specialty-${specialty.replace(/\//g, '-')}`}
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
