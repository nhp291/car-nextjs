const Car = require('../models/Car');
const { asyncHandler } = require('../middleware/validation');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../middleware/logger');


const getAllCars = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, brand, fuelType, minPrice, maxPrice } = req.query;
  
  // Build filter object
  const filter = {};
  if (search) {
    filter.$text = { $search: search };
  }
  if (brand) {
    filter.brand = { $regex: brand, $options: 'i' };
  }
  if (fuelType) {
    filter.fuelType = fuelType;
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const cars = await Car.find(filter)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Car.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      cars,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        total,
        limit: Number(limit)
      }
    }
  });
});

const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  
  if (!car) {
    throw new AppError('Car not found', 404);
  }

  res.status(200).json({
    success: true,
    data: car
  });
});

const createCar = asyncHandler(async (req, res) => {
  const car = await Car.create(req.body);
  
  logger.info(`Car created: ${car._id} by user: ${req.user?.id}`);
  
  res.status(201).json({
    success: true,
    data: car
  });
});

const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!car) {
    throw new AppError('Car not found', 404);
  }

  logger.info(`Car updated: ${car._id} by user: ${req.user?.id}`);
  
  res.status(200).json({
    success: true,
    data: car
  });
});

const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  
  if (!car) {
    throw new AppError('Car not found', 404);
  }

  logger.info(`Car deleted: ${car._id} by user: ${req.user?.id}`);
  
  res.status(200).json({
    success: true,
    message: 'Car deleted successfully'
  });
});

const getCarsByBrand = asyncHandler(async (req, res) => {
  const cars = await Car.find({ 
    brand: { $regex: req.params.brand, $options: 'i' } 
  });

  res.status(200).json({
    success: true,
    count: cars.length,
    data: cars
  });
});

const getCarStats = asyncHandler(async (req, res) => {
  const stats = await Car.aggregate([
    {
      $group: {
        _id: null,
        totalCars: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    }
  ]);

  const brandStats = await Car.aggregate([
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 },
        avgPrice: { $avg: '$price' }
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      overall: stats[0] || {},
      byBrand: brandStats
    }
  });
});

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getCarsByBrand,
  getCarStats
}; 