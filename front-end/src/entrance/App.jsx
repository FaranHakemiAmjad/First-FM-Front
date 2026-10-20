import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Profile from './Profile';
import Tweets  from '../features/Tweets';
import AlbumCharts from '../features/AlbumsChart'
import AddTweet from '../features/AddTweet';

function App() {
  return (
    <Router>
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Music Community
            </Typography>
            <Button color="inherit" component={Link} to="/tweets">
              Tweets
            </Button>
            <Button color="inherit" component={Link} to="/albumCharts">
              Albums Chart
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/">
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/tweets" element={<Tweets/>}/>
            <Route path="/albumCharts" element={<AlbumCharts/>}/>
            <Route path="/addTweet" element={<AddTweet/>}/>
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
