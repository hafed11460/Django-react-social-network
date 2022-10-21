import { ListGroup } from "react-bootstrap";
import { BsChatSquareText, BsBinoculars, BsGearFill, BsBookmarkFill, BsPeopleFill } from "react-icons/bs";
import UserVerticalNav from "components/profile/UserVerticalNav";
import { iconSize } from "value";
const items = [
    { name: 'Find friends', icon: <BsBinoculars size={iconSize} /> },
    { name: 'Groups', icon: <BsPeopleFill size={iconSize} /> },
    { name: 'Groups', icon: <BsChatSquareText size={iconSize} /> },
    { name: 'Saved', icon: <BsBookmarkFill size={iconSize} /> },
    { name: 'Watch', icon: <BsGearFill size={iconSize} /> },
]

const VerticalNavbar = () => {
    return (
        <ListGroup className="rounded sticky-top ">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start py-3"
            >
                <UserVerticalNav />
            </ListGroup.Item>
            {
                items.map((item, idx) => (
                    <ListGroup.Item
                        key={idx}
                        as="li"
                        className="d-flex justify-content-between align-items-start py-3"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {item.icon} {item.name}
                                {/* <BsChatSquareText  size={25}/>  Cras justo odio */}
                            </div>
                        </div>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default VerticalNavbar;