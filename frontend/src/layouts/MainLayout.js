import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNavbar from "../components/navbar/TopNavbar"
import VerticalNavbar from "../components/navbar/VerticalNavbar";

const MainLayout = () => {
    return (
        <div className="fluid-container">
            <TopNavbar />
            <Row className="py-3">
                <Col className="" xs={{ order: '2', span: 12 }} lg={{ order: '1', span: 3 }} xl={3}>
                    <VerticalNavbar />
                </Col>
                <Col xs={{ order: '1', span: 12 }} lg={{ order: '2', span: 6 }} xl={6} >
                    <div className="px-3">
                        <Outlet />
                    </div>
                </Col>
                <Col xs={{ order: '3', span: 12 }} lg={{ order: '3', span: 3 }} xl={3} >
                    <VerticalNavbar />
                </Col>
            </Row>
        </div>
    )
}

export default MainLayout;