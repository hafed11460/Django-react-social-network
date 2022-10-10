import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "components/common/Avatar";
import { logout } from "features/auth/authSlice";
const ProfileDropdwon = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = async ()=>{
        dispatch( await logout())
        navigate('/login/')
    }
    return(
        <Dropdown  navbar={true} as="li">
        <Dropdown.Toggle
            bsPrefix="toggle"
            as={Link}
            to="#!"
            className="p-0 px-2 nav-link"
        >
           <Avatar size={35}/>
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
                <Dropdown.Item onClick={onLogout} as={Link} to="/authentication/card/logout">
                    Logout
                </Dropdown.Item>
            </div>
        </Dropdown.Menu>
    </Dropdown>
    )
}

export default ProfileDropdwon;