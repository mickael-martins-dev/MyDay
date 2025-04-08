import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About'; // On importe la page
import Login from './Login'; // On importe la page
import Home from './Home';
import Historique from './Historique'
import Register from './Register';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/historique" element={<Historique />} />
        
      </Routes>
    </Router>
  );
}

export default App;
