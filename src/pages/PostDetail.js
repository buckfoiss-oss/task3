import React, { useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostandComments } from "../redux/postSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import PostComment from "./PostComment";
import "./PostDetail.css";
import { current } from "@reduxjs/toolkit";

const PostDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {postDetails, loading, error} = useSelector((state) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostandComments(id));
        }
    }, [dispatch, id]);

    if (loading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorDisplay message={error} />;
    }
    if (!currntPost) {
        return <p className="no-post-message">Post not found.</p>;
    }
    return (
        <div className="post-detail-container">
            <Link to="/" className="back-link">← Back to Posts</Link>
            <h2 className="post-detail-title">{currentPost.title}</h2>\
            <p className="post-detail-body">{currentPost.body}</p>
            <h3 className="comments-section-title">Comments</h3>
            <div className="comments-list">
                {comments.length === 0 ? (
                    comments.map((comment) => (
                        <PostComment key={comment.id} comment={comment} />
                    ))
                ) : (
                    <p className="no-comments-message">No comments available.</p>
                )}
            </div>
        </div>

    );
}
export default PostDetail;

