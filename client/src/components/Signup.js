import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();

    const register = () => {
        axios({
        method: "POST",
        data: {
          username: registerUsername,
          password: registerPassword,
        },
        withCredentials: true,
        url: "http://localhost:4000/register"
      }).then((res) => {
        console.log(res)
        navigate('/');
    });
    }

    return(
        <div>
        <h1>Register</h1>
        <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div>
    )
}

export default Signup;