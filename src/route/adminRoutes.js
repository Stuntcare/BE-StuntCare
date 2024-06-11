/* eslint-disable no-undef */
const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'http://localhost:3000';

router.get('/', (req, res) => {
  res.render('index', { title: 'Login' });
});

router.get('/dashboard', async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      await Swal.fire({
        title: 'Gagal Masuk !',
        text: 'Tidak memiliki access token',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      res.redirect('/');
    }

    const mpasiApi = await axios.get(`${BASE_URL}/api/mpasi`);
    const artikelApi = await axios.get(`${BASE_URL}/api/artikel`);
    const mpasi = mpasiApi.data;
    const artikel = artikelApi.data;
    res.render('dashboard', {
      title: 'Dashboard',
      MpasiTotal: mpasi.total,
      ArtikelTotal: artikel.total,
    });
  } catch (error) {
    res.status(500).send('Error Render dashboard data, No Access Token');
  }
});

router.get('/mpasi', async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      await Swal.fire({
        title: 'Gagal Masuk !',
        text: 'Tidak memiliki access token',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      res.redirect('/');
    }

    const mpasiApi = await axios.get(`${BASE_URL}/api/mpasi`);
    const mpasi = mpasiApi.data;
    const limit = parseInt(req.query.limit, 10) || 12;
    res.render('mpasi', {
      title: 'Mpasi',
      total: mpasi.total,
      data: mpasi.data,
      pages: mpasi.pages,
      page: mpasi.page,
      limit,
    });
  } catch (error) {
    res.status(500).send('Error fetching MPASI data, No Access Token');
  }
});

router.get('/artikel', async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      await Swal.fire({
        title: 'Gagal Masuk !',
        text: 'Tidak memiliki access token',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      res.redirect('/');
    }

    const artikelApi = await axios.get(`${BASE_URL}/api/artikel`);
    const artikel = artikelApi.data;
    const limit = parseInt(req.query.limit, 10) || 12;
    res.render('artikel', {
      title: 'Artikel',
      total: artikel.total,
      data: artikel.data,
      pages: artikel.pages,
      page: artikel.page,
      limit,
    });
  } catch (error) {
    res.status(500).send('Error fetching Artikel data, No Access Token');
  }
});

router.use((req, res) => {
  res.status(404).render('notfound', { title: 'Page Not Found' });
});

module.exports = router;
