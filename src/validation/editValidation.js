import Joi from "joi";
import validation from "./validation";
import generateMessages from "./msgGenerationUtil";
import validateFieldFromSchema from "./validateFieldFromSchemaUtil"

const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().messages(generateMessages("Title", [2,256], 0,
  [1,1,1])),
  subTitle: Joi.string().min(2).max(256).required().messages(generateMessages("Subtitle", [2,256], 0,
  [1,1,1])),
  description: Joi.string().min(2).max(1024).required().messages(generateMessages("Description", [2,1024], 0,
  [1,1,1])),
  state: Joi.string().min(2).max(256).allow("").messages(generateMessages("State", [2,256], 0,
  [1,1])),
  country: Joi.string().min(2).max(256).required().messages(generateMessages("Country", [2,256], 0,
  [1,1,1])),
  city: Joi.string().min(2).max(256).required().messages(generateMessages("City", [2,256], 0,
  [1,1,1])),
  street: Joi.string().min(2).max(256).required().messages(generateMessages("Street", [2,256], 0,
  [1,1,1])),
  houseNumber: Joi.string().min(1).max(256).required().messages(generateMessages("House Number", [1,256], 0,
  [1,1,1])),
  zipCode: Joi.number().min(1).max(256).allow("").messages(generateMessages("Zip Code", [1,256], 0,
  [1,1])),
  phone: Joi.string().min(9).max(14).required().messages(generateMessages("Phone", [9,14], 0,
  [1,1,1])),
  email: Joi.string().min(5).max(255).required().email({ tlds: { allow: false } }).messages(generateMessages("Email", [5,255], 0,
  [1,1,1])),
  web: Joi.string().min(5).max(255).allow("").messages(generateMessages("Web", [2,255], 0,
  [1,1])),
  url: Joi.string().min(6).max(1024).allow("").messages(generateMessages("URL", [6,1024], 0,
  [1,1])),
  alt: Joi.string().min(2).max(256).allow("").messages(generateMessages("URL", [2,256], 0,
  [1,1])),
});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

const validateEditFieldFromSchema = (userInput, userFieldId) => {
  return (validateFieldFromSchema(editCardSchema, userInput, userFieldId));
}

export { validateEditCardParamsSchema, validateEditFieldFromSchema };

export default validateEditSchema;
