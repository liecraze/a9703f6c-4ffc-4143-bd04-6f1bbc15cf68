import * as React from "react";
import {styled} from "@mui/material/styles";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, Grid, Collapse, CardActions } from "@mui/material";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import {pink} from "@mui/material/colors";
import { Groups3, Info, LocationOn, AddCircle } from '@mui/icons-material';
import { EventDetail } from "./interfaces/eventDetail";
import "../styles/eventCard.scss";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface EventCardProps {
    event: EventDetail;
    addToCart: (title: string) => void;
}

const EventCard = ({ event, addToCart }: EventCardProps) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const shortenHeadline = (headline: string) => {
        return headline.length > 50 ? headline.substring(0, 50) + "..." : headline;
    }

    const formatDate = (date: string) => {
        const dateString = new Date(date);
        return dateString.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    }

    return (
        <Grid item xs={8} sm={6} lg={4} className={"grid-item"}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor:pink[400] }} aria-label="city">
                            <Typography variant={"caption"}>{event.city}</Typography>
                        </Avatar>
                    }
                    title={<Typography variant="h6">{shortenHeadline(event.title)}</Typography>}
                    subheader={event.venue.name}
                    sx={{height: '15vh'}}
                />
                <CardMedia
                    component="img"
                    height="400"
                    image={event.flyerFront}
                    alt={event.title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Starts: {formatDate(event.date)} <br/>
                        Ends: {formatDate(event.endTime)} <br/>
                        <IconButton disabled><Groups3/></IconButton>{event.attending}
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <Info />
                    </ExpandMore>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography variant="body1" color="text.secondary">
                            {event.pick?.blurb || "No info text available"}
                        </Typography>
                    </Collapse>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                    <a href={event.venue.direction} target={"_blank"}>
                        <IconButton aria-label="show location">
                            <LocationOn />
                        </IconButton>
                    </a>
                    <IconButton aria-label="add to cart" onClick={() => addToCart(event.title)}>
                        <AddCircle />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}
export default EventCard;
