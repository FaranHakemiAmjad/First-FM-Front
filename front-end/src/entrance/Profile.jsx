import React, { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
      const currentUsername = localStorage.getItem('username');
      setUsername(currentUsername);
  } ,[]);

  const handleInputChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('email');

    if (!newUsername) {
      setError('Username cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, username: newUsername }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('username', newUsername);
        setUsername(newUsername);
        setSuccess('Username updated successfully');
        setError('');
      } else {
        setError(result.message);
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to update username');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Typography variant="h3">Welcome To Your App</Typography>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Current Username: {username}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="New Username"
          value={newUsername}
          onChange={handleInputChange}
          fullWidth
          required
          style={{ marginBottom: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Username
        </Button>
      </form>
    </Container>
  );
};
export default Profile;