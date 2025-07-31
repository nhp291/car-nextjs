const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getCarsByBrand,
  getCarStats
} = require('../controllers/carController');

// Public routes
router.get('/', getAllCars);
router.get('/stats', getCarStats);
router.get('/brand/:brand', getCarsByBrand);
router.get('/:id', getCarById);

// Protected routes (require authentication)
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router; 