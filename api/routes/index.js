const express = require('express');
const router = express.Router();

const items = require('./items.js');
router.use('/todos', items);

module.exports = router;
