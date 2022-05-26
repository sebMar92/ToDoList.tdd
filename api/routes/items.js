const express = require('express');
const router = express.Router();
const getAll = require('../controllers/getAll.js');
const getById = require('../controllers/getById.js');
const create = require('../controllers/create.js');
const edit = require('../controllers/edit.js');
const deletion = require('../controllers/deletion.js');

router.get('', getAll);
router.get('/:id', getById);
router.post('', create);
router.put('/:id', edit);
router.delete('/:id', deletion);

module.exports = router;
