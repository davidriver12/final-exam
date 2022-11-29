import React, { useState, useEffect } from 'react';
import axios from 'axios';
import New_post from './New_post';
import ReactionButtons from './ReactionButtons';
import Navbar from './Navbar';
import Post from './Post';
import Right from './Right';

const Timeline = () => {
    const [data, setData] = useState(null);
    const [posts, setPosts] = useState(null);
    const [writePost, setWritePost] = useState(false); 

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

    const toggleWritePost = () => {
      setWritePost(!writePost)
    }

    useEffect(() => {
      getPosts();
      getUser();
    }, [])

    return(
        <div className='timeline'>
            <Navbar />
            <div className='mainDiv'>
              <div className='newPost'>
                <button onClick={toggleWritePost}>+ New Post</button>
                {writePost ? <New_post /> : null}
              </div>
                  {
                    posts ? <div className='posts'>{posts.map(poste => (
                      <Post post={poste}/>
                      ))} </div> : null
                  }
            </div>
            <Right />
      </div>
    )
}

export default Timeline;