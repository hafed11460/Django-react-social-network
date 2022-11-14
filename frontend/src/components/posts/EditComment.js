import { Form, Spinner } from 'react-bootstrap';
import UserAvatar from 'components/common/UserAvatar';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateComment } from 'features/posts/postsSlice';
const initialData = {
    content:''
}
const EditComment = ({comment, handleEditComment,handleUpdateComment} ) => {
    const dispatch = useDispatch()

    const [formData,setFormData] = useState(comment)
    const {isLoading,postID} = useSelector((state) =>state.posts,shallowEqual)
    const handleFieldChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            dispatch(updateComment(formData))
            setFormData(initialData)
            handleEditComment()
        }
    }

    return (
        <>
            <div className="d-flex mt-2">
                <div className="flex-shrink-0">
                    <UserAvatar />
                </div>
                <div className="flex-grow-1 ms-3 mb-1">
                    <div >
                        <Form.Group className="mb-1 " >
                            <Form.Control
                                value={formData.content}
                                name='content'
                                onChange={handleFieldChange}
                                onKeyDown={handleKeyDown}
                                type="text"
                                className='bg-light rounded-pill'
                                disabled={isLoading}
                                />
                        </Form.Group>
                    <small role='button' onClick={handleEditComment}  className='text-primary'>Cancel</small>
                    </div>
                </div>
                {
                    (isLoading && (postID === comment.post))&&
                    <Spinner animation="border" variant="primary" size="md" />
                }
            </div>
        </>
    )
}

export default EditComment;