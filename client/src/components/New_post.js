import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const New_post = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createPost = () => {
    axios({
      method: "POST",
      data: {
        content: content,
      },
      withCredentials: true,
      url: "http://localhost:4000/posts/new"
    }).then((res) => {
      console.log(res)
      navigate('/timeline');
    })
  }

  return(
    <div>
        <h1>New post</h1>
        <input placeholder='content' onChange={e => setContent(e.target.value)}/>
        <button onClick={createPost}>Submit</button>
    </div>
  )
}

export default New_post;