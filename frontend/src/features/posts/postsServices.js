
import http from '../http-common'



class PostDataService{
    getPosts(){
        return http.get('/posts/')
    }
    getUserPosts(){
        return http.get('/posts/user-posts/')
    }
    createPost(data){
        return http.post('/posts/',data)
    }
    deletePost(postId){
        return http.delete(`/posts/${postId}/`)
    }
    updatePost(post){
        console.log('post updata',post)
        return http.put(`/posts/${post.get('id')}/`,post)
    }

    //******** Comments ********/
    addComment(comment){
        return http.post('/posts-comments/',comment)
    }
    deleteComment(commentId){
        return http.delete(`/posts-comments/${commentId}/`)
    }
    updateComment(comment){
        return http.put(`/posts-comments/${comment.id}/`,comment)
    }

    //******** Likes ********/
    addLike(comment){
        return http.post('/posts-likes/',comment)
    }
    deleteLike(postId){
        return http.delete(`/posts-likes/${postId}/`)
    }


}
export default new PostDataService();
