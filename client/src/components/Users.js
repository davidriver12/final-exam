import React, { useState } from 'react';
import axios from 'axios';

const Users = () => {
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

    const sendFriendRequest = (userId) => {
      axios({
        method: "POST",
        withCredentials: true,
        url: `http://localhost:4000/users/${userId}/sendfr`
      })
    }

    return (
        <div>
            <button onClick={getUsers}>Get all users</button>
            {
              users ? <ul>{users.map(user => (
                <div>
                  <li key={user._id}>{user.full_name}</li>
                  <button onClick={() => sendFriendRequest(user._id)}>Send friend request</button>
                </div>
                ))} </ul> : null
            }
        </div>
    )
}

export default Users;