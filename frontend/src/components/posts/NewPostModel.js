import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const NewPostModel = (props) => {
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
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="w-100">
                <Button className="d-block w-100" onClick={props.onHide}>Post</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewPostModel;