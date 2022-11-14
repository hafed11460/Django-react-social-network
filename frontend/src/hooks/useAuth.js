import { selectCurrentUser } from "features/auth/authSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function useAuth(){
    const user =  useSelector(selectCurrentUser)

    return useMemo(()=>({user}),[user])
}

export default useAuth;