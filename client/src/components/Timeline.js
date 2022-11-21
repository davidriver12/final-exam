import React, { useState } from 'react';
import axios from 'axios';
import New_post from './New_post';

const Timeline = () => {
    const [data, setData] = useState(null);
    const [users, setUsers] = useState(null);
    const [posts, setPosts] = useState(null);
    const [writePost, setWritePost] = useState(false); 

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

    const getPosts = () => {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/posts"
      }).then((res) =>{
        setPosts(res.data)
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

    const toggleWritePost = () => {
      setWritePost(!writePost)
    }

    return(
        <div>
            <div>
              <button onClick={toggleWritePost}>+ New Post</button>
              {writePost ? <New_post /> : null}
            </div>
            <div>
                <button onClick={getPosts}>Get posts</button>
                {
                  posts ? <ul>{posts.map(post => (
                      <div>
                      <li key={post._id}>{post.content}</li>
                      </div>
                    ))} </ul> : null
                }
            </div>
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
            <h1>Get user</h1>
            <button onClick={getUser}>Get current user</button>
            {
              data ? <h1>Current user: {data.full_name}</h1> : null
            }
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
    )
}

export default Timeline;