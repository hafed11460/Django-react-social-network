import { ListGroup } from "react-bootstrap";
import { BsChatSquareText, BsBinoculars, BsGearFill,BsHouseDoor,BsListUl,BsCollectionPlay } from "react-icons/bs";
import UserVerticalNav from "components/profile/UserVerticalNav";
import { Link } from "react-router-dom";
const size = 25
const items = [
    // {
    //     name: 'Home',
    //     to:'/user/',
    //     icon: <BsHouseDoor size={size} />
    // },
    {
        name: 'Post',
        to:'/user/',
        icon: <BsListUl size={size} />
    },
    {
        name: 'Messages',
        to:'/user/messages/',
        icon: <BsChatSquareText size={size} />
    },
    {
        name: 'Find friends',
        to:'/user/friends/',
        icon: <BsBinoculars size={size} />
    },
    {
        name: 'Watch',
        to:'/user/warch/',
        icon: <BsCollectionPlay size={size} />
    },
    {
        name: 'Settings',
        to:'/user/settings/',
        icon: <BsGearFill size={size} />
    },
]

const UserSidebar = () => {
    return (
        <ListGroup className="rounded sticky-top ">
            {
                items.map((item, idx) => (
                    <ListGroup.Item
                        key={idx}
                        as={Link}
                        to={item.to}
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

export default UserSidebar;