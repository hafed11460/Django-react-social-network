import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FaFacebookSquare, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Register</h2>
                </Card.Header>
                <Card.Body className="px-4">
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="email"  />
                        </Form.Group>
                        <Form.Group className="mb-2" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"  />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"  />
                            </Form.Group>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"  />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-2 d-flex flex-row justify-content-between">
                                <Form.Check type="checkbox" label="I accept the terms and privacy policy" />
                            </Form.Group>
                            <Form.Group className="mb-2 d-flex flex-row justify-content-between">
                                <Link to="/login">Already User? Login</Link>
                            </Form.Group>
                        </Row>

                        <Button className="d-block w-100 mt-3" variant="primary" type="submit">
                            Log in
                        </Button>
                        <div className="position-relative mt-4">
                            <hr className="bg-300" />
                            <div className="text-center">or log in with</div>
                        </div>
                        <div className="row g-2 mt-2">
                            <div className="col-sm-6">
                                <Button as="a" variant="outline-danger" className="d-block w-100">
                                    <FaGooglePlusG /> google
                                </Button>
                            </div>
                            <div className="col-sm-6">
                                <Button variant="outline-primary" className="d-block w-100">
                                    <FaFacebookSquare /> facebook
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Register;