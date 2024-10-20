import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Options from './pages/Options';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Router>
  );
}

export default App;
