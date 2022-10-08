import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNavbar from "../components/navbar/TopNavbar"
import VerticalNavbar from "../components/navbar/VerticalNavbar";

import img from '../assets/img/ai.png'

const AuthLayout = () => {
    return (
        <div className="fluid-container p-0 m-0">

            <Row className="">
                <Col className="" xs={{ order: '2', span: 12 }} lg={{ order: '1', span: 3 }} xl={6}>
                  <Image width='100%' height='100%' src={img}/>
                </Col>
                <Col xs={{ order: '1', span: 12 }} lg={{ order: '2', span: 6 }} xl={6} >
                    <Outlet/>
                </Col>

            </Row>
        </div>
    )
}

export default AuthLayout;