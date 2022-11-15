const express = require('express');
const { getCars } = require('../api/controllers/car/getCars');
const { createCar } = require('../api/controllers/car/createCar');
const { updateCar } = require('../api/controllers/car/updateCar');
const { deleteCar } = require('../api/controllers/car/deleteCar');
const router = express.Router();

// CREATE
router.post('/', createCar);

// READ
router.get('/', getCars);

// UPDATE
router.put('/:id', updateCar);

// // DELETE
router.delete('/:id', deleteCar);

module.exports = router;
