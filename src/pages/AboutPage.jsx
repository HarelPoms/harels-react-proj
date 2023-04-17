import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const AboutPage = () => {
    return(
        <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {/* Row one */}
                <Grid item xs={6} sm={6} md={6}>
                    <Img alt="test" src={require("../assets/images/CardPreview1.PNG")} />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Typography>This is how we do it</Typography>
                </Grid>  
            </Grid>
        </Box>
    );
}

export default AboutPage;