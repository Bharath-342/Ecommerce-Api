const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", 
          bearerFormat: "JWT"
        }
      }
    },
 openapi: "3.0.0",
 info: {
   title: "Secure E-Commerce API",
   version: "1.0.0",
   description: "REST API for E-Commerce Backend"
 },
 servers: [
   {
     url: "https://ecommerce-api-mdmw.onrender.com"
   }
 ],
 tags: [
   {
     name: "Authentication",
     description: "User authentication APIs"
   },
   {
     name: "Products",
     description: "Product management APIs"
   }
 ]
},
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };