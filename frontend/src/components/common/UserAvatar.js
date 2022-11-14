import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
const UserAvatar = ({
    src=null,
    size=35,
    rounded='circle',
}) => {
    const {user} = useAuth()
    return (
        <div className='text-center'>
            <img width={size} height={size} src={user.image} className="rounded-circle" />
        </div>
    )
}

export default UserAvatar;