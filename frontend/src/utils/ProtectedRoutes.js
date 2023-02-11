import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoutes =() => {

    const user = useSelector(state => state.accounts.user)
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes