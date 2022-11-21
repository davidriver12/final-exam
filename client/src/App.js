import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Signup from './components/Signup';
import Timeline from './components/Timeline';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </div>
  );
 };

export default App;
