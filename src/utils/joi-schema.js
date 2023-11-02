const joi = require("joi");
const { patterns } = require("../configs/common");

const schema = {
  role: joi.object().keys({
    role_name: joi.string().required().regex(patterns.removeWSWLetter).messages({
      "any.required": "Role is required.",
      "string.empty": "Role cannot be empty",
      "string.pattern.base": "Role cannot contain white space.",
    }),
  }),
};

module.exports = schema;
