// import {posts} frsom 'data/posts/posts'
// import { useGetPostsQuery } from 'features/posts/posts';
import { getPosts } from 'features/posts/postsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewPost from './posts/NewPost';
import Post from './posts/Post';

const Home = ()=>{
    const {posts} = useSelector((state)=>state.posts)
    const dispatch = useDispatch()
    console.log('home rendre')
    useEffect(()=>{
        dispatch(getPosts())
    },[])
    // const {data:posts} = useGetPostsQuery()
    if (!posts) {
        return <div>No posts :(</div>
    }
    return (
        <>
            <NewPost/>
            {
                posts.map((post,idx)=>(
                    <Post key={idx} post={post}/>
                ))
            }
        </>
    )
}

export default Home;