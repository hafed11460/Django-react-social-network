import { Badge, ListGroup } from "react-bootstrap";


const items = [
    { name: 'Find friends', icon: 'b' },
    { name: 'Groups' },
    { name: 'Watch' },
]

const VerticalNavbar = () => {
    return (
        <ListGroup  className="rounded-0">
            {
                items.map((item, idx) => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        {/* <FontAwesomeIcon icon={route.icon} /> */}
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default VerticalNavbar;