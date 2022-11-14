import Avatar from 'components/common/Avatar';
import MDropdown from 'components/common/MDropdown';
import UserAvatar from 'components/common/UserAvatar';
import { deleteComment, setcommentId } from 'features/posts/postsSlice';
import useAuth from 'hooks/useAuth';
import React, { memo, useCallback, useState } from 'react';
import { Dropdown, Form, Spinner } from 'react-bootstrap';
import { BsPencilSquare, BsThreeDots, BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { iconSize, iconSize_sm } from 'value';
import EditComment from './EditComment';

const CommentDropdownMenu = ({ handleDeleteComment }) => {
    return (
        <MDropdown icon={<BsThreeDots size={iconSize} />}>
            <>
                <Dropdown.Item>
                    <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                </Dropdown.Item>

                <Dropdown.Item onClick={handleDeleteComment}>
                    <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                </Dropdown.Item>
            </>
        </MDropdown>
    )
}


const Comment = ({ comment}) => {
    console.log(`Comment Render ${comment.id}`)
    const dispatch = useDispatch()
    const { owner } = comment

    const [isEdit, setIsEdit] = useState(false)
    const {user} = useAuth()

    // const { isLoading, commentID } = useSelector((state) => state.posts,shallowEqual)

    const handleDeleteComment = useCallback(async () => {
        dispatch(deleteComment(comment))
        dispatch(setcommentId(comment.id))
    },[])

    const handleStateEdit = useCallback(()=>{
        setIsEdit(!isEdit)
    })

    if (isEdit) return <EditComment
        comment={comment}
        handleEditComment={handleStateEdit}
        // handleUpdateComment={handleUpdateComment}
    />

    return (
        <>
            <div className="d-flex mt-2 ">
                <div className="flex-shrink-0">
                    <Avatar src={owner.image} />
                </div>

                <div className=" ms-3 px-2 py-1 text-body rounded-3 " style={{ backgroundColor: '#cacaca' }}>
                    <Link to={`/users/${owner.id}`} className="nav-link" >
                        <small className='text-dark fw-bold'>{owner.firstname}</small>
                    </Link>
                    <div className='d-flex'>
                        <small>
                            {comment.content}
                        </small>
                        <small>
                            -- {comment.id}
                        </small>
                    </div>
                </div>
                <div className=''>
                    {
                        (owner.id === user.id) &&
                        <>
                            <MDropdown icon={<BsThreeDots size={iconSize} />}>
                                <>
                                    <Dropdown.Item onClick={() => setIsEdit(!isEdit)}>
                                        <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                                    </Dropdown.Item>

                                    <Dropdown.Item onClick={handleDeleteComment}>
                                        <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                                    </Dropdown.Item>
                                </>
                            </MDropdown>
                            {/* {
                                (isLoading && (commentID === comment.id)) &&
                                <Spinner className='mx-2' animation="border" variant="primary" size="sm" />
                            } */}
                        </>
                    }
                </div>
            </div>
        </>
    )
}


const customComparator = (prevProps, nextProps) => {
    return nextProps.comment === prevProps.comment;
};

export default React.memo(Comment,customComparator);