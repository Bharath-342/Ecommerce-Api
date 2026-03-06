const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secure E-Commerce API",
      version: "1.0.0",
      description: "REST API for E-Commerce Backend",
    },
    servers: [
      {
        url: "https://ecommerce-api-mdmw.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };