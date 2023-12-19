import { useAppSelector } from "@/shared/store/hooks";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

export default function RootLayout() {
    const {user} = useAppSelector(state => state.userReducer)
    if(!user.email) {
        return <Navigate to="/auth" />
    }
    return (<Outlet />)
}