import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import MessageDropdown from "./MessageDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdwon from "./ProfileDropdown";
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { WS_URL } from "features/baseUrl";
import { useState } from "react";
import { BsBagPlus, BsBell, BsChatRightDotsFill, BsHouseDoorFill, BsPeople } from "react-icons/bs";
import { iconSize } from "value";

const itemslink = [
    { name: 'Home','to':'/', icon: <BsHouseDoorFill size={iconSize} /> },
    { name: 'My Network','to':'mynetwork', icon: <BsBagPlus size={iconSize} /> },
    { name: 'Messaging','to':'messaging', icon: <BsChatRightDotsFill size={iconSize} /> },
    { name: 'Notifications','to':'notifications', icon: <BsBell size={iconSize} /> },
]

const TopNavbar = () => {
    const [socketUrl, setSocketUrl] = useState(`${WS_URL}/notifications/`);
    const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('Connected!')
        },
        onClose: () => {
            console.log('Reconnecting Websocket ')
            setSocketUrl(null)
            // setTimeout(function () {
            //     setSocketUrl(`${WS_URL}/notifications/`)
            // }, 1000);
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
                {/* <Navbar.Brand>Network</Navbar.Brand> */}
                {itemslink && itemslink.map((item,idx)=>(
                    <Nav className='me-auto p-0 ' key={idx}>
                        <Nav.Link to={item.to} as={Link} className="d-flex flex-column me-4 p-0">
                            <div className="d-block text-center" >
                                {item.icon}
                            </div>
                            <small>
                                {item.name}
                            </small>
                        </Nav.Link>
                    </Nav>
                ))}

                {/* <Nav className='me-auto'>
                    <Nav.Link to='/' as={Link} >{connectionStatus} </Nav.Link>
                </Nav> */}
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