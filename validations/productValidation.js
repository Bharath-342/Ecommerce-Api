const Joi = require("joi");

const productSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .min(5)
        .required(),

    price: Joi.number()
        .min(1)
        .required(),

    category: Joi.string()
        .required(),

    stock: Joi.number()
        .min(0)
        .required()

});

module.exports = productSchema;