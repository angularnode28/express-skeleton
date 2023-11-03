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
    // Masters
    "/states": {
      get: {
        tags: ["Masters"],
        description: "Get all states",
        parameters: [],
        responses: {
          200: { description: "Listed states successfully" },
          404: { description: "Path not found" },
          500: { description: "internal server error" },
        },
      },
    },
    "/districts/{stateId}": {
      get: {
        tags: ["Masters"],
        description: "Get all states",
        parameters: [
          {
            name: "stateId",
            type: "integer",
            required: "string",
            in: "path",
          },
        ],
        responses: {
          200: { description: "Listed districts successfully" },
          404: { description: "Path not found" },
          500: { description: "internal server error" },
        },
      },
    },

    "/getRoles": {
      get: {
        tags: ["Roles"],
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
            description: "Listed Roles successfully",
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
        tags: ["Roles"],
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
        tags: ["Roles"],
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
        tags: ["Roles"],
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

    // Users

    "/getUsers": {
      get: {
        tags: ["Users"],
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
            description: "Listed users successfully",
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
    "/createUser": {
      post: {
        tags: ["Users"],
        parameters: [
          {
            name: "object",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                mobile: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                roleId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Created user successfully",
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
    "/updateUser/{id}": {
      put: {
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "integer",
            required: true,
          },
          {
            name: "object",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                mobile: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                roleId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Upadted user successfully",
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
    "/viewUser/{id}": {
      post: {
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            type: "string",
            required: true,
            in: "path",
          },
        ],
        responses: {
          200: {
            description: "Viewed user successfully",
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
    "/deleteUser/{id}": {
      post: {
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            type: "string",
            required: true,
            in: "path",
          },
        ],
        responses: {
          200: {
            description: "Deleted user successfully",
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
  },
};

const doc = new YAML.Document();
doc.contents = swaggerDocument;

// console.log(doc.toString());

module.exports = doc.toString();
