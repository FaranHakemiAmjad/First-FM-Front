import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sign-up successful: " + data.username);
        localStorage.setItem('user', JSON.stringify(formData));
        navigate('/login');
      } else {
        setError("Sign-up failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Sign-up error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Sign Up</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Username" name="username" value={formData.username} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
      </form>
    </Container>
  );
};

export default SignUp;
