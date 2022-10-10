import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNavbar from "components/navbar/top/TopNavbar";

import UserSidebar from "components/user/UserSidebar";
import UserProfileImage from "components/user/profile/UserProfileImage";

const ProfileLayout = () => {
    return (
        <div>
            <TopNavbar />
            <Container className="mt-5">
                <Row className="py-3">
                    <Col className="min-vh-100 "
                        xs={{ order: '2', span: 12 }}
                        lg={{ order: '1', span: 3 }}
                        xl={3}>
                        <div className="sticky-top">
                            <UserProfileImage />
                            <UserSidebar />
                        </div>
                    </Col>
                    <Col className=""
                        xs={{ order: '1', span: 12 }}
                        lg={{ order: '2', span: 6 }}
                        xl={9} >
                        <div className="overflow-auto px-3">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileLayout;