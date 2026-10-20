import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddTweet = () => {
    const API_BASE_URL = "http://localhost:3000/tweet";
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        author: "",
        content: "",
        category: "",
        publishDate: ""
    });
    let navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to post tweet")
            } else {
                alert("Tweet Posted Succesfuly!")
                navigate('/tweets');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container>
            <Typography variant="h3">Post a New Tweet</Typography>
            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField label="Author" name="author" value={formData.author} onChange={handleInputChange} fullWidth required style={{ marginBottom: '10px' }} />
                <TextField label="Content" name="content" value={formData.content} onChange={handleInputChange} fullWidth required multiline rows={4} style={{ marginBottom: '10px' }} />
                <TextField label="Category" name="category" value={formData.category} onChange={handleInputChange} fullWidth required style={{ marginBottom: '10px' }} />
                <TextField label="Publish Date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} fullWidth required type="datetime-local" InputLabelProps={{ shrink: true }} style={{ marginBottom: '10px' }} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Post Tweet
                </Button>
            </form>
        </Container>
    );
};

export default AddTweet;
