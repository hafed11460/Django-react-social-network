import user from 'assets/img/user.png'
import Avatar from 'components/common/Avatar';
import UserAvatar from 'components/common/UserAvatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserVerticalNav = (props)=>{
    const { user } = useSelector((state) => state.auth)
    return(
        <Link to='/user/' className='text-decoration-none'>
        <div className="d-flex mt-2 align-items-center">
            <div className="flex-shrink-0">
                <UserAvatar size={50}/>
            </div>
            <div className="flex-grow-1   px-2 py-1  rounded-3">
                <h5 className='text-dark'>{user.firstname}</h5>
            </div>
        </div>
    </Link>
    )
}

export default UserVerticalNav;