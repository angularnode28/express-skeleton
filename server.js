// Global Imports
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const YAML = require("yamljs");
const swagger = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");
const connection = require("./src/services/database");
const RoleRouter = require("./src/routes/role.routes");
require("./src/configs/swagger-docs");

// Global Functionalities
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:${process.env.PORT}`],
  })
);
app.use("/", RoleRouter);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  //   console.log();
});
