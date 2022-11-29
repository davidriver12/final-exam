import React from 'react';
import { Route, Routes } from "react-router-dom";
import './styles/app.css'

import Login from './components/Login';
import Signup from './components/Signup';
import Timeline from './components/Timeline';
import UserPage from './components/UserPage';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route  path='/users/:id' element={<UserPage />} />
      </Routes>
    </div>
  );
 };

export default App;
