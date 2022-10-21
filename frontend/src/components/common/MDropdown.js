import { Link } from "react-router-dom";

const { Dropdown } = require("react-bootstrap")

const MDropdown = ({
    icon,
    children,
    width =200
}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                className="p-0 px-2 nav-link "
            >
                {icon}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="dropdown-menu-end mt-2 rounded-0 rounded-bottom"
                style={{ minWidth: `${width}px`, maxWidth: `${width}px` }}
            >
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MDropdown;