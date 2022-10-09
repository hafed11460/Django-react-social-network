import Post from "./posts/Post";

import img1 from 'assets/img/img1.jpg'
import img2 from 'assets/img/img2.jpg'
import img3 from 'assets/img/img3.jpg'
import img4 from 'assets/img/img4.jpg'
import NewPost from "./posts/NewPost";
const posts = [
    {content:"Flex Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",img:img1},
    {content:'navigation, components, and more with a full suite of responsive flexbox utilities.',img:img2},
    {content:'For more complex implementations, custom CSS may be necessary.',img:null},
    {content:'',img:img4},
    {content:'Flex Quickly manage the layout, alignment, and sizing of grid columns,',img:null},
    {content:"Flex Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",img:img1},
]

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