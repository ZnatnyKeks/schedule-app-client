import NavItem from "./NavItem"

const Header = () => {
    return (
        <header
            className="flex flex-col gap-y-2 justify-center items-center p-4 w-full shadow-sm backdrop-blur-md bg-opacity-50 bg-card border-card border-b"
        >
            <h1>Meet your soul</h1>
            <nav className="flex gap-x-4 text-gray-600 hover:text-gray-900 text-lg">
                <NavItem to={'/'}>Home</NavItem>
                <NavItem to={'/profile'}>Profile</NavItem>
            </nav>
        </header>
    )
}

export default Header