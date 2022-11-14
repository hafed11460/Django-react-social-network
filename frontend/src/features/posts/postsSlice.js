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
        await postsServices.deletePost(postId)
        return postId;
    })

export const updatePost = createAsyncThunk(
    'posts/update',
    async (post) => {
        const res = await postsServices.updatePost(post)
        return res.data;
    })

/************************************************************************************************************
 * Comments
 */
export const addComment = createAsyncThunk(
    'comments/add',
    async (comment) => {
        const res = await postsServices.addComment(comment)
        return res.data;
    })

export const deleteComment = createAsyncThunk(
    'comments/delete',
    async (comment) => {
        // console.log('comment deleted', comment)
        const res = await postsServices.deleteComment(comment.id)
        return { post_id: comment.post, comment_id: comment.id }
    })


export const updateComment = createAsyncThunk(
    'comments/update',
    async (comment) => {
        const res = await postsServices.updateComment(comment)
        return res.data;
    })


const initialState = {
    posts: [],
    errors: null,
    postID: null,
    commentID: null,
    isLoading: false,
    isSuccess: false,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setInitialiseState(state) {
            state.posts = []
        },
        setcommentId(state, { payload }) {
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
        /****** Create Post ******/
        [createPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.posts.unshift(action.payload)
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },

        //*****  Delete Post */
        [deletePost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.posts = state.posts.filter(post => post.id !== action.payload)
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        [deletePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
        },

        /****** Update  Post ******/
        [updatePost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.posts.map(post => {
                if (post.id === action.payload.id) {
                   return  action.payload
                }
                return post;
            });
        },
        [updatePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },




        //*****  Add Comment  */
        [addComment.pending]: (state, action) => {
            state.isLoading = true;
            state.postID = action.meta.arg.post
        },
        [addComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.postID = null;
            state.posts.filter((post)=>{
                if(post.id === action.payload.post){
                    return post.comments.push(action.payload)
                }
                return post
            })

        },
        [addComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },

        //*****  Delete Comment  */
        [deleteComment.pending]: (state, action) => {
            state.isLoading = true;
            state.commentID = action.meta.arg.id
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.commentID = null
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


        //*****  Update Comment  */
        [updateComment.pending]: (state, action) => {
            state.isLoading = true;
            state.postID = action.meta.arg.post
        },
        [updateComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.postID = null;

            state.posts.filter((post) => {
                if (post.id === action.payload.post) {
                    const comments = post.comments.filter((comment) => comment.id !== action.payload.id)
                    comments.push(action.payload)
                    post.comments = comments
                    return post
                }
                return post
            })
            // find  the currnet post
            // const existingPost = state.posts.find((post) => post.id === action.payload.post)
            // // push new comment to the currnet post
            // existingPost.comments.unshift(action.payload)
        },
        [updateComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.errors = action.payload;
        },
    }
})

export const {
    setcommentId,
    setInitialiseState,
} = postsSlice.actions

export default postsSlice.reducer