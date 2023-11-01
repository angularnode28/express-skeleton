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
    // ROLES
    "/getRoles": {
      get: {
        tags: ["roles"],
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
                role: { type: "string" },
              },
            },
          },
        ],
      },
    },
    "/updateRole": {
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
                role: { type: "string" },
              },
            },
          },
        ],
      },
    },
    "/deleteRole": {
      post: {
        tags: ["roles"],
        parameters:[
            {
                name: "roleId",
                type: "string",
                required: true,
                in: "path",
              },
        ]
      },
    },
    // USERS
    "/getUsers":{
        get:{
            tags:['users'],

        }
    }
  },
};

const doc = new YAML.Document();
doc.contents = swaggerDocument;

// console.log(doc.toString());

module.exports = doc.toString();
