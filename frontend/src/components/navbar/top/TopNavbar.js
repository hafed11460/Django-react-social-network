import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import MessageDropdown from "./MessageDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdwon from "./ProfileDropdown";
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { WS_URL } from "features/baseUrl";
import { useState } from "react";

const TopNavbar = () => {
    const [socketUrl, setSocketUrl] = useState(`${WS_URL}/notifications/`);
    const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('Connected!')
        },
        onClose: () => {
            console.log('Reconnecting Websocket ')
            setSocketUrl(null)
            setTimeout(function () {
                setSocketUrl(`${WS_URL}/notifications/`)
            }, 1000);
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            console.log(data)
        }
    })
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    return (
        <Navbar
            bg='dark'
            variant="dark"
            className="fixed-top "
        >
            <Container>
                <Navbar.Brand>Network</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link to='/' as={Link} >Home </Nav.Link>
                </Nav>
                <Nav className='me-auto'>
                    <Nav.Link to='/messaging/' as={Link} >Messaging </Nav.Link>
                </Nav>
                <Nav className='me-auto'>
                    <Nav.Link to='/' as={Link} >{connectionStatus} </Nav.Link>
                </Nav>
                <Navbar.Collapse id="responsive-navbar-nav border">
                    <Nav className="ms-auto g-2">
                        <div className="d-flex align-items-end">
                            <MessageDropdown width={300} />
                            <NotificationDropdown width={300} />
                            <ProfileDropdwon />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavbar;