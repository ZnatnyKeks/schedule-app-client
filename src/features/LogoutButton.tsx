import { Button } from "@/shared/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks"
import { logout } from "@/shared/store/reducers/ActionCreaters"
import { Link } from "react-router-dom"

const LogoutButton = () => {
    const { isLoading } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Link to={'/auth'}>
            <Button variant='destructive' className="max-w-fit" disabled={isLoading} onClick={handleLogout}>Logout</Button>
        </Link>
    )
}

export default LogoutButton