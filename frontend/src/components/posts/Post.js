import { Card, Col, Row } from "react-bootstrap";
import img1 from '../../assets/img/img1.jpg'

const Post = ({ post }) => {
    return (
        <div className="mb-4">
            <Card>
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Img height={300} variant="top" src={post.img} />
                <Card.Footer>
                    <Row>
                        <Col>Like</Col>
                        <Col>Comment</Col>
                        <Col>Share</Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Post;