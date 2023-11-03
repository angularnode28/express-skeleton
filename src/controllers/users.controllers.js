const { checkNull } = require("../configs/common");
const AlreadyExists = require("../models/already-exists");
const { Success, Failure } = require("../models/api.model");
const CreateQueryGenerator = require("../models/create-query");
const { QueryGenerator } = require("../models/query-generator");
const UpdateQueryGenerator = require("../models/update-query");
const connection = require("../services/database");

async function getAllUsers(req, res) {
  const generator = new QueryGenerator(req, ["status"], "users", [
    "name",
    "email",
    "mobile",
  ]);

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
        .json(new Success(200, "Success", "Listed users successfully", result));
    }
  });
}

async function createUser(req, res) {
  const emailExists = new AlreadyExists("users", "email", req).executeQuery();
  const mobileExists = new AlreadyExists("users", "mobile", req).executeQuery();

  emailExists.then((response) => {
    if (response.status) {
   
        
  mobileExists.then((response) => {
    if (response.status) {
        const tableKeys = ["name","email","mobile","password",];
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
              .status(201)``
              .json(new Success(201, "Success", "Created users successfully", ""));
          }
        });
    } else {
      res.status(500).json(response.response);
    }
  });

    } else {
      res.status(500).json(response.response);
    }
  });
}

async function updateUser(req, res) {
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

async function deleteUser(req, res) {
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

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
