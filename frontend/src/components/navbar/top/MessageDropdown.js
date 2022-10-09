import { Dropdown } from "react-bootstrap";
import { BsChatLeftText } from 'react-icons/bs'
import { Link } from "react-router-dom";
const MessageDropdown = (props) => {
    return (
        <Dropdown navbar={true} as='li'>
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className="p-0 px-2  nav-link"
            >
                <BsChatLeftText size={25} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end mt-2"
                style={{ minWidth: `${props.width}px`, maxWidth: `${props.width}px` }}>
                <Dropdown.Item>Event 1</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MessageDropdown;