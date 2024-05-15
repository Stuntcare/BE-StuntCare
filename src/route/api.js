const express = require('express');
const mpasiController = require('../controller/mpasi-controller');
const artikelController = require('../controller/artikel-controller');

const userRouter = new express.Router();

// MPASI API
userRouter.post('/api/mpasi', mpasiController.createMpasi);
userRouter.get('/api/mpasi', mpasiController.getAllMpasi);
userRouter.get('/api/mpasi/:id', mpasiController.getMpasiById);
userRouter.put('/api/mpasi/:id', mpasiController.updateMpasi);
userRouter.delete('/api/mpasi/:id', mpasiController.deleteMpasi);

// Artikel API
userRouter.post('/api/artikel', artikelController.createArtikel);
userRouter.get('/api/artikel', artikelController.getAllArtikel);
userRouter.get('/api/artikel/:id', artikelController.getArtikelById);
userRouter.put('/api/artikel/:id', artikelController.updateArtikel);
userRouter.delete('/api/artikel/:id', artikelController.deleteArtikel);

module.exports = userRouter;
