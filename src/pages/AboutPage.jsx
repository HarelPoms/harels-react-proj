import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const AboutPage = () => {
    return(
        <Box component="div" noValidate sx={{ mt: 3 }}>
            <Typography variant="h2">This page contains user instructions</Typography>
            <Divider>How to's</Divider>
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
                {/* Row Three */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography sx={{bgcolor:"limegreen"}}>
                        This is right side of the navbar, here you may switch between light mode and dark mode, as well as search for particular items by business number or by title.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={require("../assets/images/RightSideOfNavbar.PNG")} />
                </Grid>
                {/* Row Four */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography sx={{bgcolor:"limegreen"}}>
                        This is left side of the navbar, here you may perform any number of actions or access pages available to you on the basis of your user's permissions
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={require("../assets/images/LeftSideOfNavbar.PNG")} />
                </Grid>
                {/* Row Five */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography sx={{bgcolor:"limegreen"}}>
                        This is the footer; <br /> My favorites is available to non admin/biz users.
                        <br />My Cards is available to biz/admin users.<br /> About is available to anyone.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={require("../assets/images/FooterShowcaseAllOptions.PNG")} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AboutPage;