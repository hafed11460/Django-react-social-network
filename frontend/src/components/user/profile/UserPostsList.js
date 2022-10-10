import NewPost from 'components/posts/NewPost';
import Post from 'components/posts/Post';
import {posts} from 'data/posts/posts'


const UserPostsList = ()=>{
    return (
        <>
            {
                posts.map((post,idx)=>(
                    <Post key={idx} post={post}/>
                ))
            }
        </>
    )
}

export default UserPostsList;