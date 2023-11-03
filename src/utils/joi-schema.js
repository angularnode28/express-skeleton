const joi = require("joi");
const { patterns } = require("../configs/common");

const schema = {
  // ROLE Module
  role: joi.object().keys({
    role_name: joi.string().required().regex(patterns.removeWSWLetter).messages({
      "any.required": "Role is required.",
      "string.empty": "Role cannot be empty",
      "string.pattern.base": "Role cannot contain white space.",
    }),
  }),

  // User Module

  user: joi.object().keys({
    name: joi.string().required().regex(patterns.removeWSWLetter).messages({
      "any.required": "Name is required.",
      "string.empty": "Name cannot be empty",
      "string.pattern.base": "Name cannot contain white space.",
    }),
    email: joi.string().required().regex(patterns.emailPattern).messages({
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty",
      "string.pattern.base": "Please provide a valid email",
    }),
    mobile: joi.string().required().regex(patterns.mobileNumber).messages({
      "any.required": "Mobile is required.",
      "string.empty": "Mobile cannot be empty",
      "string.pattern.base": "Please provide a valid mobile number",
    }),
    password: joi.string().required().min(8).messages({
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have atleast 8 characters",
    }),
    roleId: joi.string().required().min(8).messages({
      "any.required": "Role is required.",
      "string.empty": "Role cannot be empty",
    }),
  }),
};

module.exports = schema;
