import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { posts } from "data/posts/posts";
import postsServices from "./postsServices";

export const getPosts = createAsyncThunk(
    'posts/',
    async () => {
        const res = await postsServices.getPosts()
        return res.data;
    })
export const getUserPosts = createAsyncThunk(
    'posts/',
    async () => {
        const res = await postsServices.getUserPosts()
        return res.data;
    })

export const createPost = createAsyncThunk(
    'posts/create',
    async (data) => {
        const res = await postsServices.createPost(data)
        return res.data;
    })

export const deletePost = createAsyncThunk(
    'posts/delete',
    async (postId) => {
        const res = await postsServices.deletePost(postId)
        return postId;
    })

export const addComment = createAsyncThunk(
    'comments/add',
    async (comment) => {
        const res = await postsServices.addComment(comment)
        return res.data;
    })

export const deleteComment = createAsyncThunk(
    'comments/delete',
    async (comment) => {
        console.log('comment deleted', comment)
        const res = await postsServices.deleteComment(comment.id)
        return { post_id: comment.post, comment_id: comment.id }
    })


const initialState = {
    posts: [],
    errors: null,
    postID:null,
    commentID:null,
    isLoading: false,
    isSuccess: false
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLoginUser(state, { payload }) {
            state.user = payload.user
            localStorage.setItem('user', JSON.stringify(payload.user))
            localStorage.setItem('access', JSON.stringify(payload.tokens.access))
            localStorage.setItem('refresh', JSON.stringify(payload.tokens.refresh))

        },
        setcommentId(state,{payload}){
            state.commentID = payload
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload
        },
        [getPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },

        [getUserPosts.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getUserPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload
        },
        [getUserPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },

        [createPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },


        [deletePost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        [deletePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
        },


        //*****  addComment  */
        [addComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            const existingPost = state.posts.find((post) => post.id === action.payload.post)
            existingPost.comments.push(action.payload)
        },
        [addComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },

        [deleteComment.pending]: (state, action) => {
            // state.isLoading = true;
        },
        [deleteComment.fulfilled]: (state, action) => {
            // state.isLoading = false;
            // state.isSuccess = true
            state.posts.filter((post) => {
                if (post.id === action.payload.post_id) {
                    const comments = post.comments.filter((comment) => comment.id !== action.payload.comment_id)
                    post.comments = comments
                    return post
                }
                return post
            })
        },
        [deleteComment.rejected]: (state, action) => {
            // state.isLoading = false;
            // state.isSuccess = false
            state.errors = action.payload;
        },
    }
})

export const {
    setLoginUser,
    setcommentId,
} = postsSlice.actions

export default postsSlice.reducer