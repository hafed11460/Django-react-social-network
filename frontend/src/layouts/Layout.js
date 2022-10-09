import { Route, Routes } from 'react-router-dom';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Home from 'components/Home';
import AuthLayout from './AuthLayout';
import { GuestRoute } from './GuestRoute';
import MainLayout from './MainLayout';
import { PrivateRoute } from './PrivateRoute';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login/" element={<Login />} />
                        <Route path="/register/" element={<Register />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default Layout;