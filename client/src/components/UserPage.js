import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Navbar from "./Navbar";
import Right from "./Right";

const UserPage = (props) => {
    //STATE
    const params = useParams();
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState(null);

    //HELPER FUNCTIONS
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:4000/users/${params.id}`,
        }).then((res) => {
            setUser(res.data)
          })
    } 

    const getPosts = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:4000/posts/by/${params.id}`,
        }).then((res) => {
            setUserPosts(res.data);
        })
    }

    useEffect(() => {
        getUser();
        getPosts();
      }, [])

    return (
        <div className="userPage">
            <Navbar />
            <div className="userPage">
                <div className="userPageMain">
                    <h1>Profile: {user.full_name}</h1>
                    {
                        userPosts ? <div className='posts'>{userPosts.map(poste => (
                            <Post post={poste}/>
                            ))} </div> : null
                    }
                </div>
                <Right />
            </div>
        </div>
    )
}

export default UserPage;