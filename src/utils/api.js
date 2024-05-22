/* eslint-disable no-undef */
/* eslint-disable no-console */
const axios = require('axios');

const fetchMpasiData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/mpasi', {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching MPASI data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error fetching MPASI data:', error.message);
    }
    throw new Error('Terjadi kesalahan saat mengambil data MPASI');
  }
};

module.exports = fetchMpasiData;
