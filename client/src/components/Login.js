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
        <div className="loginPage">
            <div className='loginStuff'>
              <h1>Facebook</h1>
              <p>Facebook te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p>
            </div>
            <div className='login'>
              <h1>Login</h1>
              <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
              <input placeholder='password' type='password' onChange={e => setloginPassword(e.target.value)}/>
              <button onClick={login}>Submit</button>
              <Link to={"/sign-up"}>Sign up</Link>
            </div>
        </div>
      )
}

export default Login;