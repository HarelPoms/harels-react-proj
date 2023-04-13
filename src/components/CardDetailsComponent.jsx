import {
    Card,
    CardActionArea,
    CardMedia,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
} from "@mui/material";
import PropTypes from "prop-types";

const CardDetailsComponent = ({
    title, subTitle, description, phone, email, web, url, alt, state, country, city, street, houseNumber, zipCode
}) => {


return (
    <Card square raised>
    <CardActionArea>
        <CardMedia component="img" image={url} alt={alt} />
    </CardActionArea>
    <CardHeader title={title} subheader={subTitle}></CardHeader>
    <CardContent>
        <Typography>{description}</Typography>
        <Typography variant="h3">Contact details</Typography>
        <Typography>Phone : {phone}</Typography>
        <Typography>Email : {email}</Typography>
        <Typography>WebSite : {web}</Typography>
        <Typography>Zip Code : {zipCode}</Typography>
        <Typography variant="h3">Address Details</Typography>
        <Typography>Country : {country}</Typography>
        <Typography>State : {state}</Typography>
        <Typography>City : {city}</Typography>
        <Typography>Street : {street}</Typography>
        <Typography>House Number : {houseNumber}</Typography>
    </CardContent>
    <CardActions>
        
    </CardActions>
    </Card>
);
};

CardDetailsComponent.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    web: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired
};

CardDetailsComponent.defaultProps = {
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    subTitle: ""
};

export default CardDetailsComponent;
