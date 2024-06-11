/* eslint-disable no-undef */
/* eslint-disable no-console */

const createMpasi = async () => {
  const tambahDataForm = document.getElementById('tambahMpasiForm');
  const addCaraMasakButton = document.getElementById('addCaraMasakButton');
  const caraMasakContainer = document.getElementById('caraMasakContainer');
  const addBahanButton = document.getElementById('addBahanButton');
  const bahanContainer = document.getElementById('bahanContainer');

  const addInputGroup = (container, inputGroupHTML) => {
    container.insertAdjacentHTML('beforeend', inputGroupHTML);
    const newInputGroup = container.lastElementChild;
    const removeButton = newInputGroup.querySelector('.removeButton');

    removeButton.addEventListener('click', () => {
      container.removeChild(newInputGroup);
    });
  };

  if (addCaraMasakButton) {
    addCaraMasakButton.addEventListener('click', () => {
      const newInputGroupHTML = `
        <div class="input-group mb-2 caraMasakInput">
          <input type="text" class="form-control" name="caraMasak[]" placeholder="Masukkan cara memasak" required>
          <button type="button" class="btn btn-danger removeButton">×</button>
        </div>
      `;
      addInputGroup(caraMasakContainer, newInputGroupHTML);
    });
  }

  if (addBahanButton) {
    addBahanButton.addEventListener('click', () => {
      const newInputGroupHTML = `
        <div class="input-group mb-2 bahanInput">
          <input type="text" class="form-control" name="bahanKey[]" placeholder="Masukkan nama bahan" required>
          <input type="text" class="form-control" name="bahanValue[]" placeholder="Masukkan jumlah" required>
          <button type="button" class="btn btn-danger removeButton">×</button>
        </div>
      `;
      addInputGroup(bahanContainer, newInputGroupHTML);
    });
  }

  if (tambahDataForm) {
    tambahDataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const bahanKeys = document.getElementsByName('bahanKey[]');
        const bahanValues = document.getElementsByName('bahanValue[]');
        const bahan = {};
        for (let i = 0; i < bahanKeys.length; i += 1) {
          bahan[bahanKeys[i].value] = bahanValues[i].value;
        }

        const caraMasakInputs = document.getElementsByName('caraMasak[]');
        const caraMasak = Array.from(caraMasakInputs).map((input) => input.value);

        const mpasiData = {
          makanan: document.getElementById('inputMakanan').value,
          porsi: document.getElementById('inputPorsi').value,
          bahan,
          cara_masak: caraMasak,
          kategori: document.getElementById('inputKategori').value,
          gambar: document.getElementById('inputGambar').value,
          kalori: parseFloat(document.getElementById('inputKalori').value),
          protein: parseFloat(document.getElementById('inputProtein').value),
          lemak: parseFloat(document.getElementById('inputLemak').value),
          karbohidrat: parseFloat(document.getElementById('inputKarbohidrat').value),
        };

        console.log('Data yang dikirim:', mpasiData);
        const response = await fetch('/api/mpasi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mpasiData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error:', errorText);
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const result = await response.json();
        console.log('Data berhasil disimpan:', result);

        await Swal.fire({
          title: 'Berhasil!',
          text: 'Data MPASI berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan saat menyimpan data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
  }
};

const deleteMpasi = async (id) => {
  console.log('Delete Mpasi:', id);

  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data mpasi yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`/api/mpasi/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data mpasi berhasil dihapus.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menghapus data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

const updateMpasi = async (id) => {
  try {
    const getResponse = await fetch(`/api/mpasi/${id}`);
    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      console.error('Error:', errorText);
      throw new Error(`Network getResponse was not ok: ${errorText}`);
    }

    const mpasi = await getResponse.json();

    const bahanString = JSON.stringify(mpasi.data.bahan, null, 2);
    const cleanedBahanString = bahanString.replace(/\\/g, '').slice(1, -1);

    document.getElementById('editId').value = id;
    document.getElementById('editMakanan').value = mpasi.data.makanan;
    document.getElementById('editPorsi').value = mpasi.data.porsi;
    document.getElementById('editBahan').value = cleanedBahanString;
    document.getElementById('editKalori').value = mpasi.data.kalori;
    document.getElementById('editProtein').value = mpasi.data.protein;
    document.getElementById('editLemak').value = mpasi.data.lemak;
    document.getElementById('editKarbohidrat').value = mpasi.data.karbohidrat;
    document.getElementById('editKategori').value = mpasi.data.kategori;
    document.getElementById('editGambar').value = mpasi.data.gambar;

    const editCaraMasakContainer = document.getElementById('editCaraMasakContainer');
    const addEditCaraMasakButton = document.getElementById('addEditCaraMasakButton');
    editCaraMasakContainer.innerHTML = '';
    const masak = mpasi.data.cara_masak;

    masak.forEach((caraMasak) => {
      const inputGroup = document.createElement('div');
      inputGroup.className = 'input-group mb-2 editCaraMasakInput';
      inputGroup.innerHTML = `
        <input type="text" class="form-control" name="editCaraMasak[]" placeholder="Masukkan cara memasak" value="${caraMasak}" required>
        <button type="button" class="btn btn-danger removeEditCaraMasakButton">×</button>
      `;
      editCaraMasakContainer.appendChild(inputGroup);
      const removeButton = inputGroup.querySelector('.removeEditCaraMasakButton');
      removeButton.addEventListener('click', () => {
        editCaraMasakContainer.removeChild(inputGroup);
      });
    });

    if (addEditCaraMasakButton) {
      addEditCaraMasakButton.addEventListener('click', () => {
        const newInputGroupHTML = `
          <div class="input-group mb-2 editCaraMasakInput">
            <input type="text" class="form-control" name="editCaraMasak[]" placeholder="Masukkan cara memasak" required>
            <button type="button" class="btn btn-danger removeEditCaraMasakButton">×</button>
          </div>
        `;
        editCaraMasakContainer.insertAdjacentHTML('beforeend', newInputGroupHTML);
        const newInputGroup = editCaraMasakContainer.lastElementChild;
        const removeButton = newInputGroup.querySelector('.removeEditCaraMasakButton');
        removeButton.addEventListener('click', () => {
          editCaraMasakContainer.removeChild(newInputGroup);
        });
      });
    }

    const updateDataForm = document.getElementById('updateMpasiForm');
    if (updateDataForm) {
      updateDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
          const bahanContent = document.getElementById('editBahan').value;
          console.log('Bahan content before parsing:', bahanContent);

          let bahan;
          try {
            // Ensure the string is a valid JSON object by adding curly braces if not present
            if (!bahanContent.startsWith('{')) {
              bahan = JSON.parse(`{${bahanContent}}`);
            } else {
              bahan = JSON.parse(bahanContent);
            }
          } catch (parseError) {
            console.error('Error parsing bahan JSON:', parseError);
            Swal.fire({
              title: 'Error!',
              text: 'Format JSON pada bahan tidak valid.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }

          const caraMasakInputs = document.getElementsByName('editCaraMasak[]');
          const caraMasak = Array.from(caraMasakInputs).map((input) => input.value);

          const mpasiData = {
            makanan: document.getElementById('editMakanan').value,
            porsi: document.getElementById('editPorsi').value,
            bahan,
            cara_masak: caraMasak,
            kalori: parseFloat(document.getElementById('editKalori').value),
            protein: parseFloat(document.getElementById('editProtein').value),
            lemak: parseFloat(document.getElementById('editLemak').value),
            karbohidrat: parseFloat(document.getElementById('editKarbohidrat').value),
            kategori: document.getElementById('editKategori').value,
            gambar: document.getElementById('editGambar').value,
          };

          console.log(mpasiData);
          const response = await fetch(`/api/mpasi/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mpasiData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error(`Network response was not ok: ${errorText}`);
          }

          const result = await response.json();
          console.log('Data berhasil diupdate:', result);

          await Swal.fire({
            title: 'Berhasil!',
            text: 'Data mpasi berhasil diupdate.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Terjadi kesalahan saat mengupdate data.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const attachEventListeners = () => {
  const editButtons = document.querySelectorAll('#edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mpasiId = button.getAttribute('data-id');
      updateMpasi(mpasiId);
    });
  });

  const deleteButtons = document.querySelectorAll('#delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mpasiId = button.getAttribute('data-id');
      deleteMpasi(mpasiId);
    });
  });
};

