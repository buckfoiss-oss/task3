import React from "react";
import "./PostComment.css";

const PostComment = ({ comment }) => {
    return (
        <div className="post-comment">
            <h4 className="comment-name">{comment.name}</h4>
            <p className="comment-email">{comment.email}</p>
            <p className="comment-body">{comment.body}</p>
        </div>
    );
}
export default PostComment;