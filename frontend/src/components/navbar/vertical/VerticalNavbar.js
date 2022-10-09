import {  ListGroup } from "react-bootstrap";
import { BsChatSquareText,BsBinoculars,BsGearFill } from "react-icons/bs";
import UserVerticalNav from "components/profile/UserVerticalNav";
const size = 25
const items = [
    { name: 'Find friends', icon: <BsBinoculars size={size}/> },
    { name: 'Groups', icon: <BsChatSquareText size={size}/> },
    { name: 'Watch', icon: <BsGearFill size={size}/>  },
]

const VerticalNavbar = () => {
    return (
        <ListGroup className="rounded sticky-top ">
            <ListGroup.Item

                        as="li"
                        className="d-flex justify-content-between align-items-start py-3"
                    >
                       <UserVerticalNav/>
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