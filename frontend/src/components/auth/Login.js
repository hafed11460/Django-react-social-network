import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaGooglePlusG } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "features/auth/authApi";
import { setLoginUser } from 'features/auth/authSlice';
import { useDispatch } from "react-redux";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginUser, { data, isSuccess, isLoading, isError, error }] = useLoginUserMutation()

    const [formData, setFormData] = useState({
        email: 'hafed11460@gmail.com',
        password: '123456',
        remember: false
    });

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(formData)
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
                dispatch(setLoginUser(data))
                navigate('/')
            }
        }
    })
    if(isError){
        return <h5> Page Not Found </h5>
    }
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Login</h2>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        {isError &&
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label className="text-danger">{error.data.errors}</Form.Label>
                            </Form.Group>
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Select
                                value={formData.email}
                                name="email"
                                onChange={handleFieldChange}
                            >
                                <option value={'hafed11460@gmail.com'}>hafed11460@gmail.com</option>
                                <option value={'walid@gmail.com'}>walid@gmail.com</option>
                                <option value={'admin@gmail.com'}>admin@gmail.com</option>
                                <option value={'user@gmail.com'}>testUser</option>
                            </Form.Select>
                            {/* <Form.Control
                                value={formData.email}
                                name="email"
                                onChange={handleFieldChange}
                                type="email"
                            /> */}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={formData.password}
                                name="password"
                                onChange={handleFieldChange}
                                type="password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-row justify-content-between">
                            <Form.Check type="checkbox" label="Check me out" />
                            <Card.Link href="#">Forgot Password?</Card.Link>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-row-reverse justify-content-between">
                            <Link to="/register"> New User? Create account </Link>
                        </Form.Group>

                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"
                            disabled={!formData.email || !formData.password || isLoading}
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

export default Login;