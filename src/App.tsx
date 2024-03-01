import { useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import EventList from "./components/EventList";
import NavBar from "./components/NavBar";
import { EventDetail } from "./components/interfaces/eventDetail";
import "./styles/_base.scss";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    );
};

export default App;

const queryClient = new QueryClient();

const AppContent = () => {
    const [events, setEvents] = useState<EventDetail[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [cartItems, setCartItems] = useState<string[]>([]);

    const queryKey = "events";

    const { data, isLoading, isError, isFetching } = useQuery(
        queryKey,
        async () => {
            const response = await fetch(
                "https://teclead-ventures.github.io/data/london-events.json"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            return jsonData;
        }
    );

    const addToCart = (eventTitle: string) => {
        setCartItems([...cartItems, eventTitle]);
        const updatedEvents = events.filter((event) => event.title !== eventTitle);
        setEvents(updatedEvents);
    };

    const emptyCart = () => {
        setCartItems([]);
        setEvents([]);
    }

    const handleSearchChange = (newSearchKeyword: string) => {
        setSearchKeyword(newSearchKeyword);
    };

    const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            event.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    }, [events, searchKeyword]);

    if (isLoading || isFetching) {
        return (
            <Box className="app">
                <Box className="loading">
                     <h1 className="loading-text"> Data is loading </h1>
                </Box>
            </Box>
        );
    }

    if (isError) {
        return <Box className="app">Error fetching data</Box>;
    }

    return (
        <Box className="app">
            <NavBar
                itemCount={cartItems.length}
                onSearchChange={handleSearchChange}
                emptyCart={emptyCart}
            />
            <Container className="container">
                <EventList
                    events={filteredEvents.length > 0 ? events : data}
                    searchKeyword={searchKeyword}
                    addToCart={addToCart}
                    setEvents={setEvents}
                />
            </Container>
        </Box>
    );
};


