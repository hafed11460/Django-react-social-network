import { Container, Nav, Navbar } from "react-bootstrap"

const TopNavbar = ()=>{
    return(
        <Navbar bg='dark' variant="dark">
            <Container>
                <Navbar.Brand>Network</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href="#home">Home </Nav.Link>
                    <Nav.Link href="#friends"> Friends </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default TopNavbar;