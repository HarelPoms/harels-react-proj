import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";


const InputComponent = ({id, label, inputState, inputsErrorsState, handleInputChange}) => {
    const handleChange = (ev) =>{
        handleInputChange(ev);
    }
    return (
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        id={id}
        label={label}
        name={id}
        autoComplete={id}
        value={inputState[id]}
        onChange={handleChange}
        />
        {inputsErrorsState && inputsErrorsState[id] && (
        <Alert severity="warning">
            {inputsErrorsState[id].map((item) => (
            <div key={"firstName-errors" + item}>{item}</div>
            ))}
        </Alert>
        )}
    </Grid>);
}

export default InputComponent;