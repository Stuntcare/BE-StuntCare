/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://stuntcare.cleverapps.io';

// function getAccessToken() {
//   return localStorage.getItem('accessToken');
// }

// function putAccessToken(token) {
//   localStorage.setItem('accessToken', token);
// }

// async function fetchWithAuth(url, options = {}) {
//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${getAccessToken()}`,
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText);
//   }

//   return response.json();
// }

// const fetchDashboardData = async () => {
//   try {
//     const response = await fetchWithAuth(`${BASE_URL}/dashboard`);
//     const data = await response.json();
//     console.log(response);
//     console.log(data);
//     if (response.ok) {
//       console.log(data);
//     } else {
//       console.error('Failed to fetch dashboard data:', data.message);
//       alert('Gagal memuat data dashboard');
//     }
//   } catch (error) {
//     alert(error);
//     // alert('Terjadi kesalahan saat memuat data dashboard.');
//   }
// };

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 60 * 1000;

async function login(email, password) {
  try {
    const lockedUntil = localStorage.getItem('loginLockedUntil');
    if (lockedUntil && Date.now() < parseInt(lockedUntil, 10)) {
      const remainingTime = Math.ceil((parseInt(lockedUntil, 10) - Date.now()) / 1000);
      Swal.fire({
        title: 'Login Gagal',
        text: `Anda telah mencoba login terlalu banyak. Silakan coba lagi dalam ${remainingTime} detik.`,
        icon: 'error',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { message } = responseJson;

    if (message !== 'Berhasil login') {
      throw new Error();
    }

    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('loginLockedUntil');

    await Swal.fire({
      title: 'Berhasil Login',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    window.location.href = '/dashboard';
  } catch (error) {
    let loginAttempts = parseInt(localStorage.getItem('loginAttempts'), 10) || 0;
    loginAttempts += 1;
    localStorage.setItem('loginAttempts', loginAttempts);

    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = Date.now() + LOCKOUT_DURATION;
      localStorage.setItem('loginLockedUntil', lockedUntil);
      Swal.fire({
        title: 'Login Gagal',
        text: 'Anda telah mencoba login terlalu banyak. Silakan coba lagi dalam 1 menit.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Gagal Login !',
        text: 'Email atau password tidak sesuai',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
        alert('Email dan password harus diisi.');
        return;
      }

      await login(email, password);
    });
  }
});
