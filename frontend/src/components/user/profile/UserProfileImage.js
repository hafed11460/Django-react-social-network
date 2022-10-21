import UserAvatar from "components/common/UserAvatar";
const { Card } = require("react-bootstrap")

const UserProfileImage = ()=>{
    return(
        <Card className="mb-3">
            <Card.Body>
                <UserAvatar size={200}/>
            </Card.Body>
        </Card>
    )
}

export default UserProfileImage;