const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const apiRoute = require('../route/api');
const userRouter = require('../route/userRoutes');
const homeRouter = require('../route/home');
const errorMiddleware = require('../middleware/error-middleware');

const web = express();

web.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://code.jquery.com', 'https://stackpath.bootstrapcdn.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://stackpath.bootstrapcdn.com'],
      imgSrc: ["'self'", '*'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  }),
);

web.use(cors());
web.use(express.json());

web.set('view engine', 'ejs');
web.set('views', path.join(__dirname, '../views'));

web.use(express.static(path.join(__dirname, '../../public')));
web.use(express.static(path.join(__dirname, '../utils')));

web.get('/', (req, res) => {
  res.render('index', { title: 'Login' });
});

web.use(apiRoute);
web.use(userRouter);
web.use(homeRouter);
web.use(errorMiddleware);

module.exports = web;
