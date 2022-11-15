const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../../helpers/utils");
const Car = require("../../../models/Car");

const deleteCar = async (req, res, next) => {
  try {
    const carId = req.params;
    
    const findId = await Car.findById(carId.id)
    if (!findId) throw new AppError(404, "Not Found Car")
        
    const options = { isDeleted: true };
    const updated = await Car.findByIdAndUpdate(carId.id, options);


    sendResponse(res, 200, true, { data: updated }, null, "Delete Car success");
  } catch (error) {
    next(error)
  }
}

module.exports = { deleteCar };