const express = require("express");
const middleware = require("../middlewares/validation-middleware");
const schema = require("../utils/joi-schema");
const {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");

const RoleRouter = express.Router();

RoleRouter.get("/getRoles", getAllRoles);
RoleRouter.post("/createRole", middleware(schema.role, "body"), createRole);
RoleRouter.put("/updateRole/:roleId", middleware(schema.role, "body"), updateRole);
RoleRouter.post("/deleteRole/:roleId", deleteRole);

module.exports = RoleRouter;
