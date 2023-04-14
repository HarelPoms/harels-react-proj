import { Box, CircularProgress, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



const MyCardsPage = () => {
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsArr, setCardsArr] = useState(null);
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    return (
        <Box>
        <Grid container spacing={2}>
            {cardsArr.map((item) => (
            <Grid item xs={4} key={item._id + Date.now()}>
                <CardComponent
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                onDelete={handleDeleteFromInitialCardsArr}
                onEdit={handleEditFromInitialCardsArr}
                onLike={handleLikeFromCards}
                canEdit={payload && (payload.biz || payload.isAdmin) && item.user_id == payload._id }
                canDelete={payload && (payload.isAdmin || (payload.biz && item.user_id == payload._id))}
                canLike={payload && !payload.isAdmin && !payload.biz}
                />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};


export default MyCardsPage;