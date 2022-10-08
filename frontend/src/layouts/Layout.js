import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Home from '../components/Home';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout = ()=>{
    return(
        <>
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="login/" element={<Login/>}/>
            </Route>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default Layout;