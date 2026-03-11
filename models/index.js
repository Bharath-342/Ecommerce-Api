const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const db = {};

db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);
db.Product = require("./product.model")(sequelize, DataTypes);

module.exports = db;