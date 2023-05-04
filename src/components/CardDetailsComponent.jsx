import {
    Card,
    CardActionArea,
    CardMedia,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import InputComponent from "../components/InputComponent";
import validateBizIdSchema from "../validation/bizIdValidation";
import { validateBizIdFieldFromSchema } from "../validation/bizIdValidation";

const CardDetailsComponent = ({
    title, subTitle, description, phone, email, web, url, alt, state, country, city, street, houseNumber, zipCode, bizNumber, _id
}) => {
const [bizNumValueState, setBizNumValueState] = useState(bizNumber);
const [bizNumIdToPatchState, setBizNumIdToPatchState] = useState({bizId: bizNumber});
const [inputsErrorsState, setInputsErrorsState] = useState({});
const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
const payload = useSelector((bigPie) => bigPie.authSlice.payload);

const handleBizNumberChange = (ev) => {
    let inputErrorsStateToValidate;
    let newInputState = JSON.parse(JSON.stringify(bizNumIdToPatchState));
    newInputState[ev.target.id] = ev.target.value;
    setBizNumIdToPatchState(newInputState);
    let fieldValidationResult = validateBizIdFieldFromSchema(ev.target.value, ev.target.id);
    if(!inputsErrorsState){
        inputErrorsStateToValidate = {};
    }
    else{
        inputErrorsStateToValidate = inputsErrorsState;
    }
    let newErrorState = JSON.parse(JSON.stringify(inputErrorsStateToValidate));
    newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
    setInputsErrorsState(newErrorState);
}

const handleChangeBizNumClick = async (ev) => {
        try {
        const joiResponse = validateBizIdSchema(bizNumIdToPatchState);
        setInputsErrorsState(joiResponse);
        if (joiResponse) {
            return;
        }
        const { data : cards } = await axios.get("/cards/cards");
        let filterObj = cards.filter((card)=>card.bizNumber == bizNumIdToPatchState.bizId)[0];
        if(filterObj){
            toast.error("This business number is already taken, choose another");
            return;
        }
        await axios.patch("cards/bizNumber/" + _id, bizNumIdToPatchState);
        setBizNumValueState(bizNumIdToPatchState.bizId);
        } catch (err) {
            toast.error("An error occured in the server");
        }
    };

const handleRandomClick = async (ev) => {
    try{
        let res = await axios.patch("cards/bizNumber/" + _id, {bizId: 101});
        console.log(res);
        setBizNumValueState(res.data.bizNumber);
        let newInputState = JSON.parse(JSON.stringify(bizNumIdToPatchState));
        newInputState.bizId = res.data.bizNumber;
        setBizNumIdToPatchState(newInputState);
    }
    catch{

    }

}
return (
    <Card square raised>
    <CardActionArea>
        <CardMedia component="img" image={url} alt={alt} />
    </CardActionArea>
    <CardHeader title={title} subheader={subTitle}></CardHeader>
    <CardContent>
        <Typography>{description}</Typography>
        <Typography variant="h3">Contact details</Typography>
        <Typography>Phone : {phone}</Typography>
        <Typography>Email : {email}</Typography>
        <Typography>WebSite : {web}</Typography>
        <Typography>Zip Code : {zipCode}</Typography>
        <Typography variant="h3">Address Details</Typography>
        <Typography>Country : {country}</Typography>
        <Typography>State : {state}</Typography>
        <Typography>City : {city}</Typography>
        <Typography>Street : {street}</Typography>
        <Typography>House Number : {houseNumber}</Typography>
        <Typography sx={{ mb: 2 }}>Biz Number : {bizNumValueState}</Typography>
        {isLoggedIn && payload.isAdmin ? <Fragment >
            <InputComponent id="bizId" label="Business Number" inputState={bizNumIdToPatchState} inputsErrorsState={inputsErrorsState} handleInputChange={handleBizNumberChange} isRequired={true} />
            <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleChangeBizNumClick}>
                Update Biz Number Manually
            </Button> 
            <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleRandomClick}>
                Update Biz Number Randomly
            </Button> 
        </Fragment>
        : ""
        }
        
    </CardContent>
    <CardActions>
        
    </CardActions>
    </Card>
);
};

CardDetailsComponent.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    web: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired
};

CardDetailsComponent.defaultProps = {
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    subTitle: ""
};

export default CardDetailsComponent;
