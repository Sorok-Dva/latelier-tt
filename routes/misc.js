const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome on L’Atelier API.')
})

module.exports = router;
