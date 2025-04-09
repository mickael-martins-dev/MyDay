import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About'; // On importe la page
import Login from './Login'; // On importe la page
import Home from './Home';
import Historique from './Historique'
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import Emotions from './Emotions'
import Identifiants from './Identifiants'
import Settings from "./Settings"


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
        <Route path="/emotions" element={<Emotions />} />
        <Route path="/identifiants" element={<Identifiants />} />
        <Route path="/settings" element={<Settings />} />

        
      </Routes>
    </Router>
  );
}

export default App;
