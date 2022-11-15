const mongoose = require("mongoose");
const { sendResponse, validateSchema, AppError } = require("../../../helpers/utils");
const Car = require("../../../models/Car");
const Joi = require('joi')

const requestSchema = Joi.object({
  make: Joi.string().trim(),
  model: Joi.string().trim(),
  release_date: Joi.number(),
  size: Joi.string().trim(),
  style: Joi.string().trim(),
  transmission_type: Joi.string().trim(),
  price: Joi.number(),
});

const updateCar = async (req, res, next) => {
  try {
    const carId = req.params;
    const updateInfo = validateSchema(requestSchema, req.body);
    
    const findId = await Car.findById(carId.id)
    if (!findId) throw new AppError(404, "Not Found Car")

    await Car.findByIdAndUpdate(carId.id, updateInfo);
    
    const updated = await Car.findById(carId.id)
    sendResponse(res, 200, true, { updated }, null, "Update Car success");
  } catch (error) {
    next(error);
  }
};

module.exports = { updateCar };
