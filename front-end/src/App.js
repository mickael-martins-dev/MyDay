import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About'; // On importe la page
import Login from './Login'; // On importe la page
import Home from './Home';
import Register from './Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
