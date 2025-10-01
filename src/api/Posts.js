import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export const fetchPostById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error);
        throw error;
    }
}

export const fetchCommentsByPostId = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        throw error;
    }
}