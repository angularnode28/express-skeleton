// Global Imports
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const YAML = require("yamljs");
const swagger = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");
const { QueryGenerator } = require("./src/models/query-generator");
require("./src/configs/swagger-docs");

// Global Functionalities
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:${process.env.PORT}`],
  })
);

const params = {
  limit: 400,
  offset: 0,
  sortBy: "name",
  sortByKey: "DESC",
  fromDate: "2023-10-28",
  status: "1",
  toDate: "2023-11-29",
};
const keys = ["status"];

const generator = new QueryGenerator();

generator.paginationFn(params);

generator.filterFn(params, keys);

generator.dateFilterFn(params);

console.log(
  `QUERY = ${generator.filterFn(params, keys)} ${
    generator.filterFn(params, keys).includes("WHERE")
      ?'AND '+ generator.dateFilterFn(params)
      : "WHERE " + generator.dateFilterFn(params)
  } ${generator.paginationFn(params)}`
);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  //   console.log();
});
