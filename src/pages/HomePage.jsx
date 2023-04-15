import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);

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
      //console.log(data);
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
      console.log("error when deleting", err.response.data);
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleLikeFromCards = async (id) => {
    try {
      let { data : cardBeingLiked } = await axios.get("/cards/card/" + id);
      let newInputState = {
          ...cardBeingLiked,
        };
      newInputState.likes = [...newInputState.likes, payload._id];
      delete newInputState.__v;
      delete newInputState.image;
      await axios.put("/cards/" + id, newInputState); 
    } catch(err){

    }
  } 

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={6} md={4} key={item._id + Date.now()}>
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

export default HomePage;
