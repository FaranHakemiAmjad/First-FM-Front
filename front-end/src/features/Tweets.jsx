import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const Tweets = () => {
    const API_BASE_URL = "http://localhost:3000/tweet";
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await fetch(API_BASE_URL);
                if (!response.ok) throw new Error("Failed to fetch tweets");
                const data = await response.json();
                setTweets(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTweets();
    }, []);

    const addTweet = (e) => {
        const loggedUser = localStorage.getItem('username')
        if (loggedUser==null || loggedUser=="undefined") {
            alert("You Must Login or Sign Up First!")
            return;
        }
        navigate("/addTweet");
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        try {
            const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error("Failed to fetch tweets");
            const data = await response.json();
            setTweets(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ padding: "2rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <input type="text" placeholder="Search tweets by category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ccc" }} />
                <Button variant="contained" color="primary" sx={{ marginLeft: "1rem" }} onClick={handleSearch}>Search</Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem", position: "sticky" }}>
                <Button type="button" variant="contained" color="primary" fullWidth sx={{ maxWidth: 300 }} onClick={addTweet}>
                    Add Tweet
                </Button>
            </Box>
            {error && <Typography color="error" variant="h6" align="center" sx={{ marginBottom: "1rem" }}>{error}</Typography>}

            <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: "2rem", color: "primary.main" }}>
                Tweets Feed
            </Typography>

            <List sx={{ width: "100%" }}>
                {tweets.map((tweet) => (
                    <ListItem key={tweet.id} sx={{ marginBottom: "1.2rem", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "1rem", backgroundColor: "#fafafa" }}>
                        <ListItemText
                            primary={
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {tweet.author}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                                        {tweet.content}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Category: {tweet.category} | Posted on: {tweet.publish_datetime}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>

        </Container>

    );
};

export default Tweets;
