const express = require('express');
const router = express.Router();
const getAll = require('../controllers/getAll.js');
const getById = require('../controllers/getById.js');
const create = require('../controllers/create.js');
const edit = require('../controllers/edit.js');
const deleteOne = require('../controllers/deleteOne.js');
const deleteIAllItems = require('../controllers/deleteAll.js');

router.get('', getAll);
router.get('/:id', getById);
router.post('', create);
router.put('/:id', edit);
router.delete('/:id', deleteOne);
router.delete('/', deleteIAllItems);

module.exports = router;
