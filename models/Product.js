const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            required: true,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            required: true,
            defaultValue: 0,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        timestamps: true,
    }
);

Product.belongsTo(User, { foreignKey: "createdBy" });

module.exports = Product;