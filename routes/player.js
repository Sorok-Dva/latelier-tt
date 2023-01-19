const { Players } = require('../components');
const { HTTPValidation } = require('../middlewares');
const express = require('express');

const router = express.Router();

router
  .get('/', Players.List)
  .get('/id/:id', HTTPValidation.Player.Get, Players.Get)
  .get('/stats', Players.Stats)

module.exports = router;
