const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('../route/api');
const errorMiddleware = require('../middleware/error-middleware');

const web = express();

web.use(helmet());
web.use(cors());
web.use(express.json());
web.use(userRouter);
web.use(errorMiddleware);

module.exports = web;
