import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import NewPostModel from "./NewPostModel";

import BreakLine from "components/common/BreakLine";
import {  BsCalendarPlus,BsCameraVideoFill, BsCardImage} from "react-icons/bs";
import { iconSize } from "value";
import UserAvatar from "components/common/UserAvatar";


const NewPost = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                       <UserAvatar size={40}/>
                    </div>
                    <div className="flex-grow-1 ms-3">
                        <Form bg={'white'}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control onClick={() => setModalShow(true)} type="text" />
                            </Form.Group>
                        </Form >
                    </div>
                </div>


                <NewPostModel
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <NewPostModel />
                <BreakLine/>
                <div className="d-flex justify-content-around">
                    <div> <BsCameraVideoFill className="text-danger" color="red" size={iconSize}/> Video</div>
                    <div> <BsCardImage className="text-success" size={iconSize}/> Photo</div>
                    <div> <BsCalendarPlus className="text-warning"  size={iconSize}/> Event</div>
                </div>
            </Card.Body>
        </Card >
    )
}

export default NewPost;