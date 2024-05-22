/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  const paginationDiv = document.getElementById('pagination');

  if (paginationDiv) {
    paginationDiv.addEventListener('click', async (event) => {
      if (event.target.classList.contains('pagination-button')) {
        event.preventDefault();

        const pageUrl = event.target.getAttribute('href');
        const token = localStorage.getItem('token');

        try {
          const response = await fetch(pageUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();

          if (response.ok) {
            const mpasiListDiv = document.getElementById('mpasiList');
            mpasiListDiv.innerHTML = '';

            if (Array.isArray(data.data)) {
              data.data.forEach((mpasi) => {
                const mpasiItem = document.createElement('div');
                mpasiItem.classList.add('mpasi-item');
                mpasiItem.innerHTML = `
                    <img src="${mpasi.gambar}" alt="${mpasi.makanan}">
                    <h3>${mpasi.makanan}</h3>
                    <p>Kategori: ${mpasi.kategori}</p>
                  `;
                mpasiListDiv.appendChild(mpasiItem);
              });
            } else {
              console.error('Data received is not an array:', data.data);
            }

            const nextPageLink = paginationDiv.querySelector('.next-page');
            const prevPageLink = paginationDiv.querySelector('.prev-page');

            if (nextPageLink) {
              nextPageLink.setAttribute('href', data.nextPageUrl);
            }

            if (prevPageLink) {
              prevPageLink.setAttribute('href', data.prevPageUrl);
            }
          } else {
            console.error('Error fetching page data:', data);
          }
        } catch (error) {
          console.error('Error fetching page data:', error);
        }
      }
    });
  }
});
