import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerFirst, setRegisterFirst] = useState("");
    const [registerLast, setRegisterLast] = useState("");
    const navigate = useNavigate();

    const register = () => {
        axios({
        method: "POST",
        data: {
          username: registerUsername,
          password: registerPassword,
          first_name: registerFirst,
          last_name: registerLast,
          full_name: registerFirst + " " + registerLast,
          friend_requests: [],
          friend_list: [],
          profile_picture: {
            data: "",
            contentType: String
          },
          profile_info: "",
        },
        withCredentials: true,
        url: "http://localhost:4000/register"
      }).then((res) => {
        console.log(res)
        navigate('/');
    });
    }

    return(
      <div className='signupPage'>
        <div className='signup'>
          <h1>Register</h1>
          <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
          <input type='password' placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
          <input placeholder='first_name' onChange={e => setRegisterFirst(e.target.value)}/>
          <input placeholder='last_name' onChange={e => setRegisterLast(e.target.value)}/>
          <button onClick={register}>Submit</button>
        </div>
      </div>
    )
}

export default Signup;