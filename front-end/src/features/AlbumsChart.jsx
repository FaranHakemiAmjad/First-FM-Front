import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem, ListItemText, Box } from "@mui/material";

const AlbumCharts = () => {
    const API_BASE_URL = "http://localhost:3000/album";
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState("");
    const lastUpdated = "Feb 2025"

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(API_BASE_URL);
                if (!response.ok) throw new Error("Failed to fetch albums");
                const data = await response.json();
                setAlbums(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <Container sx={{ padding: "2rem" }}>
    {error && <Typography color="error" variant="h6" align="center" sx={{ marginBottom: "1rem" }}>{error}</Typography>}

    <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: "2rem", color: "primary.main" }}>
        Top Albums
    </Typography>

    <List sx={{ width: "100%" }}>
        {albums.map((album) => (
            <ListItem key={album.id} sx={{ marginBottom: "1.2rem", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "1rem", backgroundColor: "#fafafa" }}>
                <ListItemText 
                    primary={
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {album.rank}. {album.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                by {album.artist}
                            </Typography>
                        </Box>
                    } 
                />
            </ListItem>
        ))}
    </List>
    <Typography variant="h6" color="textSecondary">Last Updated: , {lastUpdated}</Typography>
</Container>

    );
};

export default AlbumCharts;
