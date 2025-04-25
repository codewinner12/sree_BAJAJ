import { useState, useEffect, useRef } from 'react';
import '../styles/Autocomplete.css';

const Autocomplete = ({ doctors, onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 3); // Show only top 3 matches

    setSuggestions(filteredDoctors);
  }, [inputValue, doctors]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (doctorName) => {
    setInputValue(doctorName);
    setShowSuggestions(false);
    onSearch(doctorName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete-container" ref={inputRef}>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search Symptoms, Doctors, Specialties, Clinics"
            className="autocomplete-input"
            data-testid="autocomplete-input"
          />
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doctor) => (
            <li
              key={doctor.id}
              onClick={() => handleSelectSuggestion(doctor.name)}
              data-testid="suggestion-item"
              className="suggestion-item"
            >
              {doctor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
