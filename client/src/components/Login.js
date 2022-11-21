import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setloginPassword] = useState("");
    const navigate = useNavigate();

    const login = () => {
        axios({
          method: "POST",
          data: {
            username: loginUsername,
            password: loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:4000/login"
        }).then((res) => {
            console.log(res)
            navigate('/timeline');
        });
      }

      return(
        <div>
            <h1>Login</h1>
            <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
            <input placeholder='password' onChange={e => setloginPassword(e.target.value)}/>
            <button onClick={login}>Submit</button>
            <Link to={"/sign-up"}>Sign up</Link>
        </div>
      )
}

export default Login;