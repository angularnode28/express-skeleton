const { string } = require("joi");
const YAML = require("yaml");

const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "TGSS Admin Panel",
    version: "1.0.0",
    description:
      "This is admin panel for the TECHNOGENESIS Software Solutions Pvt Ltd",
  },
  paths: {
    "/getRoles": {
      get: {
        tags: ["roles"],
        parameters: [
          {
            name: "searchWith",
            in: "query",
            type: "string",
            required: false,
          },
          {
            name: "limit",
            in: "query",
            type: "string",
            required: false,
          },
          {
            name: "offset",
            in: "query",
            type: "string",
            required: false,
          },
          {
            name: "status",
            in: "query",
            type: "integer",
            required: false,
          },
          {
            name: "fromDate",
            in: "query",
            type: "string",
            required: false,
            description: "date format : YYYY-MM-DD",
          },
          {
            name: "toDate",
            in: "query",
            type: "string",
            required: false,
            description: "date format : YYYY-MM-DD",
          },
          {
            name: "sortBy",
            in: "query",
            type: "string",
            required: false,
            description: "ASC | DESC",
          },
          {
            name: "sortByKey",
            in: "query",
            type: "string",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "Listed roles successfully",
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "path not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/createRole": {
      post: {
        tags: ["roles"],
        parameters: [
          {
            name: "object",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                role_name: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Created role successfully",
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "path not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/updateRole/{roleId}": {
      put: {
        tags: ["roles"],
        parameters: [
          {
            name: "roleId",
            type: "string",
            required: true,
            in: "path",
          },
          {
            name: "object",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                role_name: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Updated role successfully",
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "path not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/deleteRole/{roleId}": {
      post: {
        tags: ["roles"],
        parameters: [
          {
            name: "roleId",
            type: "string",
            required: true,
            in: "path",
          },
        ],
        responses: {
          200: {
            description: "Deleted role successfully",
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "path not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/getUsers": {
      get: {
        tags: ["users"],
      },
    },
  },
};

const doc = new YAML.Document();
doc.contents = swaggerDocument;

// console.log(doc.toString());

module.exports = doc.toString();
