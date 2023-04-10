import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateRegisterSchema from "../validation/registerValidation";
import { validateFieldFromSchema } from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import InputComponent from "../components/InputComponent";

const RegisterPage = () => {
  const startingInputVal = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    isBiz: false
  };

  const startingInputErrVal = {};
  const [inputState, setInputState] = useState(startingInputVal);
  const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
  const navigate = useNavigate();
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      console.log(joiResponse);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.post("/users/register", inputState);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    let fieldValidationResult = validateFieldFromSchema(ev.target.value, ev.target.id);
    //console.log("🚀 ~ file: RegisterPage.jsx:63 ~ handleInputChange ~ fieldValidationResult:", fieldValidationResult);
    let newErrorState = JSON.parse(JSON.stringify(inputsErrorsState));
    newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
    // console.log("🚀 ~ file: RegisterPage.jsx:67 ~ handleInputChange ~ ev.target.id:", ev.target.id)
    // console.log("🚀 ~ file: RegisterPage.jsx:67 ~ handleInputChange ~ fieldValidationResult[ev.target.id]:", fieldValidationResult[ev.target.id])

    // console.log("🚀 ~ file: RegisterPage.jsx:67 ~ handleInputChange ~ newErrorState:", newErrorState)

    setInputsErrorsState(newErrorState);

    console.log(newInputState);
    console.log(newErrorState);
  };

  const handleCheckboxChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.checked;
    setInputState(newInputState);
  };
  const handleCancelClick = (ev) => {
    navigate(ROUTES.HOME);
  }
  const handleRefreshClick = (ev) => {
    setInputState(startingInputVal);
    setInputsErrorsState(startingInputErrVal);
  }
  return (
    <Container component="main" maxWidth="xs">
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
          Register
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <InputComponent id="firstName" label="First Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="middleName" label="Middle Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="lastName" label="Last Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="phone" label="Phone" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="email" label="Email" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="password" label="Password" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} inputType="password" />
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
                control={<Checkbox id="isBiz" checked={inputState.isBiz} onChange={handleCheckboxChange} color="primary" />}
                label="Register as Business"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRefreshClick}
              >
                <RefreshIcon />
              </Button>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBtnClick}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
