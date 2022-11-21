import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import './styles/app.css'

import Login from './components/Login';
import Signup from './components/Signup';
import Timeline from './components/Timeline';
import Users from './components/Users';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </div>
  );
 };

export default App;
