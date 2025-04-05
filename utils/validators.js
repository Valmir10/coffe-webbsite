const Joi = require("joi");

const validateCart = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image_url: Joi.string().uri().required(),
    price: Joi.number().positive().required(),
    size: Joi.string().valid("Medium", "Large").required(),
    customizations: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().positive().required(),
        })
      )
      .required(),
  });

  return schema.validate(data);
};

const validateOrder = (data) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().positive().required(),
    size: Joi.string().valid("Medium", "Large").required(),
    customizations: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().positive().required(),
        })
      )
      .required(),
  });

  return schema.validate(data);
};

module.exports = { validateCart, validateOrder };
