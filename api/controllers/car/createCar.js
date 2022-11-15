const mongoose = require("mongoose");
const {
  sendResponse,
  AppError,
  validateSchema,
} = require("../../../helpers/utils");
const Car = require("../../../models/Car");
const Joi = require('joi')

const requestSchema = Joi.object({
  make: Joi.string().trim().required(),
  model: Joi.string().trim().required(),
  release_date: Joi.number().required(),
  size: Joi.string().trim().required(),
  style: Joi.string().trim().required(),
  transmission_type: Joi.string().trim().required(),
  price: Joi.number().required(),
  page: Joi.number(),
});

const createCar = async (req, res, next) => {
  try {
    const info = validateSchema(requestSchema, req.body);
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");

    //mongoose query
    const created = await Car.create(info);
    sendResponse(res, 200, true, { created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

module.exports = { createCar };
