import '../styles/DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="doctor-info">
        <div className="doctor-avatar">
          <img src={doctor.photo || 'https://via.placeholder.com/80'} alt={doctor.name} />
        </div>
        <div className="doctor-details">
          <h3 className="doctor-name" data-testid="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialty" data-testid="doctor-specialty">
            {Array.isArray(doctor.specialties)
              ? doctor.specialties.join(', ')
              : doctor.specialties || 'General Physician'}
          </p>
          <p className="doctor-experience" data-testid="doctor-experience">
            {doctor.experience}
          </p>
          <p className="doctor-location">
            {doctor.clinic?.address?.locality || 'Not specified'}
          </p>
        </div>
      </div>
      <div className="doctor-fee-section">
        <p className="doctor-fee" data-testid="doctor-fee">{doctor.fees}</p>
        <button className="book-appointment">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
