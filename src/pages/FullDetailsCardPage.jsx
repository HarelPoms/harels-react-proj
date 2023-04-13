import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import CardDetailsComponent from "../components/CardDetailsComponent"

import {validateEditCardParamsSchema} from "../validation/editValidation";

const FullDetailsCardPage = () => {
    const [inputState, setInputState] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const errors = validateEditCardParamsSchema({ id });
                if (errors) {
                    // there were errors = incorrect id
                    navigate("/");
                    return;
                }
                const { data } = await axios.get("/cards/card/" + id);
                let newInputState = {
                ...data,
                };
                if (data.image && data.image.url) {
                newInputState.url = data.image.url;
                } else {
                newInputState.url = "";
                }
                if (data.image && data.image.alt) {
                newInputState.alt = data.image.alt;
                } else {
                newInputState.alt = "";
                }
                delete newInputState.__v;
                delete newInputState.image;
                delete newInputState.likes;
                delete newInputState._id;
                delete newInputState.user_id;
                delete newInputState.bizNumber;
                delete newInputState.createdAt;
                setInputState(newInputState);
            } catch (err) {
                console.log("error from axios", err);
            }
            })();
    }, [id]);

    if (!inputState) {
        return <CircularProgress />;
    }
    return (
        <CardDetailsComponent {...inputState} />
    );
}

export default FullDetailsCardPage;