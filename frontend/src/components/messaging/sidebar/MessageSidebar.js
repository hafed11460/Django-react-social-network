import Avatar from "components/common/Avatar";
import { MessagingContext } from "context/Context";
import threads from 'data/chat/threads';
import { useContext } from "react";
import SimpleBar from 'simplebar-react';
import MessageContactSearch from "./MessageContactSearch";
import MessageThread from "./MessageThread";
const { Stack, Nav } = require("react-bootstrap")

const MessageSidebar = () => {

    return (
        <div>
            <MessageContactSearch />
            <SimpleBar style={{ height: '50%', minWidth: '65px', maxWidth: '250px' }}>
                <Nav variant="pills" className="flex-column">
                    {threads.map((thread, index) => (
                       <MessageThread thread={thread} index={index} key={thread.id}/>
                    ))}
                </Nav>
            </SimpleBar>
        </div>

    )
}

export default MessageSidebar;