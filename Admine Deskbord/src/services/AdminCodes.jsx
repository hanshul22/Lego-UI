import axios from 'axios';

export const getAdminCodes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:500/api/admin/codes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching codes:', error);
    throw error;
  }
};
