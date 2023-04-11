import Joi from "joi";

import validation from "./validation";

import generateMessages from "./msgGenerationUtil";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required().messages(generateMessages("First Name", [2,100], 0,
  [1,1,1])),
  middleName: Joi.string().min(2).max(100).required().allow("").messages(generateMessages("Middle Name", [2,100], 0,
  [1,1,1])),
  lastName: Joi.string().min(2).max(100).required().messages(generateMessages("Last Name", [2,100], 0,
  [1,1,1])),
  phone: Joi.string().min(7).max(12).required().messages(generateMessages("Phone", [7,12], 0,
  [1,1,1])),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .max(1024)
    .required().messages(generateMessages("Password", [6,1024], 0,
  [1,1,1,1])),
  imageUrl: Joi.string().min(6).max(1024).allow("").messages(generateMessages("Image URL", [6,1024], 0,
  [1,1])),
  imageAlt: Joi.string().min(6).max(1024).allow("").messages(generateMessages("Image ALT", [6,1024], 0,
  [1,1])),
  state: Joi.string().min(2).max(255).allow("").messages(generateMessages("State", [2,255], 0,
  [1,1])),
  country: Joi.string().min(2).max(256).required().messages(generateMessages("Country", [2,156], 0,
  [1,1,1])),
  city: Joi.string().min(2).max(256).required().messages(generateMessages("City", [2,256], 0,
  [1,1,1])),
  street: Joi.string().min(2).max(256).required().messages(generateMessages("Street", [2,256], 0,
  [1,1,1])),
  houseNumber: Joi.string().min(1).max(256).required().messages(generateMessages("House Number", [1,256], 0,
  [1,1,1])),
  zipCode: Joi.number().min(1).max(256).allow("").messages(generateMessages("Zip Code", [1,256], 1,
  [1,1])),
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
