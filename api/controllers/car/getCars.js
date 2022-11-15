const mongoose = require("mongoose");
const Car = require("../../../models/Car");
var createError = require("http-errors");
const { sendResponse, AppError, validateSchema } = require("../../../helpers/utils");
const Joi = require('joi')

const requestSchema = Joi.object({
  make: Joi.string().trim(),
  model: Joi.string().trim(),
  year: Joi.string().trim(),
  vehicle_size: Joi.string().trim(),
  vehicle_style: Joi.string().trim(),
  page: Joi.string(),
  limit: Joi.string()
});

const getCars = async (req, res, next) => {

  try {
    const filter = validateSchema(requestSchema, req.query)
    if (filter.page > 20) throw new AppError(404, "Not Found Page")

    console.log(filter)
    //mongoose query
    const listOfFound = await Car.find(filter);
    sendResponse(
      res,
      200,
      true,
      {
        cars: listOfFound.slice(0, filter.limit || 10),
        page: Number(filter.page) || 1,
        total: listOfFound.length,
      },
      null,
      "Found list of cars success"
    );
  } catch (error) {
    next(createError(404, error));
  }
};

module.exports = { getCars };