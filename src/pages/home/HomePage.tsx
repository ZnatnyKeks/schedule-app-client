import { Button } from "@/shared/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { logout } from "@/shared/store/reducers/ActionCreaters";

export default function HomePage() {
    const {isLoading} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            home page
            <Button disabled={isLoading}  onClick={handleLogout}>Logout</Button>
        </>
    )
}