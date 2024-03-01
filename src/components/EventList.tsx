import { EventDetail } from "./interfaces/eventDetail";
import { getEventsByDate } from "./functions/getEventsByDate";
import EventCard from "./EventCard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Grid, Box, Container, Fab,  Typography, Tooltip } from '@mui/material';
import "../styles/eventList.scss";

interface EventListProps {
    events: EventDetail[];
    searchKeyword: string;
    addToCart: (title: string) => void;
    setEvents: React.Dispatch<React.SetStateAction<EventDetail[]>>;
}

const EventList = ({
                       events,
                       addToCart,
                       setEvents,
                       searchKeyword,
                   }: EventListProps) => {

    const [dateBar, setDateBar] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const dateHeadersRef = useRef<(HTMLDivElement | null)[]>([]);

    const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            event.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    }, [events, searchKeyword]);

    const eventGroups = useMemo(
        () => getEventsByDate(filteredEvents),
        [filteredEvents]
    );

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setDateBar(entry.target.getAttribute("data-date"));
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 1,
        });

        dateHeadersRef.current.forEach((dateHeader) => {
            if (dateHeader) {
                observer.observe(dateHeader);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleAddToCart = (eventTitle: string) => {
        addToCart(eventTitle);
        const updatedEvents = events.filter((e) => e.title !== eventTitle);
        setEvents(updatedEvents);
    };

    return (
        <Container maxWidth="lg" ref={containerRef}>
            {eventGroups.map((group, index) => (
                <Box key={index}>
                    {group.date && (
                        <div
                            ref={(ref) => (dateHeadersRef.current[index] = ref)}
                            data-date={
                                group.date instanceof Date
                                    ? group.date.toDateString()
                                    : "No date"
                            }
                            style={{
                                position: "sticky",
                                top: dateBar ? "3rem" : "auto",
                                zIndex: dateBar ? 1 : "auto",
                            }}
                        >
                            <Fab variant="extended" className="date-tab" onClick={() => window.scrollTo(0, 0)}>
                                <Tooltip title="Back to top">
                                <Typography>
                            {group.date ? group.date.toDateString() : "No date"} <br/>
                                </Typography>
                                </Tooltip>
                            </Fab>
                        </div>
                    )}
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={5}>
                        {group.events.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                addToCart={handleAddToCart}
                            />
                        ))}
                            </Grid>
                        </Box>
                </Box>
            ))}
        </Container>
    );
};

export default EventList;
