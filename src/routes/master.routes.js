const express = require("express");
const MastersControllers = require("../controllers/master.controllers");

const MasterRoutes = express.Router();

const controller = new MastersControllers();

MasterRoutes.get("/states", controller.getStates);
MasterRoutes.get("/districts/:stateId", controller.getDistricts);


module.exports = MasterRoutes
