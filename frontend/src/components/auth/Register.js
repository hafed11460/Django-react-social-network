import { useRegisterUserMutation } from "features/auth/authApi";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { FaFacebookSquare, FaGooglePlusG } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerUser, { data, isSuccess, isLoading, isError, error }] = useRegisterUserMutation()

    const [formData, setFormData] = useState({
        firstname: 'Mahfoud',
        lastname: 'Tabet',
        email: 'hafed11460@gmail.com',
        password: '123456',
        confirm_password: '123456',
        remember: false
    });

    const handleSubmit = e => {
        e.preventDefault();
        registerUser(formData)
        toast.success(`Logged in as ${formData.email}`, {
            theme: 'colored'
        });
    };

    const handleFieldChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                // dispatch(setLoginUser(data))
                navigate('/login/')
            }
        }
    })
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Register</h2>
                </Card.Header>
                <Card.Body className="px-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    value={formData.firstname}
                                    name="firstname"
                                    onChange={handleFieldChange}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    value={formData.lastname}
                                    name="lastname"
                                    onChange={handleFieldChange}
                                    type="text"
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-2" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={formData.email}
                                name="email"
                                onChange={handleFieldChange}
                                type="email"
                            />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={formData.password}
                                    name="password"
                                    onChange={handleFieldChange}
                                    type="password"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    value={formData.confirm_password}
                                    name="confirm_password"
                                    onChange={handleFieldChange}
                                    type="password"
                                />
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

                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"
                            disabled={!formData.firstname  || !formData.lastname || !formData.email || !formData.password || isLoading}
                            >
                            {isLoading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            }
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