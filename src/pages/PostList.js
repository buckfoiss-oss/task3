import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import PostCard from "../components/PostCard.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorDisplay from "../components/ErrorDisplay.js";
import Pagination from "../components/Pagination.js";
import SearchBar from "../components/SearchBar.js";
import useDebounce from "../hooks/useDebounce.js";
import "./PostList.css";

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const [SearchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(SearchTerm, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const filteredPosts = posts && Array.isArray(posts)
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
        : [];
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    if (loading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorDisplay message={error} />;
    }
    return (
        <div className="post-list-container">
            <h2 className="section-title">Posts</h2>
            <SearchBar value={SearchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            
            {filteredPosts.length === 0 ? (
                <p className="no-posts-message">No posts found.</p>
            ) : (
                <div className="post-list">
                    {currentPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
            {filteredPosts.length > postsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
                    onPageChange={paginate}
                    totalPosts={filteredPosts.length}
                    postsPerPage={postsPerPage}
                />
            )}
        </div>
    );
};
export default PostList;
                    