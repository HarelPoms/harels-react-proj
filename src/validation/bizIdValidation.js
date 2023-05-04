import Joi from "joi";
import validation from "./validation";
import generateMessages from "./msgGenerationUtil";
import validateFieldFromSchema from "./validateFieldFromSchemaUtil";

const bizIdSchema = Joi.object({
    bizId: Joi.number().min(1000000).max(9999999).messages(generateMessages("Business Id", [1000000,9999999], 1,
    [1,1,1]))
});

const validateBizIdSchema = (userInput) =>
    validation(bizIdSchema, userInput);


const validateBizIdFieldFromSchema = (userInput, userFieldId) => {
    return (validateFieldFromSchema(bizIdSchema, userInput, userFieldId));
}

export default validateBizIdSchema;

export {validateBizIdFieldFromSchema};
