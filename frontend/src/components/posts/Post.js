import { Card, Col, Row } from "react-bootstrap";
import user from '../../assets/img/user.png'
import BreakLine from "../tools/BreakLine";
import Comments from "./Comments";
import NewComments from "./NewComment";
import { BsHandThumbsUp,BsHandThumbsUpFill, BsChatLeft, BsArrow90DegRight } from "react-icons/bs";
const size = 20
const Post = ({ post }) => {
    return (
        <div className="mb-4">
            <Card>
                <Card.Header className="bg-white">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <img className="rounded-circle" src={user} width="45 " />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6> DZ DÉVELOPPEURS</h6>
                        </div>
                    </div>
                </Card.Header>
                {
                    post.content &&
                    <Card.Body>
                        <Card.Text>
                            {post.content}
                        </Card.Text>
                    </Card.Body>
                }
                {
                    post.img &&
                    <Card.Img className="rounded-0" height={300} variant="top" src={post.img} />
                }

                <Card.Footer className="bg-white">
                    <BreakLine/>
                    <div className="d-flex justify-content-around">
                        <div> <BsHandThumbsUp size={size}/> Like</div>
                        <div> <BsChatLeft size={size}/> Comment</div>
                        <div> <BsArrow90DegRight/> Share</div>
                    </div>
                    <BreakLine/>
                    <Comments />
                    <NewComments />
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Post;