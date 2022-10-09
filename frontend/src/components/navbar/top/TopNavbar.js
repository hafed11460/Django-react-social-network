import { Container, Nav, Navbar } from "react-bootstrap"
import MessageDropdown from "./MessageDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdwon from "./ProfileDropdown";

const TopNavbar = () => {
    return (
        <Navbar
            bg='dark'
            variant="dark"
            className="fixed-top "
        >
            <Container>
                <Navbar.Brand>Network</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href="#home">Home </Nav.Link>
                    <Nav.Link href="#friends"> Friends </Nav.Link>
                </Nav>
                <Navbar.Collapse id="responsive-navbar-nav border">
                    <Nav className="ms-auto g-2">
                        <div className="d-flex align-items-end">
                            <MessageDropdown width={300} />
                            <NotificationDropdown width={300}/>
                            <ProfileDropdwon />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavbar;