import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaGooglePlusG } from "react-icons/fa";
const Login = () => {
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Login</h2>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-row justify-content-between">
                            <Form.Check type="checkbox" label="Check me out" />
                            <Card.Link href="#">Forgot Password?</Card.Link>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-row-reverse justify-content-between">
                            <Link to="/register"> New User? Create account </Link>
                        </Form.Group>

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

export default Login;