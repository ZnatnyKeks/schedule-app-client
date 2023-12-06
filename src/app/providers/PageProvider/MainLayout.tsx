import { Outlet } from "react-router";
import Header from "./Header";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="h-full min-h-screen pt-16">
                <Outlet />
            </main>
        </>
    )
}