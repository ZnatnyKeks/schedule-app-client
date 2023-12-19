import { useAppSelector } from "@/shared/store/hooks"
import NavItem from "./NavItem"
import { UserRole } from "@/entities/user"

const Header = () => {
    const {user} = useAppSelector(state => state.userReducer)

    return (
        <header
            className="flex flex-col gap-y-2 justify-center items-center p-4 w-full shadow-sm backdrop-blur-md bg-opacity-50 bg-card border-card border-b"
        >
            <h1>Расписание</h1>
            <nav className="flex gap-x-4 text-gray-600 hover:text-gray-900 text-lg">
                {user.role === UserRole.ADMIN && 
                <NavItem to={'/dashboard'}>Панель</NavItem>
                }
                <NavItem to="/">Расписание</NavItem>
                <NavItem to={'/profile'}>Профиль</NavItem>
            </nav>
        </header>
    )
}

export default Header