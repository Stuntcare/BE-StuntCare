/* eslint-disable no-undef */

const createArtikel = async () => {
  const tambahDataForm = document.getElementById('tambahArtikelForm');
  if (tambahDataForm) {
    tambahDataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const artikelData = {
          judul: document.getElementById('inputJudul').value,
          deskripsi: document.getElementById('inputDeskripsi').value,
          tanggal: document.getElementById('inputTanggal').value,
          sumber: document.getElementById('inputSumber').value,
          kategori: document.getElementById('inputKategori').value,
          gambar: document.getElementById('inputGambar').value,
        };

        const response = await fetch('/api/artikel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(artikelData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        await Swal.fire({
          title: 'Berhasil!',
          text: 'Data artikel berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan saat menyimpan data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
  }
};

const deleteArtikel = async (id) => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Anda tidak akan dapat mengembalikan data ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Tidak, batalkan',
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`/api/artikel/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data artikel berhasil dihapus.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menghapus data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

const updateArtikel = async (id) => {
  try {
    const getResponse = await fetch(`/api/artikel/${id}`);
    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      throw new Error(`Network getResponse was not ok: ${errorText}`);
    }

    const artikel = await getResponse.json();

    const formatTanggal = (tanggal) => {
      const date = new Date(tanggal);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formattedTanggal = formatTanggal(artikel.data.tanggal);

    document.getElementById('editJudul').value = artikel.data.judul;
    document.getElementById('editDeskripsi').value = artikel.data.deskripsi;
    document.getElementById('editTanggal').value = formattedTanggal;
    document.getElementById('editSumber').value = artikel.data.sumber;
    document.getElementById('editKategori').value = artikel.data.kategori;
    document.getElementById('editGambar').value = artikel.data.gambar;

    const editArtikelForm = document.getElementById('editArtikelForm');
    editArtikelForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const artikelData = {
          judul: document.getElementById('editJudul').value,
          deskripsi: document.getElementById('editDeskripsi').value,
          tanggal: document.getElementById('editTanggal').value,
          sumber: document.getElementById('editSumber').value,
          kategori: document.getElementById('editKategori').value,
          gambar: document.getElementById('editGambar').value,
        };

        const response = await fetch(`/api/artikel/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(artikelData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        await Swal.fire({
          title: 'Berhasil!',
          text: 'Data artikel berhasil diupdate.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan saat mengupdate data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan saat mengambil data.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

const attachEventListeners = () => {
  const deleteButtons = document.querySelectorAll('#delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const artikelId = button.getAttribute('data-id');
      deleteArtikel(artikelId);
    });
  });

  const editButtons = document.querySelectorAll('#edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const artikelId = button.getAttribute('data-id');
      updateArtikel(artikelId);
    });
  });
};

const loadPageData = async (pageUrl) => {
  const artikelListDiv = document.getElementById('artikelList');
  try {
    const response = await fetch(pageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (response.ok) {
      artikelListDiv.innerHTML = '';
      if (data.data.length > 0) {
        data.data.forEach((artikel) => {
          const artikelCard = `
          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${artikel.gambar}" alt="${artikel.judul}" class="card-img-top skeleton-img" style="height: 150px; background-color: #e1e1e1; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${artikel.judul}</h5>
                <p class="card-text">${artikel.kategori}</p>
                <div class="d-flex justify-content-center">
                  <button id="edit-button" class="btn px-4 btn-primary me-2" data-id="${artikel.id}" data-bs-toggle="modal" data-bs-target="#editArtikelModal"><i class="bi bi-pencil"></i></button>
                  <button id="delete-button" class="btn px-4 btn-danger" data-id="${artikel.id}"><i class="bi bi-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        `;
          artikelListDiv.innerHTML += artikelCard;
        });

        attachEventListeners();
      } else {
        artikelListDiv.innerHTML = `
        <div style="text-align: center;">
          <img src="/images/empty.webp" alt="Page not found image" style="display: block;max-width: 100%;margin-inline: auto;">
        </div>
        `;
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat memuat data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan saat memuat data.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

const pagination = async () => {
  const paginationDiv = document.getElementById('pagination');

  if (paginationDiv) {
    paginationDiv.addEventListener('click', async (event) => {
      if (event.target.classList.contains('pagination-button')) {
        event.preventDefault();
        const pageUrl = event.target.getAttribute('href');
        await loadPageData(pageUrl);
      }
    });
  }
};

const searchArtikel = async () => {
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyword = document.getElementById('searchKeyword').value;
      const searchUrl = `/api/artikel?q=${keyword}`;
      await loadPageData(searchUrl);
    });
  }
};

const filterArtikel = async () => {
  const filterKategori = document.getElementById('filter-kategori');
  if (filterKategori) {
    filterKategori.addEventListener('change', async (e) => {
      const keyword = e.target.value;
      let filterUrl = '/api/artikel';
      if (keyword !== 'semua') {
        filterUrl = `${filterUrl}?kategori=${keyword}`;
        // filterUrl = `${filterUrl}?limit=30,kategori=${keyword}`;
      }
      await loadPageData(filterUrl);
    });
  }
};

document.addEventListener('DOMContentLoaded', createArtikel);

document.addEventListener('DOMContentLoaded', () => {
  attachEventListeners();
  searchArtikel();
  filterArtikel();
  pagination();
});
