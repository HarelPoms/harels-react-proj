import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required().messages({
    "string.min": "First Name should be at least 2 characters long",
    "string.max": "First Name should be at most 100 characters long",
    "string.empty": "First Name cannot be empty"
  }),
  middleName: Joi.string().min(2).max(100).required().allow("").messages({
    "string.min": "Middle Name should be at least 2 characters long",
    "string.max": "Middle Name should be at most 100 characters long",
    "string.empty": "Middle Name cannot be empty"
  }),
  lastName: Joi.string().min(2).max(100).required().messages({
    "string.min": "Last Name should be at least 2 characters long",
    "string.max": "Last Name should be at most 100 characters long",
    "string.empty": "Last Name cannot be empty"
  }),
  phone: Joi.string().min(7).max(12).required().messages({
    "string.min": "Phone should be at least 2 characters long",
    "string.max": "Phone should be at most 100 characters long",
    "string.empty": "Phone cannot be empty"
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .max(1024)
    .required().messages({
    "string.min": "Password should be at least 6 characters long",
    "string.max": "Password should be at most 1024 characters long",
    "string.empty": "Password cannot be empty",
    "string.pattern.base": "Password should meet rules",
  }),
  imageUrl: Joi.string().min(6).max(1024).allow("").messages({
    "string.min": "Image URL should be at least 6 characters long",
    "string.max": "Image URL should be at most 1024 characters long"
  }),
  imageAlt: Joi.string().min(6).max(1024).allow("").messages({
    "string.min": "Image ALT should be at least 6 characters long",
    "string.max": "Image ALT should be at most 1024 characters long"
  }),
  state: Joi.string().min(2).max(255).allow("").messages({
    "string.min": "State should be at least 2 characters long",
    "string.max": "State should be at most 255 characters long"
  }),
  country: Joi.string().min(2).max(256).required().messages({
    "string.min": "Country should be at least 2 characters long",
    "string.max": "Country should be at most 156 characters long",
    "string.empty": "Country cannot be empty"
  }),
  city: Joi.string().min(2).max(256).required().messages({
    "string.min": "City should be at least 2 characters long",
    "string.max": "City should be at most 256 characters long",
    "string.empty": "City cannot be empty"
  }),
  street: Joi.string().min(2).max(256).required().messages({
    "string.min": "Street should be at least 2 characters long",
    "string.max": "Street should be at most 256 characters long",
    "string.empty": "Street cannot be empty"
  }),
  houseNumber: Joi.string().min(1).max(256).required().messages({
    "string.min": "House Number should be at least 1 characters long",
    "string.max": "House Number be at most 256 characters long",
    "string.empty": "House Number cannot be empty"
  }),
  zipCode: Joi.number().min(1).max(256).allow("").messages({
    "number.min": "Zip Code should be at least 1 characters long",
    "number.max": "Zip Code be at most 256 characters long"
  }),
  biz: Joi.boolean(),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

const validateFieldFromSchema = (userInput, userFieldId) => {

  const fieldSchema = registerSchema.extract(userFieldId);

  const validationRes = validation(fieldSchema, userInput);

  let returnVal;
  if(validationRes){
    returnVal = validationRes.undefined;
  }
  else{
    returnVal = null;
  }
  return {[userFieldId]: returnVal};
}

export default validateRegisterSchema;

export {validateFieldFromSchema};
