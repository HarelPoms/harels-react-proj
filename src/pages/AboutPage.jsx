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
                <Grid item xs={5} sm={5} sx={{mt:5, ml:1}}>
                    <Typography sx={{bgcolor:"limegreen"}}>This is a business card, including an image, brief subtitle and description.beneath it, is a row containing the myriad of actions your user may perform.
                    The Edit button allows you to edit the business card only if the card was created by you as a business user or admin.
                    The delete button is available if you're either an Admin, or you created the card as a business user. 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="Card With Actions for biz/admin" src={require("../assets/images/CardPreview1.PNG")} />
                </Grid>
                {/* Row Two */}
                <Grid item xs={5} sm={5} sx={{mt:5, ml:1}}>
                    <Typography sx={{bgcolor:"limegreen"}}>
                        You may also perform like/unlike via the button available if you are a normal user
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={require("../assets/images/CardPreview2.PNG")} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AboutPage;