import groups from "data/chat/groups"
import threads from "data/chat/threads"
import { users } from "data/dashboard/default"

const { MessagingContext } = require("context/Context")

const MessagingProvider = ({ children }) => {

    // const [messages, setMessages] = useReducer(arrayRe)

    const getUser = thread => {
        let user = {};
        if (thread.type === 'group') {
          const { name, members } = groups.find(({ id }) => id === thread.groupId);
          user = {
            name,
            avatarSrc: members.map(
              member => users.find(({ id }) => id === member.userId).avatarSrc
            )
          };
        } else {
          user = users.find(({ id }) => id === thread.userId);
        }
        console.log(user)
        return user;
      };

    const value = {
        users,
        groups,
        threads,
        getUser,
        // messages,
    }
    return (
        <MessagingContext.Provider value={value}>
            {children}
        </MessagingContext.Provider>
    )
}

export default MessagingProvider