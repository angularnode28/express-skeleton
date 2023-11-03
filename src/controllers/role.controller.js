const { checkNull } = require("../configs/common");
const AlreadyExists = require("../models/already-exists");
const { Success, Failure } = require("../models/api.model");
const CreateQueryGenerator = require("../models/create-query");
const { QueryGenerator } = require("../models/query-generator");
const UpdateQueryGenerator = require("../models/update-query");
const connection = require("../services/database");

async function getAllRoles(req, res) {
  const generator = new QueryGenerator(req, ["status"], "roles", ["role_name"]);

  const query = generator.getQuery();
  connection.query(query, (err, result) => {
    if (err || result.length == 0) {
      if (err) {
        res
          .status(res.statusCode)
          .json(new Failure(res.statusCode, "FAILED", "Internal server error", err));
      }
    } else {
      res
        .status(200)
        .json(new Success(200, "Success", "Listed roles successfully", result));
    }
  });
}

async function createRole(req, res) {
  const roleExists = new AlreadyExists("roles", "role_name", req).executeQuery();

  roleExists.then((response) => {
    if (response.status) {
      const tableKeys = ["role_name"];
      const generator = new CreateQueryGenerator(req, "roles", tableKeys);
      const query = generator.getQuery();
      console.log(query);
      connection.query(query, (err, result) => {
        if (err) {
          res
            .status(500)
            .json(new Failure(500, "FAILED", "Internal server error", err));
        } else {
          res
            .status(201)
            .json(new Success(201, "Success", "Created role successfully", ""));
        }
      });
    } else {
      res.status(500).json(response.response);
    }
  });
}

async function updateRole(req, res) {
  const tableKeys = ["role_name"];
  const generator = new UpdateQueryGenerator(req, "roles", "roleId", tableKeys);
  const query = generator.getQuery();
  connection.query(query, (err, result) => {
    if (err) {
      res
        .status(res.statusCode)
        .json(new Failure(res.statusCode, "FAILED", "Internal server error", err));
    } else {
      res
        .status(201)
        .json(new Success(200, "Success", "Updated role successfully", ""));
    }
  });
}

async function deleteRole(req, res) {
  req.body.status = 2;
  const tableKeys = ["status"];
  const generator = new UpdateQueryGenerator(req, "roles", "roleId", tableKeys);
  const query = generator.getQuery();
  connection.query(query, (err, result) => {
    if (err) {
      res
        .status(res.statusCode)
        .json(new Failure(res.statusCode, "FAILED", "Internal server error", err));
    } else {
      res
        .status(201)
        .json(new Success(200, "Success", "Deleted role successfully", ""));
    }
  });
}

module.exports = { getAllRoles, createRole, updateRole, deleteRole };
