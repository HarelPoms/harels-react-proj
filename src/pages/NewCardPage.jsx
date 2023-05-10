import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import isImage from "../validation/isImgUrlValid";

import ROUTES from "../routes/ROUTES";
import validateEditSchema, { validateEditFieldFromSchema } from "../validation/editValidation";

import InputComponent from "../components/InputComponent";
import CancelButtonComponent from "../components/CancelButtonComponent";
import RefreshButtonComponent from "../components/RefreshButtonComponent";
import LoadingAnimationComponent from "../components/LoadingAnimationComponent";
import useResponsiveQueries from "../hooks/useResponsiveQueries";

const NewCardPage = () => {
    const startingInputVal = {title: "", subTitle: "", description: "", state:"", country:"", city: "", street: "", houseNumber: "", zipCode: "", phone: "", email:"", web: "", url: "", alt: "" };
    const startingInputErrVal = {};
    const [inputState, setInputState] = useState(startingInputVal);
    const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
    const navigate = useNavigate();
    const querySize = useResponsiveQueries();

    const handleRefreshClick = (ev) => {
        setInputState(startingInputVal);
        setInputsErrorsState(startingInputErrVal);
    }

    const handleSaveBtnClick = (ev) => {
        (async () => {
            try{
                const joiResponse = validateEditSchema(inputState);
                setInputsErrorsState(joiResponse);

                if (!joiResponse) {
                    await axios.post("/cards/", inputState);
                    toast.success("Succeeded to save new card");
                    //move to homepage
                    navigate(ROUTES.HOME);
                }
            
            }
            catch(err){
                toast.error("Failed to save new card");
            }
        })();
    };

    const handleInputChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.value;
        setInputState(newInputState);
        let fieldValidationResult = validateEditFieldFromSchema(ev.target.value, ev.target.id);
        let newErrorState = JSON.parse(JSON.stringify(inputsErrorsState));
        newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
        setInputsErrorsState(newErrorState);
    };

    //ensures the input state is synchronized with the latest character input
    useEffect(() => {
        setInputState((newInputState) => newInputState);
    }, [inputState]);

    if(!inputState){
        return <LoadingAnimationComponent />;
    }

    return (
    <Container component="main" maxWidth={querySize}>
        <Box
            sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AddCardIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
                Create Card
            </Typography>
            <Box
            component="img"
            sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt={inputState.alt ? inputState.alt : ""}
            src={isImage(inputState.url) ? inputState.url : "/assets/images/placeholderCardImg.png"}
            />
            <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <InputComponent id="title" label="Title" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="subTitle" label="Subtitle" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="description" label="Description" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="phone" label="Phone" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="email" label="Email" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="web" label="Web" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
                <InputComponent id="url" label="Image URL" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
                <InputComponent id="alt" label="Image ALT" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
                <InputComponent id="state" label="State" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
                <InputComponent id="country" label="Country" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="city" label="City" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="street" label="Street" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="houseNumber" label="House Number" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
                <InputComponent id="zipCode" label="Zip Code" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />

                <Grid item xs={6}>
                    <CancelButtonComponent />
                </Grid>
                <Grid item xs={6}>
                    <RefreshButtonComponent handleRefreshClick={handleRefreshClick}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSaveBtnClick}>
                        Save
                    </Button>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    );
};
export default NewCardPage;
