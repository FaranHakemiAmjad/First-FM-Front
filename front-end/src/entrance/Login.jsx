import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response text:", responseText);
  
      if (!response.ok) {
        throw new Error('Login failed: Invalid credentials.');
      }
  
      try {
        const data = JSON.parse(responseText);
        console.log("text: "+responseText);
        console.log("data: "+data);
        localStorage.setItem('username', JSON.stringify(data.user.username));
        localStorage.setItem('email', JSON.stringify(data.user.email));
        localStorage.setItem("token", data.token);
        navigate('/profile');
      } catch (jsonError) {
        console.error("JSON Parsing error:", jsonError);
        throw new Error('Response is not valid JSON.');
      }
    } catch (error) {
      setError(error.message || "An error occurred during login.");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
