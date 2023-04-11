
const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}
//msgSubject = Alt/URL/Password...
//msgLimitVarArr = [2,256]
//msgType = 0 = string, 1 = number
//msgIncludeIndicatorArr = [0,0,0,1] => only string.pattern.base etc
const generateMessages = ( msgSubject, msgLimitVarArr, msgType, msgIncludeIndicatorArr) => {
    const stringMsgTypeArr = {"string.min": 0, "string.max": 1, "string.empty": 2, "string.pattern.base": 3};
    const stringMsgs = ["XX should be at least YY ZZ long", "XX should be at most YY ZZ long", "XX cannot be empty", "XX should meet rules"]
    const numberMsgTypeArr = {"number.min": 0, "number.max": 1};
    const typeUnits = ["characters", "digits"];
    const msgTypes = {"string" : 0, "number": 1};
    let msgObj = {};
    
    for(let msgIncludeIdx = 0; msgIncludeIdx < msgIncludeIndicatorArr.length; msgIncludeIdx++){
        if(msgType === msgTypes.string && msgIncludeIndicatorArr[msgIncludeIdx] && (msgIncludeIdx === stringMsgTypeArr["string.min"] || msgIncludeIdx === stringMsgTypeArr["string.max"])){
            let validationMsg = stringMsgs[msgIncludeIdx];
            validationMsg = validationMsg.replace("XX", msgSubject);
            validationMsg = validationMsg.replace("YY", msgLimitVarArr[msgIncludeIdx]);
            validationMsg = validationMsg.replace("ZZ", typeUnits[msgTypes.string]);
            msgObj[getKeyByValue(stringMsgTypeArr, msgIncludeIdx)] = validationMsg;
        }
        if(msgType === msgTypes.string && msgIncludeIndicatorArr[msgIncludeIdx] && !(msgIncludeIdx === stringMsgTypeArr["string.min"] || msgIncludeIdx === stringMsgTypeArr["string.max"])){
            let validationMsg = stringMsgs[msgIncludeIdx];
            validationMsg = validationMsg.replace("XX", msgSubject);
            msgObj[getKeyByValue(stringMsgTypeArr, msgIncludeIdx)] = validationMsg;
        }
        if(msgType === msgTypes.number && msgIncludeIndicatorArr[msgIncludeIdx]){
            let validationMsg = stringMsgs[msgIncludeIdx];
            validationMsg = validationMsg.replace("XX", msgSubject);
            validationMsg = validationMsg.replace("YY", msgLimitVarArr[msgIncludeIdx]);
            validationMsg = validationMsg.replace("ZZ", typeUnits[msgTypes.number]);
            msgObj[getKeyByValue(numberMsgTypeArr, msgIncludeIdx)] = validationMsg;
        }
    }
    return msgObj;
}

export default generateMessages;