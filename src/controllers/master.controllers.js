const { Failure, Success } = require("../models/api.model");
const connection = require("../services/database");

class MastersControllers {
  constructor() {}

  getStates(req, res) {
    let query = `SELECT * FROM states`;
    connection.query(query, (err, result) => {
      if (err) {
        res
          .status(500)
          .json(new Failure(false, "FAILURE", "Internal server error", err));
      } else {
        res
          .status(200)
          .json(new Success(200, "Success", "Listed states successfully", result));
      }
    });
  }

  getDistricts(req, res) {
    let query = `SELECT * FROM districts WHERE stateId=${req.params.stateId}`;
    connection.query(query, (err, result) => {
      if (err) {
        res
          .status(500)
          .json(new Failure(false, "FAILURE", "Internal server error", err));
      } else {
        res
          .status(200)
          .json(new Success(200, "Success", "Listed districts successfully", result));
      }
    });
  }
}

module.exports = MastersControllers
