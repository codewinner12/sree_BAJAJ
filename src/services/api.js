import axios from 'axios';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(API_URL);

    // Format the data to make it easier to work with
    const formattedData = response.data.map(doctor => {
      // Extract specialties from the API response (API uses 'specialities' with an 'i')
      const specialties = doctor.specialities?.map(s => s.name) || [];

      // Extract experience as a number for sorting
      const experienceMatch = doctor.experience?.match(/(\d+)/);
      const experienceYears = experienceMatch ? parseInt(experienceMatch[1]) : 0;

      // Extract fees as a number for sorting
      const feesMatch = doctor.fees?.match(/(\d+)/);
      const feesAmount = feesMatch ? parseInt(feesMatch[1]) : 0;

      return {
        ...doctor,
        specialties,
        experienceYears,
        feesAmount,
        consultationType: doctor.video_consult && doctor.in_clinic
          ? 'Both'
          : doctor.video_consult
            ? 'Video Consult'
            : 'In Clinic'
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};
