import { Form } from 'react-bootstrap';
import user from 'assets/img/user.png'
const NewComments = () => {
    return (
        <>
            <div className="d-flex mt-2">
                <div className="flex-shrink-0">
                    <img className="rounded-circle" src={user} width="35 " />
                </div>
                <div className="flex-grow-1 ms-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Write a comment" />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default NewComments;