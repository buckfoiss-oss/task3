import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostById , fetchCommentsByPostId } from "../api/Posts.js";

export const getPosts = createAsyncThunk("posts/getPosts", async (_, { rejectWithValue }) => {
    try {
        const data = await fetchPosts();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPostandComments = createAsyncThunk(
    "posts/fetchPostandComments",
    async (postId, { rejectWithValue }) => {
        try {
            const post = await fetchPostById(postId);
            const comments = await fetchCommentsByPostId(postId);
            return { post, comments };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        postDetails: null,
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPostandComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostandComments.fulfilled, (state, action) => {
                state.loading = false;
                state.postDetails = action.payload.post;
                state.comments = action.payload.comments;
                state.error = null;
            })
            .addCase(fetchPostandComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default postSlice.reducer;