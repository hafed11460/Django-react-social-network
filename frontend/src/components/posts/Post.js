import { Card, Col, Dropdown } from "react-bootstrap";
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
import React, { Fragment, memo, useCallback, useState } from "react";
import { addComment, deletePost } from "features/posts/postsSlice";
import { toast } from "react-toastify";
import { useAddLikeMutation } from "features/posts/likesApi";
import EditPostModel from "./EditPostModel";
import useAuth from "hooks/useAuth";
import ImagePost from "./ImagePost";
import ImageView from "./ImageView";


const PostLike = ({ handlePostLike }) => {
    const [like, setLike] = useState(false)
    const handleOnClick = useCallback(() => {
        handlePostLike()
        setLike(preev => !preev)
    }, [])
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

const PostDropdownMenu = ({ postId, handleEditPost }) => {
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
                <Dropdown.Item onClick={handleEditPost}>
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
    const [imageViewModal, setImageViewModal] = useState(false)
    const [editPost, setEditPost] = useState(false);
    console.log(` Component Post Render ${post.id}`)
    const { user } = useAuth()
    const [addLike] = useAddLikeMutation()
    const dispatch = useDispatch()


    const handleEditPost = () => {
        setEditPost(!editPost)
    }
    const handlePostLike = useCallback(() => {
        addLike(post.id)
    }, [])

    const handleAddComment = useCallback((comment) => {
        comment['post'] = post.id
        dispatch(addComment(comment))
    }, [])

    return (
        <div className="mb-4">
            <EditPostModel
                post={post}
                show={editPost}
                onHide={() => setEditPost(false)}
            />
            {
                //Images view modal
                post.images.length  &&
                    <ImageView
                    show={imageViewModal}
                    images={post.images}
                    onHide={() => setImageViewModal(false)}
                    />
            }
            <Card >
                <Card.Header className="bg-white">
                    <div className="d-flex justify-content-between ">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <Avatar src={post.owner.image} size={45} />
                                {/* <small>-- {post.id}</small> */}
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6> {post.owner.firstname}</h6>
                                <small> {post.created_at.substr(11, 8)} </small>
                            </div>
                        </div>
                        {
                            (post.owner.id == user.id) &&
                            <div>
                                <PostDropdownMenu handleEditPost={handleEditPost} postId={post.id} />
                            </div>
                        }
                    </div>
                </Card.Header>
                {
                    post.content &&
                    <Card.Body onClick={()=>setImageViewModal(true)}>


                        <Card.Text>
                            {post.content}
                        </Card.Text>
                        <div className="rounded">
                            {
                                post.images.map((img ,idx) => (
                                    <Col key={img.id} className="">
                                        {idx == 0 ?
                                        <ImagePost img={img}/> :
                                        <img width={100/(post.images.length-1)  +"%"} className=" float-start" src={img.image} />
                                    }
                                    </Col>
                                ))
                            }
                        </div>
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

const customComparator = (prevProps, nextProps) => {
    return nextProps.post === prevProps.post;
};

export default React.memo(Post, customComparator);
// export default Post;