const { default: Avatar } = require("components/common/Avatar")
const { Card } = require("react-bootstrap")

const UserProfileImage = ()=>{
    return(
        <Card className="mb-3">
            <Card.Body>
                <Avatar size={200}/>
            </Card.Body>
        </Card>
    )
}

export default UserProfileImage;