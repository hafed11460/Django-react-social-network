import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

export const GuestRoute = ()=>{
    const {user} = useSelector((state)=>state.auth)

    return user == null ? <Outlet/> : <Navigate to ='/'/>
}