const loadPageData = async (pageUrl) => {
  const mpasiListDiv = document.getElementById('mpasiList');
  try {
    const response = await fetch(pageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      mpasiListDiv.innerHTML = '';
      if (data.data.length > 0) {
        data.data.forEach((mpasi) => {
          const mpasiCard = `
          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${mpasi.gambar}" alt="${mpasi.makanan}" class="card-img-top skeleton-img" style="height: 150px; background-color: #e1e1e1; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${mpasi.makanan}</h5>
                <p class="card-text">${mpasi.kategori}</p>
                <div class="d-flex justify-content-center">
                  <button id="edit-button" class="btn button-tambah px-4 me-2" data-id="${mpasi.id}" data-bs-toggle="modal" data-bs-target="#editDataMpasi"><i class="bi bi-pencil"></i></button>
                  <button id="delete-button" class="btn px-4 btn-danger" data-id="${mpasi.id}"><i class="bi bi-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
          `;
          mpasiListDiv.innerHTML += mpasiCard;
        });
        attachEventListeners();
      } else {
        mpasiListDiv.innerHTML = `
        <div style="text-align: center;">
          <img src="/images/empty.webp" alt="Page not found image" style="display: block;max-width: 100%;margin-inline: auto;">
        </div>
    `;
      }
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
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

const search = async () => {
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyword = document.getElementById('searchKeyword').value;
      const searchUrl = `/api/mpasi?q=${keyword}`;
      await loadPageData(searchUrl);
    });
  }
};

const filter = async () => {
  const filterKategori = document.getElementById('filter-kategori');
  if (filterKategori) {
    filterKategori.addEventListener('change', async (e) => {
      const keyword = e.target.value;
      let filterUrl = '/api/mpasi';
      if (keyword !== 'semua') {
        filterUrl = `${filterUrl}?kategori=${keyword}`;
        // filterUrl = `${filterUrl}?limit=30,kategori=${keyword}`;
      }
      await loadPageData(filterUrl);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  createMpasi();
  attachEventListeners();
  search();
  filter();
  pagination();
});
