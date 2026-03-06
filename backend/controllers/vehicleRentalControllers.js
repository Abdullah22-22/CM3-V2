const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicles = await VehicleRental.find({}).sort({ createdAt: -1 });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve vehicles" });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  try {

    const user_id = req.user.id
    const {
      vehicleModel,
      category,
      description,
      agency,
      location,
      dailyPrice,
      bookingDeadline,
      insurancePolicy
    } = req.body;

    const vehicle = await VehicleRental.create({
      user_id,
      vehicleModel,
      category,
      description,
      agency,
      location,
      dailyPrice,
      bookingDeadline,
      insurancePolicy
    });

    return res.status(201).json({
      ok: true,
      data: vehicle
    })

  } catch (err) {
    return res.status(400).json({
      ok: false,
      message: "somting went wrong",
      error: err.message
    })
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {

  const { vehicleRentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ message: "Invalid vehicle ID" });
  }

  try {
    const vehicle = await VehicleRental.findById(vehicleRentalId);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to retrieve vehicle" });
  }
};


// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;
    const user_id = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      return res.status(404).json({ error: "Vehicle rental not found" });
    }
    const vehicleRental = await VehicleRental.findOneAndUpdate(
      { _id: vehicleRentalId, user_id },
      req.body,
      { new: true });

    if (!vehicleRental) {
      return res.status(404).json({ error: "Vehicle rental not found" });
    }
    res.status(200).json(vehicleRental);

  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;
  const user_id = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(404).json({ error: "Vehicle rental not found" });
  };
  try {
    const vehicleRental = await VehicleRental.findOneAndDelete({ _id: vehicleRentalId ,user_id});
    if (!vehicleRental) {
      return res.status(404).json({ error: "Vehicle rental not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};
