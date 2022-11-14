import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "components/common/Avatar";
import { logout } from "features/auth/authSlice";
import UserAvatar from "components/common/UserAvatar";
import { setInitialiseState } from "features/posts/postsSlice";
import { useLogoutUserMutation } from "features/auth/authApi";
import { useEffect } from "react";
const ProfileDropdwon = () => {
    const { user } = useSelector((state) => state.auth)

    const [LogoutUser ,{isSuccess}] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = async () => {
        LogoutUser()
        dispatch(logout())
        navigate('/login/')
    }
    return (
        <Dropdown navbar={true} as="li">
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className="p-0 px-3 nav-link"
            >
                <div className="user-menu d-flex">
                    <div className="user-img d-flex align-items-center">
                        <div className="avatar avatar-md">
                            <UserAvatar src={user.image} size={35} />
                        </div>
                    </div>
                    <div className="user-name text-start ms-3">
                        <h6 className="mb-0 text-gray-600">{user.firstname}</h6>
                        <p className="mb-0 text-sm text-gray-600">Admin</p>
                    </div>

                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className=" dropdown-menu-card  dropdown-menu-end mt-2">
                <div className="bg-white rounded-2 py-2 dark__bg-1000">
                    <Dropdown.Item className="fw-bold text-warning" href="#!">
                        {/* <FontAwesomeIcon icon="crown" className="me-1" /> */}
                        <span>Go Pro</span>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#!">Set status</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/user/profile">
                        Profile &amp; account
                    </Dropdown.Item>
                    <Dropdown.Item href="#!">Feedback</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/user/settings">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={onLogout} as={Link} to="#!">
                        Logout
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdwon;