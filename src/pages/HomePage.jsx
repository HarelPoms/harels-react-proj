import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Divider from '@mui/material/Divider';

import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import LoadingAnimationComponent from "../components/LoadingAnimationComponent";
import isImage from "../validation/isImgUrlValid";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Failed to retrieve buisiness cards data");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      let response = await axios.delete("/cards/" + id);
      if(response.status === 200){
          setCardsArr((newCardsArr) => newCardsArr.filter((item) => item._id != id));
          toast.success("Card deletion successful");
      }
      else{
          toast.error("Card Deletion Failed");
      }
    } catch (err) {
      toast.error("Error when deleting card");
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleLikeFromCards = async (id) => {
    try {
      await axios.patch("/cards/card-like/"+ id);
      toast.success("Added to Favorites");
    } catch(err){
      toast.error("Failed to Favorite Card");
    }
  }

  const handleDislikeFromCards = async (id) => {
    try {
      await axios.patch("/cards/card-like/"+ id);
      toast.success("Removed from Favorites");
    } catch(err){
      toast.error("Failed to remove card from favorites");
    }
  }

  if (!cardsArr) {
    return <LoadingAnimationComponent />;
  }

  return (
    <Box>
      <Typography variant="h5">Welcome to our business card exchange platform! We're dedicated to helping professionals and entrepreneurs network and expand their businesses. Our user-friendly platform makes it easy to create and exchange digital business cards with other members, whether you're at a networking event or connecting with someone across the world. Join our community today and take your business to the next level!</Typography>
      <Typography variant="h2"> Cards Page </Typography>
      <Typography variant="h3"> Here you can find business cards of all categories </Typography>
      <Divider> Cards on display </Divider>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={6} md={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image && isImage(item.image.url) ? item.image.url : "/assets/images/placeholderCardImg.png"}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onLike={handleLikeFromCards}
              onDislike={handleDislikeFromCards}
              canEdit={payload && (payload.biz || payload.isAdmin) && item.user_id == payload._id }
              canDelete={payload && (payload.isAdmin || (payload.biz && item.user_id == payload._id))}
              canLike={payload && !item.likes.includes(payload._id)}
              isOwnedBySelf={payload && item.user_id === payload._id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
