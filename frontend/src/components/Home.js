import Post from "./posts/Post";

import img1 from '../assets/img/img1.jpg'
import img2 from '../assets/img/img2.jpg'
import img3 from '../assets/img/img3.jpg'
import img4 from '../assets/img/img4.jpg'
import NewPost from "./posts/NewPost";
const posts = [
    {img:img1},
    {img:img2},
    {img:img3},
    {img:img4},
]

const Home = ()=>{
    return (
        <>
            <NewPost/>
            {
                posts.map((post,idx)=>(
                    <Post post={post}/>
                ))
            }
        </>
    )
}

export default Home;