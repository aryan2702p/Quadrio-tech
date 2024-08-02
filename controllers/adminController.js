const Car = require('../models/carModel');

exports.dashboard = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    res.json({ totalCars });
  } catch (err) {
    res.status(400).send(err);
  }
};
