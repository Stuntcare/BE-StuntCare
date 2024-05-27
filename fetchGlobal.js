/* eslint-disable no-console */
const fetch = require('node-fetch');

fetch('https://app-000880c5-757a-4656-93cb-e5ffc3457eed.cleverapps.io/api/mpasi')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
