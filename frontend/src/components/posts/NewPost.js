import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import NewPostModel from "./NewPostModel";

const NewPost = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Card className="mb-3">
            <Card.Body>
                <Form bg={'white'}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onClick={() => setModalShow(true)} type="text"/>
                    </Form.Group>
                </Form >

                <NewPostModel
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <NewPostModel />
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button>
                            <i className="bi bi-camera-reels"></i> Video
                        </Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card >
    )
}

export default NewPost;