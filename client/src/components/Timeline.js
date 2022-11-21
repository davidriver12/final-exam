import React, { useState } from 'react';
import axios from 'axios';

const Timeline = () => {
    const [data, setData] = useState(null);

    const getUser = () => {
        axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:4000/user"
        }).then((res) => {
          setData(res.data)
          console.log(res.data);
        });
      }

    return(
        <div>
        <h1>Get user</h1>
        <button onClick={getUser}>Get current user</button>
        {
          data ? <h1>Welcome Back {data.username}</h1> : null
        }
      </div>
    )
}

export default Timeline;