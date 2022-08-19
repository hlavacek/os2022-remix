import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Events from './pages/Events';
import Login from './pages/Login';

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/events" element={<Events />} />
  </Routes>
);

export default App;
