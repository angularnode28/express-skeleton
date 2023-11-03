const connection = require("../services/database");
const { Failure } = require("./api.model");

class AlreadyExists {
  key;
  tableName;
  values;
  response;
  constructor(tableName, key, req) {
    this.key = key;
    this.tableName = tableName;
    this.values = req.body;
  }

  executeQuery() {
    return new Promise((resolve, reject) => {
      let query = `SELECT ${this.key} FROM ${this.tableName} WHERE ${this.key}= '${
        this.values[this.key]
      }' `;

      connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
          resolve({
            status: false,
            response: new Failure(500, "FAILURE", "Internal server error", err),
          });
        } else {
          if (result.length == 0) {
            resolve({
              status: true,
            });
          } else {
            resolve({
              status: false,
              response: new Failure(
                400,
                "FAILURE",
                `${this.key} already exists!`,
                ""
              ),
            });
          }
        }
      });
    });
  }
}

module.exports = AlreadyExists;
