import Joi from "joi";

export const RegisterSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  profile_picture: Joi.string(),
  phone_number: Joi.string().required(),
  country: Joi.string().required(),
});

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const option = {
  abortearly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const creatProductSchema = Joi.object({
  item_name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
  pictures: Joi.array().items(Joi.string()),
});

export const updateProductSchema = Joi.object({
  item_name: Joi.string().optional(),
  category: Joi.string().optional(),
  price: Joi.string().optional(),
  description: Joi.string().optional(),
  pictures: Joi.array().items(Joi.string()),
});
