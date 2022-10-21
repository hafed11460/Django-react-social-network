import NewPost from 'components/posts/NewPost';
import Post from 'components/posts/Post';
// import {posts} from 'data/posts/posts'
import { useGetUserPostsListQuery } from 'features/posts/postsApi';
import { getUserPosts } from 'features/posts/postsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UserPostsList = ()=>{
    const {posts} = useSelector((state)=>state.posts)
    const dispatch = useDispatch()
    console.log('home rendre')
    useEffect(()=>{
        dispatch(getUserPosts())
    },[])

    if (!posts) {
        return <div>No posts :(</div>
    }
    return (
        <>
            {
                posts && posts.map((post,idx)=>(
                    <Post key={idx} post={post}/>
                ))
            }
        </>
    )
}

export default UserPostsList;