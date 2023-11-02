const express = require("express");
const middleware = require("../middlewares/validation-middleware");
const schema = require("../utils/joi-schema");
const { getAllRoles, createRole } = require("../controllers/role.controller");

const RoleRouter = express.Router();

RoleRouter.get("/getRoles", getAllRoles);
RoleRouter.post("/createRole", createRole);
//  middleware(schema.role, "body")

module.exports = RoleRouter;
