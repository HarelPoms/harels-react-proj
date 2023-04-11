import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AddCardIcon from '@mui/icons-material/AddCard';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import atom from "../logo.svg";

import ROUTES from "../routes/ROUTES";
import validateEditSchema from "../validation/editValidation";

const NewCardPage = () => {
    const [inputState, setInputState] = useState({title: "", subTitle: "", description: "", state:"", country:"", city: "", street: "", houseNumber: "", zipCode: "", phone: "", email:"", web: "", url: "", alt: "" });
    const [inputsErrorsState, setInputsErrorsState] = useState(null);
    const navigate = useNavigate();

    const handleSaveBtnClick = (ev) => {
        (async () => {
            try{
                const joiResponse = validateEditSchema(inputState);
                setInputsErrorsState(joiResponse);

                if (!joiResponse) {
                    await axios.post("/cards/", inputState);
                    //move to homepage
                    navigate(ROUTES.HOME);
                }
            
            }
            catch(err){
                console.log("Error while saving new card " + err);
                toast.error("Oops");
            }
        })();
    };

    const handleCancelBtnClick = (ev) => {
        //move to homepage
        navigate(ROUTES.HOME);
    };
    const handleInputChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.value;
        setInputState(newInputState);
    };

    //ensures the input state is synchronized with the latest character input
    useEffect(() => {
        setInputState((newInputState) => newInputState);
    }, [inputState]);

    if(!inputState){
        return <CircularProgress />;
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
            src={inputState.url ? inputState.url : atom}
            />
            <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="url"
                    label="Image URL"
                    name="url"
                    autoComplete="url"
                    value={inputState.url}
                    onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.url && (
                    <Alert severity="warning">
                    {inputsErrorsState.url.map((item) => (
                        <div key={"title-errors" + item}>{item}</div>
                    ))}
                    </Alert>
                )}
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    value={inputState.title}
                    onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.title && (
                    <Alert severity="warning">
                    {inputsErrorsState.title.map((item) => (
                        <div key={"title-errors" + item}>{item}</div>
                    ))}
                    </Alert>
                )}
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="subtitle"
                    label="Subtitle"
                    type="string"
                    id="subTitle"
                    autoComplete="subtitle"
                    value={inputState.subTitle}
                    onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.subTitle && (
                    <Alert severity="warning">
                    {inputsErrorsState && inputsErrorsState.subTitle.map((item) => (
                        <div key={"price-errors" + item}>{item}</div>
                    ))}
                    </Alert>
                )}
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    autoComplete="description"
                    value={inputState.description}
                    onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.description && (
                    <Alert severity="warning">
                    {inputsErrorsState && inputsErrorsState.description.map((item) => (
                        <div key={"description-errors" + item}>{item}</div>
                    ))}
                    </Alert>
                )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
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
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        id="address"
                        autoComplete="address"
                        value={inputState.address}
                        onChange={handleInputChange}
                    />
                    {inputsErrorsState && inputsErrorsState.address && (
                        <Alert severity="warning">
                        {inputsErrorsState.address.map((item) => (
                            <div key={"description-errors" + item}>{item}</div>
                        ))}
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="alt"
                        label="Alt"
                        id="alt"
                        autoComplete="alt"
                        value={inputState.alt}
                        onChange={handleInputChange}
                    />
                    {inputsErrorsState && inputsErrorsState.alt && (
                        <Alert severity="warning">
                        {inputsErrorsState.alt.map((item) => (
                            <div key={"alt-errors" + item}>{item}</div>
                        ))}
                        </Alert>
                    )}
                </Grid>


                <Grid item xs={6}>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSaveBtnClick}>
                    Save
                </Button>
                </Grid>
                <Grid item xs={6}>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}>
                    Cancel
                </Button>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    );
};
export default NewCardPage;
