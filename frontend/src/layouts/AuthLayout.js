import { Col, Image, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";


import img from '../assets/img/ai.png'

const AuthLayout = () => {
    return (
        <div className="container-fluid">
            <Row className="min-vh-100 ">
                <Col className="p-0 col-6 d-none d-lg-block position-relative">
                    <Image width='100%' height='100%' src={img} />
                </Col>
                <Col className="col-sm-10 col-md-6 px-sm-0 align-self-center mx-auto py-3" >
                    <Row className="row justify-content-center g-0">
                        <Col className="col-lg-9 col-xl-8 col-xxl-6">
                            <Outlet />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AuthLayout;