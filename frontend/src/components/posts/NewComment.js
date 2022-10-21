import { Form, Spinner } from 'react-bootstrap';
import UserAvatar from 'components/common/UserAvatar';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const initialData = {
    content:''
}
const NewComments = ({post_id,handleAddComment}) => {
    const [formData,setFormData] = useState({
        content:"",
    })
    const {isLoading} = useSelector((state) =>state.posts)
    const handleFieldChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            handleAddComment(formData)
            setFormData(initialData)
        }
    }

    return (
        <>
            <div className="d-flex mt-2">
                <div className="flex-shrink-0">
                    <UserAvatar />
                </div>
                <div className="flex-grow-1 ms-3 ">
                    <div >
                        <Form.Group className="mb-3 " >
                            <Form.Control
                                value={formData.content}
                                name='content'
                                onChange={handleFieldChange}
                                onKeyDown={handleKeyDown}
                                type="text"
                                className='bg-light rounded-pill'
                                // placeholder={post_id}
                                disabled={isLoading}
                                />
                        </Form.Group>
                    </div>
                </div>
                {
                    isLoading &&
                    <Spinner animation="border" variant="primary" size="md" />
                }
            </div>
        </>
    )
}

export default NewComments;