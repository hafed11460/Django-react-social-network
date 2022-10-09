import { Dropdown } from "react-bootstrap";
import { BsBell } from 'react-icons/bs'
import { Link } from "react-router-dom";
const NotificationDropdown = (props) => {
    return (
        <Dropdown navbar={true} as='li'>
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className="p-0 px-2 nav-link "
            >
                <span className="position-relative">
                    <BsBell size={25} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        9
                    </span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end mt-2"
                style={{minWidth: `${props.width}px`,maxWidth: `${props.width}px`}}>
                <Dropdown.Item>Event 1</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default NotificationDropdown;