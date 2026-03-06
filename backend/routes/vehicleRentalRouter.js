const express = require('express');
const router = express.Router();

const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');

const protect = require('../middleware/protect');

// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);

// POST /api/vehicleRentals
router.post('/', protect, createVehicleRental);

// GET /api/vehicleRentals/:vehicleRentalId
router.get('/:vehicleRentalId', getVehicleRentalById);

// PUT /api/vehicleRentals/:vehicleRentalId
router.put('/:vehicleRentalId', protect, updateVehicleRental);

// DELETE /api/vehicleRentals/:vehicleRentalId
router.delete('/:vehicleRentalId', protect, deleteVehicleRental);

module.exports = router;