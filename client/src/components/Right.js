import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Right = () => {
    const [data, setData] = useState(null);
    const [users, setUsers] = useState(null);

    const getUsers = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/users"
        }).then((res) => {
            setUsers(res.data)
            console.log(res.data)
        })
    }

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

    const sendFriendRequest = (userId) => {
        axios({
            method: "POST",
            withCredentials: true,
            url: `http://localhost:4000/users/${userId}/sendfr`
        })
    }

    const accept = (userName) => {
        axios({
          method: "POST",
          withCredentials: true,
          url: `http://localhost:4000/users/${userName}/accept`
        })
    }

    const decline = (userName) => {
      axios({
        method: "POST",
        withCredentials: true,
        url: `http://localhost:4000/users/${userName}/decline`
      })
  } 

  useEffect(() => {
    getUser();
    getUsers();
  }, [])

    return(
        <div className='rightDiv'>
              <div className='usersDiv'>
                    {
                      users ? <ul>Other users:{users.map(user => (
                        <div>
                          <li key={user._id}>{user.full_name}</li>
                          <button onClick={() => sendFriendRequest(user._id)}>Send friend request</button>
                        </div>
                        ))} </ul> : null
                    }
                </div>
                <div className='frDiv'>
                {
                data ? <ul>Friend requests: {data.friend_requests.map(fr => (
                    <div>
                      <li>{fr}</li>
                      <button onClick={() => accept(fr)}>Accept</button>
                      <button onClick={() => decline(fr)}>Decline</button>
                    </div>
                    ))} </ul> : null
                }
              </div>
            </div>
    )
}

export default Right;