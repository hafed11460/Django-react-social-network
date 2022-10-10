import Avatar from "components/common/Avatar";
import { Card, Dropdown, ListGroup } from "react-bootstrap";
import { BsBell } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { rawNewNotifications,notifications } from "data/notification/notification";
import createMarkup from "helpers/createMarkup";

export const NotificationItem = ({
    avatar,
    children,
}) => {
    return (
        <ListGroup.Item as={Link}>
            <div className="d-flex">
                <div className="flex-shrink-0">
                    <Avatar {...avatar} size={45} />
                </div>
                <div className="flex-grow-1 ms-2">
                    <p dangerouslySetInnerHTML={createMarkup(children)}/>
                </div>
            </div>
        </ListGroup.Item>
    )
}
const NotificationDropdown = ({ width = 300 }) => {
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
            <Dropdown.Menu
                className="dropdown-menu-end mt-2 rounded-0 rounded-bottom"
                style={{ minWidth: `${width}px`, maxWidth: `${width}px` }}
            >
                <ListGroup
                    variant="flush"
                    className="overflow-auto"
                    style={{ maxHeight: '300px' }}
                >
                    {
                        rawNewNotifications && rawNewNotifications.map((notification) => (
                            <NotificationItem {...notification} key={notification.id}  />
                        ))
                    }
                </ListGroup>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default NotificationDropdown;