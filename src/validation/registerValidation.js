import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(100).required().allow(""),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(7).max(12).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .max(1024)
    .required(),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(6).max(1024).allow(""),
  state: Joi.string().min(2).max(255).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  zipCode: Joi.number().min(1).max(256).allow(""),
  biz: Joi.boolean(),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;