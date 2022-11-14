import Avatar from 'components/common/Avatar'
import { MessagingContext } from 'context/Context'
import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'

const MessageThread = ({ thread, index }) => {
    const { getUser } = useContext(MessagingContext)
    const user = getUser(thread)
    if (!user) return null
    return (
        <Nav.Link eventKey={index} className='border-bottom rounded-0'>
            <div className="d-flex">
                <Avatar
                    src={user.avatarSrc}
                />
                <div className="ms-2">
                    {user.name}
                </div>
            </div>

        </Nav.Link>
    )
}

export default MessageThread
