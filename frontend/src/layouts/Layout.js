import { Route, Routes } from 'react-router-dom';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Home from 'components/Home';
import AuthLayout from './AuthLayout';
import { GuestRoute } from './GuestRoute';
import MainLayout from './MainLayout';
import { PrivateRoute } from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import ProfileLayout from './ProfileLayout';
import UserPostsList from 'components/user/profile/UserPostsList';
import Messaging from 'components/messaging/Messaging';
import MyNetwork from 'components/mynetwork/MyNetwork';
import Notifications from 'components/notifications/Notifications';
import ForgotPassword from 'components/auth/ForgotPassword';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login/" element={<Login />} />
                        <Route path="/register/" element={<Register />} />
                        <Route path="/forgot-password/" element={<ForgotPassword />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/messaging/" element={<Messaging />} />
                        <Route path="/mynetwork/" element={<MyNetwork />} />
                        <Route path="/notifications/" element={<Notifications />} />
                    </Route>
                    <Route element={<ProfileLayout />}>
                        <Route path="/user/" element={<UserPostsList />} />
                        {/* <Route path="/user/" element={<UserHome />} /> */}
                    </Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Layout;