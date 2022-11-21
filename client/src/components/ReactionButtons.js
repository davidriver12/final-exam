import React from "react";
import axios from "axios";

const reactionEmoji = {
    gusta: '👍',
    encanta: '❤️',
    divierte: '😄',
    asombra: '😮',
    entristece: '😢',
    enoja: '😠',
  }

  const ReactionButtons = ({ post }) => {

    const sendReaction = (reaction) => {
        axios({
            method: "POST",
            withCredentials: true,
            url: `http://localhost:4000/posts/${post._id}/${reaction}`
        })
    }
    
  
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() => sendReaction(name)}
        >
          {emoji} {post.reactions[name]}
        </button>
      )
    })
  
    return <div>{reactionButtons}</div>
  }

  export default ReactionButtons;