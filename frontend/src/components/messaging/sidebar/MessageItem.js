import Avatar from "components/common/Avatar";

const MessageItem = ({message})=>{
    return(
        <div className="d-flex p-2 border-bottom">
            <Avatar />
        </div>
    )
}

export default MessageItem;