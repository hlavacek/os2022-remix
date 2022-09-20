import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Events from './pages/Events';
// import Login from './pages/Login';

const App = () => (
  <div className="w-full">
    <div className="w-full bg-sky-700 pt-3 pb-3 pl-5 mb-5">
      <h1 className="text-3xl font-bold text-white ">Event registration</h1>
    </div>
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Events />} />
    </Routes>
  </div>
);

export default App;
