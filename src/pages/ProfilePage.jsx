import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import validateProfileSchema from "../validation/profileValidation";
import { validateProfileFieldFromSchema } from "../validation/profileValidation";
import ROUTES from "../routes/ROUTES";
import InputComponent from "../components/InputComponent";
import CancelButtonComponent from "../components/CancelButtonComponent";
import RefreshButtonComponent from "../components/RefreshButtonComponent";
import useResponsiveQueries from "../hooks/useResponsiveQueries";

const ProfilePage = () => {
  const startingInputVal = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    biz: false
  };

  const startingInputErrVal = {};
  const [inputState, setInputState] = useState(startingInputVal);
  const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
  const navigate = useNavigate();
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateProfileSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.put("users/userInfo", inputState);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    let fieldValidationResult = validateProfileFieldFromSchema(ev.target.value, ev.target.id);
    let newErrorState = JSON.parse(JSON.stringify(inputsErrorsState));
    newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
    setInputsErrorsState(newErrorState);
  };

  const handleCheckboxChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.checked;
    setInputState(newInputState);
  };

  const handleRefreshClick = (ev) => {
    setInputState(startingInputVal);
    setInputsErrorsState(startingInputErrVal);
  }

  useEffect(() => {
        (async () => {
        try{
            const {data} = await axios.get("/users/userInfo");
            let inputFromServer = {
                ...data
              };
            if(!data){
                navigate(ROUTES.PAGENOTFOUND);
                return;
            }
            delete inputFromServer._id;
            delete inputFromServer.isAdmin;
            let newInputState = {...startingInputVal, ...inputFromServer};
            if(!newInputState.zipCode) { newInputState.zipCode = "";}

            setInputState(newInputState);
        }
        catch(err){
            console.log(err);
            toast.error("Failed to load Profile data");
        }
        })();
        
    }, []);

  return (
    <Container component="main" maxWidth={`${useResponsiveQueries()}`}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <InputComponent id="firstName" label="First Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="middleName" label="Middle Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="lastName" label="Last Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="phone" label="Phone" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="email" label="Email" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="imageUrl" label="Image Url" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="imageAlt" label="Image Alt" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="state" label="State" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="country" label="Country" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="city" label="City" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="street" label="Street" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="houseNumber" label="House Number" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="zipCode" label="Zip Code" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="biz" checked={inputState.biz} onChange={handleCheckboxChange} color="primary" />}
                label="Register as Business"
              />
            </Grid>
            <Grid item xs={6}>
              <CancelButtonComponent />
            </Grid>
            <Grid item xs={6}>
              <RefreshButtonComponent handleRefreshClick={handleRefreshClick}/>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBtnClick}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ProfilePage;

