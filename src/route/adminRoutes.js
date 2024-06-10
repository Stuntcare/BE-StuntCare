const express = require('express');
const MpasiSource = require('../data/mpasi-source');
const ArtikelSource = require('../data/artikel-source');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Login' });
});

router.get('/dashboard', async (req, res) => {
  try {
    const mpasi = await MpasiSource.getAllMpasi();
    const artikel = await ArtikelSource.getAllArtikel();
    res.render('dashboard', {
      title: 'Dashboard',
      MpasiTotal: mpasi.total,
      ArtikelTotal: artikel.total,
    });
  } catch (error) {
    res.status(500).send('Error Render dashboard data');
  }
});

router.get('/mpasi', async (req, res) => {
  try {
    const mpasi = await MpasiSource.getAllMpasi();
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
    res.status(500).send('Error fetching MPASI data');
  }
});

router.get('/artikel', async (req, res) => {
  try {
    const artikel = await ArtikelSource.getAllArtikel();
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
    res.status(500).send('Error fetching Artikel data');
  }
});

router.use((req, res) => {
  res.status(404).render('notfound', { title: 'Page Not Found' });
});

module.exports = router;
