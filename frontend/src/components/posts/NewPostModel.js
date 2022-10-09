import { useCreatePostMutation } from "features/posts/postsApi";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const NewPostModel = (props) => {

    const [createPost, { data, isSuccess, isLoading, isError, error }] = useCreatePostMutation()

    const [formData, setFormData] = useState({
        content: 'This the first Post '
    });

    const handleSubmit = async e => {
        e.preventDefault();
        createPost(formData)
    };

    const handleFieldChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (isSuccess) {
            props.onHide()
            setFormData({
                ...formData,
                content: ''
            });

            toast.success(`Your Post Add Successfully!`, {
                theme: 'colored'
            });

        }
    },[isSuccess])
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Creat Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0 mb-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control
                            className="border-0 m-0"
                            value={formData.content}
                            name="content"
                            onChange={handleFieldChange}
                            as="textarea" rows={3}
                        />
                    </Form.Group>
                    <Button
                    className="d-block w-100 mt-3"
                    variant="primary"
                    type="submit"
                    disabled={!formData.content  || isLoading}
                >
                    { isLoading && <Spinner
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
            {/* <Modal.Footer className="w-100">
                <Button className="d-block w-100" onClick={props.onHide}>Post</Button>
            </Modal.Footer> */}
        </Modal>
    )
}

export default NewPostModel;