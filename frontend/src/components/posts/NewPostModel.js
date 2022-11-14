import UserAvatar from "components/common/UserAvatar";
import { createPost } from "features/posts/postsSlice";
import useAuth from "hooks/useAuth";
import { useCallback, useState } from "react";
import { Button, Col, Form, Modal, Spinner } from "react-bootstrap";
import {
    BsCardImage, BsXCircle,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { iconSize } from "value";



const NewPostModel = (props) => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { isLoading } = useSelector((state) => state.posts)
    const [imagesSRC, setImagesSRC] = useState([])
    const [postData, setFormData] = useState({
        content: 'This is the first Post '
    });
    const [postImages, setPosteImages] = useState([])

    const handleClearFormData = useCallback(() => {
        setImagesSRC([])
        setPosteImages([])
        setFormData({
            content: '',
        })
        props.onHide()
    },[])

    const handleRemoveImage = (idx) => {
        setImagesSRC((imagesSrc)=>{
            return imagesSrc.filter((img, index) => index != idx)
        });

        setPosteImages(postImages =>{
            return postImages.filter((img, index) => index !== idx )
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        /// create formData for send it to backend
        let formData = new FormData()
        formData.append('content', postData.content)
        for (let i = 0; i < postImages.length; i++) {
            formData.append('images', postImages[i], postImages[i].name)
        }
        dispatch(createPost(formData))

        // hide model form "new Post"
        props.onHide()

        // initialise formData
        handleClearFormData()

        // show notifications
        toast.success(`Your Post Add Successfully!`, {
            theme: 'colored'
        });
    };


    /* handle file change
        1- create files url to show it in real time
        2- create array files to set in state
    */
    const handleFileChange = (e) => {
        const files = new Array()
        let imagesSrc = new Array()
        for (let i = 0; i < e.target.files.length; i++) {
            const img = e.target.files[i]
            files.push(img)
            const image_src = URL.createObjectURL(img)
            imagesSrc.push(image_src)
        }
        setPosteImages(files)
        setImagesSRC(imagesSrc)
    }

    const handleFieldChange = e => {
        setFormData({
            ...postData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <Modal
            {...props}
            onHide={handleClearFormData}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="align-center">
                    Creat Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0 mb-4">
                <div className="d-flex mt-2">
                    <div className="d-flex justify-content-between">

                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <UserAvatar src={user.image} size={45} />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6> {user.firstname}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control
                            className="border-0 m-0"
                            value={postData.content}
                            name="content"
                            onChange={handleFieldChange}
                            as="textarea" rows={3}
                        />
                    </Form.Group>
                    <div className="border pt-2 bg-light">
                        <div className="d-flex flex-column align-items-center ">
                            <div>
                                <BsCardImage className="text-success" size={iconSize} /> Video
                            </div>
                            <Form.Group className="mb-3 position-absolute bg-transparent opacity-0 ">
                                <Form.Control
                                    name='images'
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    type="file" multiple
                                />
                            </Form.Group>
                            <h6>
                                Add Photos / Videos
                            </h6>
                            <div className=" border-top">
                                {
                                    imagesSRC.map((img, idx) => (
                                        <Col xs={2} sm={3} md={4} key={idx} className="p-0 position-relative border m-1 float-start">
                                            <BsXCircle onClick={() => handleRemoveImage(idx)} color="orange" size={iconSize}
                                                className="  rounded-circle  position-absolute top-0 end-0"
                                            />
                                            <img width="100%" src={img} />
                                        </Col>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <Button
                        className="d-block w-100 mt-3"
                        variant="primary"
                        type="submit"
                        disabled={!postData.content || isLoading}
                    >
                        {isLoading && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        }
                        Post
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewPostModel;