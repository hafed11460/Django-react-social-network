import { Card, Tab } from "react-bootstrap";
import MessageContent from "./content/MessageContent";
import MessagingProvider from "./MessagingProvider";

import MessageSidebar from "./sidebar/MessageSidebar";

const MessagingTab = () => {
    return (
        <div className="sticky-top">
            <Tab.Container defaultActiveKey={0}>
                <Card className="">
                    <Card.Body className="d-flex">
                        <MessageSidebar />
                        <MessageContent />
                    </Card.Body>
                </Card>
            </Tab.Container>
        </div>
    )
}

const Messaging = ()=>{
    return(
        <MessagingProvider>
            <MessagingTab/>
        </MessagingProvider>
    )
}

export default Messaging;