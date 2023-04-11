import Joi from "joi";

import validation from "./validation";

const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().messages({
    "string.min"  : "Title should be at least 2 characters long",
    "string.max"  : "Title should be at most 256 characters long",
    "string.empty": "Title cannot be empty"
  }),
  subTitle: Joi.string().min(2).max(256).required().messages({
    "string.min"  : "Subtitle should be at least 2 characters long",
    "string.max"  : "Subtitle should be at most 256 characters long",
    "string.empty": "Subtitle cannot be empty"
  }),
  description: Joi.string().min(2).max(1024).required().messages({
    "string.min"  : "Description should be at least 2 characters long",
    "string.max"  : "Description should be at most 1024 characters long",
    "string.empty": "Description cannot be empty"
  }),
  state: Joi.string().min(2).max(256).allow("").messages({
    "string.min": "State should be at least 2 characters long",
    "string.max": "State should be at most 100 characters long"
  }),
  country: Joi.string().min(2).max(256).required().messages({
    "string.min"  : "Country should be at least 2 characters long",
    "string.max"  : "Country should be at most 256 characters long",
    "string.empty": "Country cannot be empty"
  }),
  city: Joi.string().min(2).max(256).required().messages({
    "string.min"  : "City should be at least 2 characters long",
    "string.max"  : "City should be at most 256 characters long",
    "string.empty": "City cannot be empty"
  }),
  street: Joi.string().min(2).max(256).required().messages({
    "string.min"  : "Street should be at least 2 characters long",
    "string.max"  : "Street should be at most 256 characters long",
    "string.empty": "Street cannot be empty"
  }),
  houseNumber: Joi.string().min(1).max(256).required().messages({
    "string.min"  : "House Number should be at least 1 characters long",
    "string.max"  : "House Number should be at most 256 characters long",
    "string.empty": "House Number cannot be empty"
  }),
  zipCode: Joi.number().min(1).max(256).allow("").messages({
    "string.min": "Zip Code should be at least 1 characters long",
    "string.max": "Zip Code should be at most 256 characters long"
  }),
  phone: Joi.string().min(9).max(14).required().messages({
    "string.min"  : "Phone should be at least 9 characters long",
    "string.max"  : "Phone should be at most 14 characters long",
    "string.empty": "Phone cannot be empty"
  }),
  email: Joi.string().min(5).max(255).required().email({ tlds: { allow: false } }).messages({
    "string.min"  : "Email should be at least 5 characters long",
    "string.max"  : "Email should be at most 255 characters long",
    "string.empty": "Email cannot be empty"
  }),
  web: Joi.string().min(5).max(255).allow("").messages({
    "string.min"  : "Web should be at least 5 characters long",
    "string.max"  : "Web should be at most 255 characters long",
    "string.empty": "Web cannot be empty"
  }),
  url: Joi.string().min(6).max(1024).allow("").messages({
    "string.min": "URL should be at least 6 characters long",
    "string.max": "URL should be at most 1024 characters long"
  }),
  alt: Joi.string().min(2).max(256).allow("").messages({
    "string.min": "Alt should be at least 2 characters long",
    "string.max": "Alt should be at most 256 characters long"
  }),
});


const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
//msgSubject = Alt/URL/Password...
//msgLimitVarArr = [2,256]
//msgType = 0 = string, 1 = number
//msgIncludeIndicatorArr = [0,0,0,1] => only string.pattern.base etc
const generateMessages = ( msgSubject, msgLimitVarArr, msgType, msgIncludeIndicatorArr) => {
  const stringMsgTypeArr = {"string.min": 0, "string.max": 1, "string.empty": 2, "string.pattern.base": 3};
  const stringMsgs = ["X should be at least Y Z long", "X should be at most Y Z long", "X cannot be empty", "X should meet rules"]
  const numberMsgTypeArr = ["number.min", "number.max"];
  const typeUnits = ["characters", "digits"];
  const msgTypes = {"string" : 0, "number": 1};
  let msgObj = {};
  
  for(let msgIncludeIdx = 0; msgIncludeIdx < msgIncludeIndicatorArr.length; msgIncludeIdx++){
    if(msgType === msgTypes.string && msgIncludeIndicatorArr[msgIncludeIdx] && (msgIncludeIdx === stringMsgTypeArr["string.min"] || msgIncludeIdx === stringMsgTypeArr["string.max"])){
      let validationMsg = stringMsgs[msgIncludeIdx];
      validationMsg.replace("X", msgSubject);
      validationMsg.replace("Y", msgLimitVarArr[msgIncludeIdx]);
      validationMsg.replace("Z", typeUnits[msgTypes.string]);
      msgObj[getKeyByValue(stringMsgTypeArr, msgIncludeIdx)] = validationMsg;
    }
    if(msgType === msgTypes.string && msgIncludeIndicatorArr[msgIncludeIdx] && !(msgIncludeIdx === stringMsgTypeArr["string.min"] || msgIncludeIdx === stringMsgTypeArr["string.max"])){
      let validationMsg = stringMsgs[msgIncludeIdx];
      validationMsg.replace("X", msgSubject);
      msgObj[getKeyByValue(stringMsgTypeArr, msgIncludeIdx)] = validationMsg;
    }
    if(msgType === msgTypes.number && msgIncludeIndicatorArr[msgIncludeIdx]){
      let validationMsg = stringMsgs[msgIncludeIdx];
      validationMsg.replace("X", msgSubject);
      validationMsg.replace("Y", msgLimitVarArr[msgIncludeIdx]);
      validationMsg.replace("Z", typeUnits[msgTypes.number]);
      msgObj[getKeyByValue(numberMsgTypeArr, msgIncludeIdx)] = validationMsg;
    }
  }
  return msgObj;
}

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };

export default validateEditSchema;
