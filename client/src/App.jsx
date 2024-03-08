// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Login from './components/login';
import Leyout from './components/layout'
import User_page from './components/usePage';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Login/>} />
        <Route path="/user" element={<User_page/>} />

        {/* Protected route for the main application */}
        <Route path="/" element={<Leyout/>} />
      </Routes>
    </Router>
  );
}

export default App;
