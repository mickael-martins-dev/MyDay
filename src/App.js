import React from 'react';
import Home from './Home'; // On importe la page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About'; // On importe la page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
