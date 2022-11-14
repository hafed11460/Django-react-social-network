import { Tab } from "react-bootstrap";
import threads from 'data/chat/threads'
import MessageContentBody from "./MessageContentBody";
const MessageContent = () => {
    return (
        <Tab.Content className="p-2 border">
            {
                threads.map((thread) => (
                    <Tab.Pane eventKey={thread.id}>
                        <MessageContentBody/>
                    </Tab.Pane>
                ))
            }
        </Tab.Content>
    )
}

export default MessageContent;