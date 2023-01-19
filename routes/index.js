const express = require('express');

const playersRouter = require('./player');
const miscRouter = require('./misc');

const router = express.Router();

router.use('/players', playersRouter);
router.use('/', miscRouter);


module.exports = router;
