import React from 'react';
import { useEffect } from "react";
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    localStorage.removeItem("username");
  }, []);
  return (
    <Container>
      <Typography variant="h4">Welcome to Music Community</Typography>
      <Button component={Link} to="/login" variant="contained" sx={{ marginTop: 2 }}>
        Login
      </Button>
      <Button component={Link} to="/signup" variant="outlined" sx={{ marginTop: 2 }}>
        Sign Up
      </Button>
    </Container>
  );
};

export default Home;
