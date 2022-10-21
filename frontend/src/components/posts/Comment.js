import Avatar from 'components/common/Avatar';
import MDropdown from 'components/common/MDropdown';
import { deleteComment, setcommentId } from 'features/posts/postsSlice';
import { Dropdown, Spinner } from 'react-bootstrap';
import { BsBookmark, BsPencilSquare, BsThreeDots, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iconSize, iconSize_sm } from 'value';

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

const Comment = ({
    comment
}) => {
    // console.log(' Component Comment Render')
    const { user } = useSelector((state) => state.auth)
    const { owner } = comment
    const dispatch = useDispatch()
    const handleDeleteComment = async () => {
        dispatch(deleteComment(comment))
        dispatch(setcommentId(comment.id))
    }
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
                    <div>
                        <small>
                            {comment.content}
                        </small>
                    </div>
                </div>
                {
                    (owner.id === user.id) &&
                    <CommentDropdownMenu handleDeleteComment={handleDeleteComment}/>
                }
            </div>
        </>
    )
}
export default Comment;