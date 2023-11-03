const Joi = require("joi");
const { Failure } = require("../models/api.model");
const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json(new Failure(422, "FAILURE", message,''));
    }
  };
};
module.exports = middleware;
