/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', () => {
  const addEventListenersToButtons = () => {
    document.querySelectorAll('.btn-danger[data-id]').forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.currentTarget.getAttribute('data-id');

        Swal.fire({
          title: 'Apakah Anda yakin?',
          text: 'Anda tidak dapat mengembalikan data yang telah dihapus!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal',
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`/api/mpasi/${id}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (!response.ok) {
                  return response.text().then((text) => { throw new Error(text); });
                }
                return response.json();
              })
              // eslint-disable-next-line no-unused-vars
              .then((result) => {
                Swal.fire(
                  'Dihapus!',
                  'Data telah dihapus.',
                  'success',
                ).then(() => {
                  window.location.reload();
                });
              })
              .catch((error) => {
                Swal.fire(
                  'Gagal!',
                  'Terjadi kesalahan saat menghapus data.',
                  'error',
                );
                console.error('Error:', error);
              });
          }
        });
      });
    });
  };

  const paginationDiv = document.getElementById('pagination');
  const mpasiListDiv = document.getElementById('mpasiList');

  if (paginationDiv) {
    paginationDiv.addEventListener('click', async (event) => {
      if (event.target.classList.contains('pagination-button')) {
        event.preventDefault();

        const pageUrl = event.target.getAttribute('href');

        try {
          const response = await fetch(pageUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();

          if (response.ok) {
            // Hapus semua kartu yang ada
            mpasiListDiv.innerHTML = '';

            if (Array.isArray(data.data)) {
              // Buat kartu-kartu baru berdasarkan data yang diperoleh dari respons API
              data.data.forEach((mpasi) => {
                const mpasiItem = document.createElement('div');
                mpasiItem.classList.add('col-12', 'col-md-6', 'col-lg-3', 'mb-4');
                mpasiItem.innerHTML = `
                  <div class="card" style="width: 100%;">
                      <img src="${mpasi.gambar}" alt="${mpasi.makanan}" class="card-img-top skeleton-img" style="height: 150px;  background-color: #e1e1e1; object-fit: cover;">
                      <div class="card-body">
                          <h5 class="card-title">${mpasi.makanan}</h5>
                          <p class="card-text">${mpasi.kategori}</p>
                          <div class="d-flex justify-content-center">
                          <button type="button" class="btn btn-primary px-4 me-2" data-bs-toggle="modal" data-bs-target="#editDataModal" data-id="${mpasi.id}"><i class="bi bi-pencil"></i></button>
                          <button class="btn px-4 btn-danger" data-id="${mpasi.id}"><i class="bi bi-trash"></i></button>
                      </div>
                  </div>
                `;
                mpasiListDiv.appendChild(mpasiItem);
              });
              addEventListenersToButtons();
            } else {
              console.error('Data received is not an array:', data.data);
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

  // Initial call to add event listeners to the existing buttons
  addEventListenersToButtons();
});
