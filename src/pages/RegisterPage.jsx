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
            <InputComponent id="firstName" label="First Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />

            {/* <Grid item xs={12} sm={6}>
              <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={inputState.firstName}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.firstName && (
              <Alert severity="warning">
                {inputsErrorsState.firstName.map((item) => (
                <div key={"firstName-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              id="middleName"
              label="Middle Name"
              name="middleName"
              autoComplete="middle-name"
              value={inputState.middleName}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.middleName && (
              <Alert severity="warning">
                {inputsErrorsState.middleName.map((item) => (
                <div key={"middleName-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={inputState.lastName}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.lastName && (
              <Alert severity="warning">
                {inputsErrorsState.lastName.map((item) => (
                <div key={"lastName-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              value={inputState.phone}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.phone && (
              <Alert severity="warning">
                {inputsErrorsState.phone.map((item) => (
                <div key={"phone-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={inputState.email}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.email && (
              <Alert severity="warning">
                {inputsErrorsState.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="password"
              value={inputState.password}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.password && (
              <Alert severity="warning">
                {inputsErrorsState.password.map((item) => (
                <div key={"password-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              id="imageUrl"
              label="Image Url"
              name="url"
              autoComplete="url"
              value={inputState.imageUrl}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.imageUrl && (
              <Alert severity="warning">
                {inputsErrorsState.imageUrl.map((item) => (
                <div key={"imageUrl-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              id="imageAlt"
              label="Image Alt"
              name="alt"
              autoComplete="alt"
              value={inputState.imageAlt}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.imageAlt && (
              <Alert severity="warning">
                {inputsErrorsState.imageAlt.map((item) => (
                <div key={"alt-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              id="state"
              label="State"
              name="state"
              autoComplete="state"
              value={inputState.state}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.state && (
              <Alert severity="warning">
                {inputsErrorsState.state.map((item) => (
                <div key={"state-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
              value={inputState.country}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.country && (
              <Alert severity="warning">
                {inputsErrorsState.country.map((item) => (
                <div key={"country-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              value={inputState.city}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.city && (
              <Alert severity="warning">
                {inputsErrorsState.city.map((item) => (
                <div key={"city-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="street"
              label="Street"
              name="street"
              autoComplete="street"
              value={inputState.street}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.street && (
              <Alert severity="warning">
                {inputsErrorsState.street.map((item) => (
                <div key={"street-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              required
              fullWidth
              id="houseNumber"
              label="House Number"
              name="houseNumber"
              autoComplete="houseNumber"
              value={inputState.houseNumber}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.houseNumber && (
              <Alert severity="warning">
                {inputsErrorsState.houseNumber.map((item) => (
                <div key={"houseNumber-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              id="zipCode"
              label="Zip Code"
              name="zip"
              autoComplete="zip"
              value={inputState.zip}
              onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.zip && (
              <Alert severity="warning">
                {inputsErrorsState.zip.map((item) => (
                <div key={"zip-errors" + item}>{item}</div>
                ))}
              </Alert>
              )}
            </Grid>

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
