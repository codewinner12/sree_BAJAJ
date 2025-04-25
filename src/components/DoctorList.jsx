import DoctorCard from './DoctorCard';
import '../styles/DoctorList.css';

const DoctorList = ({ doctors, filters }) => {
  // Apply filters to the doctors list
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by search term
    if (filters.searchTerm && !doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by consultation type
    if (filters.consultationType) {
      if (filters.consultationType === 'Video Consult' && !doctor.video_consult) {
        return false;
      }
      if (filters.consultationType === 'In Clinic' && !doctor.in_clinic) {
        return false;
      }
    }

    // Filter by specialties
    if (filters.specialties.length > 0) {
      if (!doctor.specialties || !Array.isArray(doctor.specialties)) {
        return false;
      }

      const hasMatchingSpecialty = doctor.specialties.some(specialty =>
        filters.specialties.includes(specialty)
      );

      if (!hasMatchingSpecialty) {
        return false;
      }
    }

    return true;
  });

  // Sort the filtered doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (filters.sortBy === 'fees') {
      return a.feesAmount - b.feesAmount; // Sort by fees (ascending)
    } else if (filters.sortBy === 'experience') {
      return b.experienceYears - a.experienceYears; // Sort by experience (descending)
    }
    return 0;
  });

  return (
    <div className="doctor-list">
      {sortedDoctors.length > 0 ? (
        sortedDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      ) : (
        <div className="no-results">
          <p>No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
