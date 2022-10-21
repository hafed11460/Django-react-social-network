import { Card, Dropdown } from "react-bootstrap";
import BreakLine from "components/common/BreakLine";
import NewComments from "./NewComment";
import {
    BsHandThumbsUp,
    BsChatLeft,
    BsArrow90DegRight,
    BsThreeDots,
    BsPencilSquare,
    BsTrash, BsBookmark, BsHandThumbsUpFill
} from "react-icons/bs";
import Avatar from "components/common/Avatar";
import { iconSize, iconSize_sm } from "value";
import MDropdown from "components/common/MDropdown";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addComment, deletePost } from "features/posts/postsSlice";
import { toast } from "react-toastify";
import { useAddLikeMutation } from "features/posts/likesApi";


const PostLike = ({ handlePostLike }) => {
    const [like, setLike] = useState(false)
    const handleOnClick = ()=>{
        handlePostLike()
        setLike(preev =>!preev)
    }
    return (
        <div onClick={handleOnClick} role='button'>
            {
                !like ?
                    <><BsHandThumbsUp size={iconSize} /> Like</>
                    :
                    <><BsHandThumbsUpFill color='blue' size={iconSize} /> Unlike</>
            }
        </div>
    )
}

const PostDropdownMenu = ({ postId }) => {
    const dispatch = useDispatch()
    const handleDeletePost = async () => {
        dispatch(deletePost(postId))
        toast.error(`Your Post was deleted Successfully!`, {
            theme: 'colored'
        });
    }
    return (
        <MDropdown icon={<BsThreeDots size={iconSize} />}>
            <>
                <Dropdown.Item>
                    <BsBookmark size={iconSize_sm} /> <span className="ms-2">Save</span>
                </Dropdown.Item>

                <Dropdown.Item>
                    <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                </Dropdown.Item>

                <Dropdown.Item onClick={handleDeletePost}>
                    <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                </Dropdown.Item>
            </>
        </MDropdown>
    )
}

const Post = ({ post }) => {
    console.log(' Component Post Render')
    const { user } = useSelector((state) => state.auth)
    const [addLike] = useAddLikeMutation()
    const dispatch = useDispatch()
    const { owner } = post

    const handlePostLike = (like) => {
        addLike(post.id)
    }
    const handleAddComment = (comment) => {
        comment['post'] = post.id
        dispatch(addComment(comment))
    }
    return (
        <div className="mb-4">
            <Card>
                <Card.Header className="bg-white">
                    <div className="d-flex justify-content-between">

                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <Avatar src={owner.image} size={45} />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6> {owner.firstname}</h6>
                            </div>
                        </div>
                        {
                            (owner.id == user.id) &&
                            <div>
                                <PostDropdownMenu postId={post.id} />
                            </div>
                        }
                    </div>
                </Card.Header>
                {
                    post.content &&
                    <Card.Body>
                        <Card.Text>
                            {post.content}
                        </Card.Text>
                    </Card.Body>
                }
                {
                    post.img &&
                    <Card.Img className="rounded-0" height={300} variant="top" src={post.img} />
                }
                <Card.Footer className="bg-white">
                    <BreakLine />
                    <div className="d-flex justify-content-around">
                        <PostLike handlePostLike={handlePostLike} />
                        <div> <BsChatLeft size={iconSize} /> Comment</div>
                        <div> <BsArrow90DegRight size={iconSize} /> Share</div>
                    </div>
                    <BreakLine />
                    {
                        post.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    }
                    <NewComments post_id={post.id} handleAddComment={handleAddComment} />
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Post;