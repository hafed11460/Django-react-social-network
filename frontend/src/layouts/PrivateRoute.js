import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

export const PrivateRoute = ()=>{
    const {user} = useSelector((state)=>state.auth)
    console.log('render Private Route')
    return user != null ? <Outlet/> : <Navigate to ='/login/'/>
}