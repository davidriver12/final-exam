import axios from "axios";
import React, { useState } from "react";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const Post = (props) => {
    //STATE
    const [reRenderer, setreRenderer] = useState(true);
    const [writingComment, setWritingComment] = useState(false);
    const [commentContent, setCommentContent] = useState("");

    //HELPER FUNCTIONS
    const toggleComment = () => {
        setWritingComment(!writingComment);
    }

    const addComment = (postID) => {
        axios({
            method: "POST",
            data: {
                content: commentContent,
            },
            withCredentials: true,
            url: `http://localhost:4000/posts/${postID}/comment`
        })
    }
    
    return (
        <div className='post'>
            <Link to={`../users/${props.post.author_id}`}>{props.post.author_name}</Link>
            <p>{props.post.content}</p>
            <ReactionButtons post={props.post} />
            <div className='down-buttons'>
                <button onClick={toggleComment} className='comment-btn'>comment</button>
                <button className='share-btn'>share</button>
            </div>
            {
                writingComment ? 
                <div>
                    <input type='text' onChange={e => setCommentContent(e.target.value)}></input>
                    <button onClick={() => {
                        addComment(props.post._id);
                        }}>send</button>
                </div> : null
            }
            <div className="comments">{props.post.comments.map(comment => (
                <div className="comment">
                    <Link to={`../users/${comment.author_id}`}>{comment.author_name}</Link>
                    <p>{comment.content}</p>
                </div>
            ))}</div>
        </div>
    )
}

export default Post;