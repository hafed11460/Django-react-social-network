import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNavbar from "components/navbar/top/TopNavbar";

import VerticalNavbar from "components/navbar/vertical/VerticalNavbar";

const MainLayout = () => {
    return (
        <div>
            <TopNavbar />
            <Container className="mt-5">
                <div className="py-3">
                    <Outlet />
                </div>
            </Container>
        </div>
    )
}

export default MainLayout;