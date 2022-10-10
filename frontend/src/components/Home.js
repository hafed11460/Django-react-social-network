import {posts} from 'data/posts/posts'
import NewPost from './posts/NewPost';
import Post from './posts/Post';

const Home = ()=>{
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