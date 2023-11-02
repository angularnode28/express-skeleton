const { checkNull } = require("../configs/common");
const API = require("../models/api.model");
const CreateQueryGenerator = require("../models/create-query");
const { QueryGenerator } = require("../models/query-generator");
const connection = require("../services/database");

async function getAllRoles(req, res) {
  const generator = new QueryGenerator(req, ["status"], "roles", ["role_name"]);
  const query = generator.getQuery();
  connection.query(query, (err, result) => {
    if (err || result.length == 0) {
      if (err) {
        res
          .status(500)
          .json(new API(500, "FAILED", "Internal server error", [], err));
      } else {
        res.status(500).json(new API(500, "FAILED", "No data found", []));
      }
    } else {
      res
        .status(200)
        .json(new API(200, "Success", "Listed roles successfully", result));
    }
  });
}

async function createRole(req, res) {
  const tableKeys = ["role_name", "status"];
  req.body.status = 0;
  const generator = new CreateQueryGenerator(req, "roles", tableKeys);
  const query = generator.getQuery();
  console.log(query);
  connection.query(query, (err, result) => {
    console.log(err);
    if (err) {
      res.status(500).json(new API(500, "FAILED", "Internal server error", [], err));
    } else {
      res
        .status(201)
        .json(new API(200, "Success", "Created role successfully", req.body));
    }
  });
}

async function updateRole(req, res) {}

async function deleteRole(req, res) {}

module.exports = { getAllRoles, createRole, updateRole, deleteRole };
