/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');
// const { fetchMpasiData } = require('../utils/api');
const router = express.Router();

router.get('/mpasi', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/mpasi', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const limit = parseInt(req.query.limit, 10) || 12;
    const { data } = response;
    console.log(data);

    res.render('home', {
      title: 'Home',
      data: data.data,
      pages: data.pages,
      page: data.page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching MPASI data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
