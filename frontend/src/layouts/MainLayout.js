import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNavbar from "components/navbar/top/TopNavbar";

import VerticalNavbar from "components/navbar/vertical/VerticalNavbar";

const MainLayout = () => {
    return (
        <div>
            <TopNavbar />
            <Container  className="mt-5">
                <Row className="py-3">
                    <Col className="min-vh-100 sticky-top"
                        xs={{ order: '2', span: 12 }}
                        lg={{ order: '1', span: 3 }}
                        xl={3}>
                        <VerticalNavbar />
                    </Col>
                    <Col className=""
                        xs={{ order: '1', span: 12 }}
                        lg={{ order: '2', span: 6 }}
                        xl={6} >
                        <div className="overflow-auto px-3">
                            <Outlet />
                        </div>
                    </Col>
                    <Col xs={{ order: '3', span: 12 }} lg={{ order: '3', span: 3 }} xl={3} >
                        <VerticalNavbar />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainLayout;