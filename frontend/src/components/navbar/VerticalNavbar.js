import { Badge, ListGroup } from "react-bootstrap";
import { BsChatSquareText,BsBinoculars,BsGearFill } from "react-icons/bs";
const size = 25
const items = [
    { name: 'Find friends', icon: <BsBinoculars size={size}/> },
    { name: 'Groups', icon: <BsChatSquareText size={size}/> },
    { name: 'Watch', icon: <BsGearFill size={size}/>  },
]


const VerticalNavbar = () => {
    return (
        <ListGroup className="rounded sticky-top ">
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